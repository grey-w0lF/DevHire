// const getProfileById = asyncHandler(async (req, res, next) => {
//   try {
//     const profile = await Profile.findOne({ user: req.params.id });
//     if (!profile) {
//       res.status(404).json({ message: "Profile Not Added " });
//     } else {
//       res.status(200).json(profile);
//     }
//   } catch (error) {
//     res.status(400).json({ message: "Something Bad Happened" });
//     throw new Error("Something Bad Happened");
//   }
// });