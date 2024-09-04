export const STATS_ENDPOINT = (id: string): string => `https://www.strava.com/api/v3/athletes/${id}/stats`;

export const STRAVA_REFRESH_ENDPOINT = "https://www.strava.com/oauth/token";

export interface Stats {
    biggest_ride_distance: number;
    biggest_climb_elevation_gain: number;
    recent_ride_totals: {
        count: number;
        distance: number;
        moving_time: number;
        elapsed_time: number;
        elevation_gain: number;
    };
    all_ride_totals: {
        count: number;
        distance: number;
        moving_time: number;
        elapsed_time: number;
        elevation_gain: number;
    };
    recent_run_totals: {
        count: number;
        distance: number;
        moving_time: number;
        elapsed_time: number;
        elevation_gain: number;
    };
    all_run_totals: {
        count: number;
        distance: number;
        moving_time: number;
        elapsed_time: number;
        elevation_gain: number;
    };
};

export interface StravaRefreshRequest {
    client_id: string;
    client_secret: string;
    refresh_token: string;
    grant_type: "refresh_token";
};

export interface StravaRefreshResponse {
    token_type: string;
    access_token: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
};

export interface LeetcodeResponse {
    data: {
        matchedUser: {
            username: string;
            submitStats: {
                acSubmissionNum: {
                    difficulty: string;
                    count: number;
                    submissions: number;
                }[];
            };
        };
    };
};