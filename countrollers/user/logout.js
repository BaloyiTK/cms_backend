import asyncHandler from "express-async-handler";

const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) {
    return res.json(false);
  }

  // Clear the token cookie by setting it to an empty value and expiring it immediately
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    path: "/",
    sameSite: "none",
  });

  return res.status(200).json({ message: "logged out successfully" });
});

export default logout;
