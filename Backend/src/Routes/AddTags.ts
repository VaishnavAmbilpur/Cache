import { TagsModel } from "../db";
const CreateTag = async(req:any,res:any)=>{
     const title = req.body.title;
     try{
        await TagsModel.create({
            title : title
        })
        res.status(200).send("Your Tag is Created");
     }catch(err){
        res.status(500).send("Error in  CReating Tags");
     }
}
export default CreateTag;