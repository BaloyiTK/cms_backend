import asyncHandler from "express-async-handler";

const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) { // Check if token exists
    return res.json(false); // Return false if token doesn't exist
  }

  // Set the token in the cookies to an expired date to invalidate it
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(),
    path: "/",
    sameSite: "none",
  });

  return res.status(200).json({ message: "logged out succsessfully" }); // Return success message after logging out
});

export default logout

