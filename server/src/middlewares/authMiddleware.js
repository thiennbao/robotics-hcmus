import jwt from "jsonwebtoken";

const authMiddleware = {
  checkIsRoot: (req, res, next) => {
    try {
      const { token } = req.cookies;
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      if (decoded.role === "root") {
        next();
      } else {
        res.status(401).json({ message: "Fail to authentication" });
      }
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
  checkIsAdmin: (req, res, next) => {
    try {
      const { token } = req.cookies;
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      if (decoded.role === "admin" || decoded.role === "root") {
        next();
      } else {
        res.status(401).json({ message: "Fail to authentication" });
      }
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
  checkIsRightUser: (req, res, next) => {
    try {
      const { id } = req.params;
      const { token } = req.cookies;
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      if (id === decoded._id || decoded.role === "root") {
        next();
      } else {
        res.status(401).json({ message: "Fail to authentication" });
      }
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
};

export default authMiddleware;
