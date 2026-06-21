import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "user does not have token" });
    }

    const verifytoken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifytoken) {
      return res.status(401).json({ message: "user does not have valid token" });
    }

    req.userId = verifytoken.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "is auth error" });
  }
};

export default isAuth;