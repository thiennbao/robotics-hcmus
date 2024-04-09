import jwt from "jsonwebtoken";

const resourceMiddleware = {
  checkResourceAuth: (req, res, next) => {
    const { resource } = req.params;

    if (["link", "banner", "testimonial", "course", "blog", "contactInfo", "faq"].includes(resource)) {
      const method = req.method;
      if (method === "GET") {
        // Anyone can GET banner, course and blog
        next();
      } else {
        // Only admin or higer can use other methods
        try {
          const { token } = req.cookies;
          const decoded = jwt.verify(token, process.env.JWT_KEY);
          if (decoded.role === "root" || decoded.role === "admin") {
            next();
          } else {
            res.status(401).json({ message: "Fail to authentication" });
          }
        } catch (error) {
          res.status(401).json({ message: error.message });
        }
      }
    } else if (resource === "contact") {
      const method = req.method;
      if (method === "POST") {
        // Anyone can post contact
        next();
      } else {
        // Only manager or higher can use other methods
        try {
          const { token } = req.cookies;
          jwt.verify(token, process.env.JWT_KEY);
          next();
        } catch (error) {
          res.status(401).json({ message: error.message });
        }
      }
    } else {
      res.status(400).json({ message: "Invalid resoure" });
    }
  },
};

export default resourceMiddleware;
