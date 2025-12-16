import { LinkModel } from "../db";
const sharelink  = async (req:any,res:any)=>{
    const { share } = req.body;
    
    if (share) {
        const existingLink = await LinkModel.findOne({ userId: req.userId });
        if (existingLink) {
            res.json({ hash: existingLink.hash }); // Send existing hash if found.
            return;
        }
        
        const hash = random(10);
        await LinkModel.create({ userId: req.userId, hash: hash});
        res.json({ hash }); // Send new hash in the response.
    } else {
        await LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Removed link" }); // Send success response.
    }
}
const random=(len:number):string=>{
            let options = "erdctfbghujmrdtfbghunjmrxctfvygbhun";
            let length = options.length;

            let ans = "";

            for (let i = 0; i < len; i++) {
                ans += options[Math.floor(Math.random() * length)];
            }

            return ans;
        }
export default sharelink;

