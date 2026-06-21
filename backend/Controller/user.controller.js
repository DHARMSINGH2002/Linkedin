import User from "../Model/user-model.js";
import uploadOnCloudinary from "../Config/Cloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "get current user error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      headline,
      location,
      gender,
    } = req.body;

    const skills = req.body.skills ? JSON.parse(req.body.skills) : [];
    const education = req.body.education ? JSON.parse(req.body.education) : [];
    const experience = req.body.experience ? JSON.parse(req.body.experience) : [];

    let profileImage = null;
    let coverImage = null;

    if (req.files?.profileImage?.[0]?.path) {
      profileImage = await uploadOnCloudinary(req.files.profileImage[0].path);
    }

    if (req.files?.coverImage?.[0]?.path) {
      coverImage = await uploadOnCloudinary(req.files.coverImage[0].path);
    }

    const updateData = {
      firstName,
      lastName,
      username: userName,
      headLine: headline,
      location,
      gender,
      skills,
      education,
      experience,
    };

    if (profileImage) updateData.profileImage = profileImage;
    if (coverImage) updateData.coverImage = coverImage;

    const user = await User.findByIdAndUpdate(req.userId, updateData, {
      new: true,
    }).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "User Update Error" });
  }
};