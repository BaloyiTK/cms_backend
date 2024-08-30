import crypto from "crypto";

// Function to generate a random API key
export const generateApiKey = () => {
  const apiKeyLength = 32; // Length of the API key
  return crypto.randomBytes(apiKeyLength).toString("hex");
};
