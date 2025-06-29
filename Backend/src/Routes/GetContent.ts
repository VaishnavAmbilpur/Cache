import { ContentModel } from "../db";
const getContent = async (req:any,res:any)=>{
    try{
  const contents = await ContentModel.find({UserId : req.userId}).populate('UserId','username');
        if(contents){
          res.status(200).json({
            Contents: contents
          })
        }
    }catch(err){
                res.status(401).send("Error Fetching Content: " + err);
    }
  

}
export default getContent;