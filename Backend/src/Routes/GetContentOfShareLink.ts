import { ContentModel, UserModel } from "../db";
import { LinkModel } from "../db";
const getcontentofsharelink = async(req:any,res:any)=>{
    const check = req.params.sharelink;

    const link = await LinkModel.findOne({ hash : check});
    if (!link) {
        res.status(404).json({ message: "Invalid share link" }); // Send error if not found.
        return;
    }

    const content = await ContentModel.find({ UserId: link.userId });
    const user = await UserModel.findOne({ _id: link.userId });

    if (!user) {
        res.status(404).json({ message: "User not found" }); // Handle missing user case.
        return;
    }

    res.json({
        username: user.username,
        content
    }); // Send user and content details in response.
}
export default getcontentofsharelink;