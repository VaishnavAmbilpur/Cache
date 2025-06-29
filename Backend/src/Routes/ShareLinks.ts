import { LinkModel } from "../db";
const sharelink  = async (req:any,res:any)=>{
    const { share } = req.body;
    
    if (share) {
        // Check if a link already exists for the user.
        const existingLink = await LinkModel.findOne({ userId: req.userId });
        if (existingLink) {
            res.json({ hash: existingLink.hash }); // Send existing hash if found.
            return;
        }
        
        // Generate a new hash for the shareable link.
        const hash = random(10);
        await LinkModel.create({ userId: req.userId, hash: hash});
        res.json({ hash }); // Send new hash in the response.
    } else {
        // Remove the shareable link if share is false.
        await LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Removed link" }); // Send success response.
    }
}
const random=(len:number):string=>{
            let options = "erdctfbghujmrdtfbghunjmrxctfvygbhun";
            let length = options.length;

            // Initialize an empty string to store the result.
            let ans = "";

            // Loop `len` times to construct the random string.
            for (let i = 0; i < len; i++) {
                // Generate a random index and append the corresponding character from `options` to `ans`.
                ans += options[Math.floor(Math.random() * length)];
            }

            // Return the final random string.
            return ans;
        }
export default sharelink;

