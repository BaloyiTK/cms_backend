import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import ContentModel from "../models/contentModel.js";

const authenticateKey = asyncHandler(
  async ({ headers: { authorization }, params: { projectId } }, res, next) => {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorization.substring(7); // Remove "Bearer " prefix to extract the token

    const user = await User.findOne({ apiKey: token });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const contents = await ContentModel.find({
      userId: user.id,
      stage: "Published",
      projectId,
    });

    const groupedContents = contents.reduce((acc, content) => {
      const { _id, userId, createdAt, updatedAt, modelName, ...dynamicFields } =
        content._doc;
      if (!acc[modelName]) {
        acc[modelName] = [];
      }
      acc[modelName].push({
        ...dynamicFields,
        _id: _id.toString(),
        userId: userId.toString(),
        createdAt,
        updatedAt,
      });
      return acc;
    }, {});

    res.send(groupedContents);
  }
);

export default authenticateKey;
