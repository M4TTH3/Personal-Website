import getDb from "@/database/db";
import type Email from "@/models/Email";
import { InferCreationAttributes } from "sequelize";

export async function POST(req: Request) {

    try {
        const { Email } = await getDb();
        const { name, email: sender, message } = (await req.json()) as InferCreationAttributes<Email>;
        const email = await Email.create({
            name: name,
            email: sender,
            message: message,
        });

        return Response.json({ message: "Email sent!", sent: email }, { status: 200 });
    } catch(err) {
        console.log(err)
        return Response.json({ message: "Email failed to send!" }, { status: 500 });
    }
}