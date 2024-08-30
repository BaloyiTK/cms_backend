import ContentModel from "../../models/contentModel.js";

const autoPublishContent = async () => {

  const contents = await ContentModel.find({ stage: "Scheduled" });

  //console.log(contents)

  // Get the current time
  const now = new Date();

  // Loop through the content
  contents.forEach(async (content) => {
    const publishDateTime = new Date(content.publishDateTime);

   // console.log(publishDateTime)

    if (publishDateTime <= now) {
      content.stage = "Published";
      await content.save();
    }
  });
};

// Run autoPublishContent every second
setInterval(autoPublishContent, 1000);

export default autoPublishContent;
