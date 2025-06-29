import { ContentModel } from "../db"
 
const AddContent = async (req:any,res:any)=>{
    const {link , title , type } = req.body;
    const tags = req.body.tags
    const UserId = req.userId;
    try{
        await ContentModel.create({
            link : link,
            title : title,
            type : type,
            UserId : UserId,
            tags : [...tags]
        })
        res.status(200).send("Content Created");
    }catch(err){
        res.status(401).send("Error creating Content: " + err);
    }
}

export default AddContent;