import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Account from "../models/Account.js";

const authController = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const foundAccount = await Account.findOne({ username });
    if (!foundAccount) {
      res.status(404).json({ message: "Username not found" });
    } else {
      const match = await bcrypt.compare(password, foundAccount.password);
      if (match) {
        const token = jwt.sign({ username }, process.env.JWT_KEY, { expiresIn: "2h" });
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        });
        res.status(200).json({ message: "Success" });
      } else {
        res.status(401).json({ message: "Wrong password" });
      }
    }
  },
  register: async (req, res) => {
    try {
      const account = req.body;
      const takenUsername = await Account.findOne({ username: account.username });
      if (takenUsername) {
        res.status(409).json({ message: "Username has already taken" });
      } else {
        account.password = await bcrypt.hash(req.body.password, 10);
        await Account.create(account);
        res.status(200).json({ message: "Success" });
      }
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  changePassword: async (req, res) => {
    const { id } = req.params;
    await Models[resource].findByIdAndUpdate(id, req.body);
  },
  deleteAccount: async (req, res) => {
    const { username } = req.params;
    await Models[resource].deleteOne({ username });
  },
  verifyJWT: (req, res) => {
    const { token } = req.cookies;
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_KEY);
        res.status(200).json({ verified: true });
      } catch (error) {
        res.status(200).json({ verified: false });
      }
    } else {
      res.status(200).json({ verified: false });
    }
  },
};

export default authController;
