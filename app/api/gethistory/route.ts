import { ChatData } from "@/models/ChatData";
import { connectDb } from "@/utils/db";
import { auth } from "@clerk/nextjs";

export async function GET(req: Request, res: Response) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }
        
        await connectDb();
        const history = await  ChatData.findOne({ userId: userId })
        const historyData = history.toJSON();
        return new Response(JSON.stringify(historyData), { status: 200 });
    } catch (error) {
        return new Response("error", { status: 500 });
    }
   
}
