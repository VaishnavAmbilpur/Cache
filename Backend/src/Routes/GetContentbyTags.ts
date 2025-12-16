import { ContentModel } from "../db";
const getContentbyTags = async (req: any, res: any) => {
    try {
        const tags = req.params.tags.split(",");
        const response = await ContentModel.find({ tags: { $in: tags } });
        if (response && response.length > 0) {
            res.status(200).send({ response });
        } else {
            res.status(404).send("Not Found");
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}
export default getContentbyTags