import ContentModel from "../../models/contentModel.js";
import schedule from "node-schedule";

// Function to schedule content publishing
const scheduleContentPublishing = async () => {
  try {
    const now = new Date();
    const contents = await ContentModel.find({ stage: "Scheduled" });

    contents.forEach((content) => {
      const publishDateTime = new Date(content.publishDateTime);

      // Schedule the job only if the publish time is in the future
      if (publishDateTime > now) {
        scheduleJob(content, publishDateTime);
      }
    });
  } catch (error) {
    console.error("Error during content publishing scheduling:", error);
  }
};

// Function to schedule individual content publishing
const scheduleJob = (content, publishDateTime) => {
  schedule.scheduleJob(publishDateTime, async () => {
    try {
      content.stage = "Published";
      await content.save();
      console.log(`Content published: ${content._id}`);
    } catch (error) {
      console.error(`Failed to publish content ${content._id}:`, error);
    }
  });

  console.log(`Scheduled publication for content ${content._id} at ${publishDateTime}`);
};

// Run the scheduling function once to set up the jobs
scheduleContentPublishing();

// Optional: Set up periodic checking for new scheduled content
schedule.scheduleJob('* * * * *', scheduleContentPublishing); // Check every minute

export default scheduleContentPublishing;
