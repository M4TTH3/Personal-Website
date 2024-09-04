import StravaStat from "@/models/StravaStat";
import StravaToken from "@/models/StravaToken";
import {
    STRAVA_REFRESH_ENDPOINT,
    StravaRefreshResponse,
    StravaRefreshRequest,
    Stats,
    LeetcodeResponse,
} from "@/types/stats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMountain,
    faBiking,
    IconDefinition,
    faHourglass,
    faRoute,
    faRunning,
    faCode,
    faLeaf,
    faFire,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { HTMLProps } from "react";
import StatsPanelControl, { Controls } from "./statsPanelControl";
import { faStrava } from "@fortawesome/free-brands-svg-icons";
import assert from "assert";

const updateRefreshToken = async (model: StravaToken): Promise<void> => {
    const body: StravaRefreshRequest = {
        client_id: model.clientId.toString(),
        client_secret: model.clientSecret,
        refresh_token: model.refreshToken,
        grant_type: "refresh_token",
    };
    const response = await axios.post(STRAVA_REFRESH_ENDPOINT, body);

    if (!response) throw new Error("No Strava token found");
    const refreshResponse = response.data as StravaRefreshResponse;

    model.accessToken = refreshResponse.access_token;
    model.expiresAt = refreshResponse.expires_at;
    model.refreshToken = refreshResponse.refresh_token;
    await model.save();
};

const getStravaContents = async (): Promise<Stats> => {
    const model = await StravaToken.findOne();
    if (!model) throw new Error("No Strava token found");

    const contents = model.toJSON();
    const curEpoch = Math.floor(Date.now() / 1000);

    const statsModel = await StravaStat.findOne();

    if (curEpoch > contents.expiresAt) await updateRefreshToken(model);

    if (
        !statsModel ||
        new Date().getDate() !== statsModel.updatedAt.getDate()
    ) {
        try {
            const statsContents = await axios.get(
                `https://www.strava.com/api/v3/athletes/${model.id}/stats`,
                {
                    headers: {
                        Authorization: `Bearer ${model.accessToken}`,
                    },
                }
            );
            const stats = statsContents.data as Stats;

            if (!statsModel)
                await StravaStat.create({
                    id: model.id,
                    stats: stats as Stats,
                });
            else {
                const previousUpdatedAt = statsModel.updatedAt;
                // statsModel.changed("updatedAt", true);
                statsModel.stats = stats;
                await statsModel.save();

                assert(statsModel.updatedAt === previousUpdatedAt);
            }

            return stats;
        } catch {
            console.log('strava error')
            return statsModel!.stats;
        }
    }

    return statsModel.stats;
};

const getLeetcodeContents = async (): Promise<LeetcodeResponse | null> => {
    const endpoint = "https://leetcode.com/graphql";
    const res = await axios.post(endpoint, {
        query: `{
            matchedUser(username: "m4tth3") {
                username
                submitStats: submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                        submissions
                    }
                }
            }
        }
        `,
    });

    if (!res || res.status !== 200) return null;
    return res.data as LeetcodeResponse;
};

const StatsDisplay = ({
    title,
    display,
    icon,
    ...props
}: {
    title: string;
    display: string;
    icon?: IconDefinition;
}) => {
    return (
        <div
            {...props}
            className="relative overflow-hidden h-32 md:h-40 w-32 md:w-40 px-4 py-2 bg-gray-700 text-center flex flex-col text-white rounded-xl shadow-gray-200 hover:shadow-xl"
        >
            {icon && (
                <FontAwesomeIcon
                    icon={icon}
                    className="absolute w-full h-full my-auto left-0 opacity-[0.02]"
                />
            )}
            <div className="z-20 flex-[2] font-bold flex items-end justify-center">
                <h1 className="text-4xl text-gradient">{display}</h1>
            </div>
            <p className="z-20 flex-[1] text-xs">{title}</p>
        </div>
    );
};

// This gathers the users contents from the Strava API and displays it on the page.
export default async function StatsPanel(props: HTMLProps<HTMLDivElement>) {
    const leetcodeStats = await getLeetcodeContents();
    const submitStats = leetcodeStats?.data.matchedUser.submitStats;
    const stats = await getStravaContents();
    const {
        count: totalRides,
        distance: bikeDistance,
        elevation_gain,
        elapsed_time,
    } = stats.all_ride_totals;
    const {
        count: totalRuns,
        distance: runDistance,
        elevation_gain: runElevation,
        elapsed_time: runTime,
    } = stats.all_run_totals;

    const controlData: Controls = [
        {
            label: "Biking",
            value: "StravaBikeDisplay",
            icon: faStrava,
            icon_link: "https://www.strava.com/athletes/70090884",
        },
        {
            label: "Running",
            value: "StravaRunDisplay",
            icon: faStrava,
            icon_link: "https://www.strava.com/athletes/70090884",
        },
        {
            label: "Leetcode",
            value: "LeetcodeDisplay",
            icon: faCode,
            icon_link: "https://leetcode.com/m4tth3/",
        },
    ];

    return (
        <>
            <StatsPanelControl data={controlData} />
            <div className="px-4 pt-4 pb-8">
                <div
                    {...props}
                    id="StravaBikeDisplay"
                    className="h-full w-full flex flex-wrap justify-around sm:justify-center gap-4 sm:gap-10 items-center"
                >
                    <StatsDisplay
                        icon={faBiking}
                        title="Rides"
                        display={totalRides.toString()}
                    />
                    <StatsDisplay
                        icon={faRoute}
                        title="KM"
                        display={Math.floor(bikeDistance / 1000).toString()}
                    />
                    <StatsDisplay
                        icon={faMountain}
                        title="Elevation (KM)"
                        display={Math.floor(elevation_gain / 1000).toString()}
                    />
                    <StatsDisplay
                        icon={faHourglass}
                        title="Hours"
                        display={Math.floor(elapsed_time / 1000).toString()}
                    />
                </div>
                <div
                    {...props}
                    id="StravaRunDisplay"
                    className="h-full w-full hidden flex-wrap justify-around sm:justify-center gap-4 sm:gap-10 items-center"
                >
                    <StatsDisplay
                        icon={faRunning}
                        title="Runs"
                        display={totalRuns.toString()}
                    />
                    <StatsDisplay
                        icon={faRoute}
                        title="KM"
                        display={Math.floor(runDistance / 1000).toString()}
                    />
                    <StatsDisplay
                        icon={faMountain}
                        title="Elevation (M)"
                        display={Math.floor(runElevation).toString()}
                    />
                    <StatsDisplay
                        icon={faHourglass}
                        title="Hours"
                        display={Math.floor(runTime / 1000).toString()}
                    />
                </div>
                <div
                    {...props}
                    id="LeetcodeDisplay"
                    className="h-full w-full hidden flex-wrap justify-center gap-4 sm:gap-10 items-center"
                >
                    <StatsDisplay
                        title="Easy"
                        display={
                            submitStats?.acSubmissionNum
                                .find((stat) => stat.difficulty === "Easy")
                                ?.count.toString() ?? "0"
                        }
                        icon={faLeaf}
                    />
                    <StatsDisplay
                        title="Medium"
                        display={
                            submitStats?.acSubmissionNum
                                .find((stat) => stat.difficulty === "Medium")
                                ?.count.toString() ?? "0"
                        }
                        icon={faMountain}
                    />
                    <StatsDisplay
                        title="Hard"
                        display={
                            submitStats?.acSubmissionNum
                                .find((stat) => stat.difficulty === "Hard")
                                ?.count.toString() ?? "0"
                        }
                        icon={faFire}
                    />
                </div>
            </div>
        </>
    );
}
