import { Request, Response, RequestHandler } from "express";
import { ContentModel } from "../db";

const searchContent: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query || query.trim() === "") {
      res.status(400).json({ error: "Search query cannot be empty" });
      return;
    }
    //@ts-ignore
    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const words = query.trim().split(/\s+/);
    const regexPattern = words.join("|");

    const searchResults = await ContentModel.find({
         //@ts-ignore
      UserId: req.userId,
      $or: [
        { title: { $regex: regexPattern, $options: "i" } },
        { tags: { $elemMatch: { $regex: regexPattern, $options: "i" } } },
      ],
    });

    res.status(200).json({ Contents: searchResults });
  } catch (err) {
    res.status(500).json({ error: "Error searching content" });
  }
};

export default searchContent;
