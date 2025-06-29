import { ContentModel } from "../db";

const DeleteContent = async (req:any,res:any) => {
	const contentId = req.body.contentId;
    try{
         const response = await ContentModel.deleteOne({_id:contentId});
        if(response){
            res.status(200).send(`The ${contentId} is Deleted Succesfully`);
        }
    }catch(err){
        res.status(401).send(`Error in Trying to Delete the Content ${contentId}`);
    }
};

export default DeleteContent;