import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Account from "../models/Account.js";

const authController = {
  getAccountList: async (req, res) => {
    try {
      const { where, key, sort, order, skip, limit } = req.query;
      const data = await Account.find(where ? { [where]: new RegExp(key, "i") } : {})
        .sort(sort ? { [sort]: order } : {})
        .skip(skip)
        .limit(limit);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAccountInfo: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Account.findOne({ _id: id });
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  register: async (req, res) => {
    try {
      const account = req.body;
      const takenUsername = await Account.findOne({ username: account.username });
      if (takenUsername) {
        res.status(409).json({ message: "Username has already taken" });
      } else {
        account.password = await bcrypt.hash(account.password, 10);
        const newAccount = await Account.create(account);
        res.status(200).json(newAccount);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { currentPassword, password } = req.body;
      const user = await Account.findById(id);
      const match = await bcrypt.compare(currentPassword, user.password);
      if (match) {
        const newPassword = await bcrypt.hash(password, 10);
        const updatedAccount = await Account.findByIdAndUpdate(
          id,
          { password: newPassword },
          { returnDocument: "after" }
        );
        res.status(200).json(updatedAccount);
      } else {
        res.status(401).json({ message: "Wrong password" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteAccount: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAccount = await Account.findByIdAndDelete(id);
      res.status(200).json(deletedAccount);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const foundAccount = await Account.findOne({ username });
      if (!foundAccount) {
        res.status(404).json({ message: "Username not found" });
      } else {
        const match = await bcrypt.compare(password, foundAccount.password);
        if (match) {
          const token = jwt.sign({ ...foundAccount._doc }, process.env.JWT_KEY, {
            expiresIn: "2h",
          });
          res.status(200).json(token);
        } else {
          res.status(401).json({ message: "Wrong password" });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  verifyJWT: (req, res) => {
    try {
      const { token } = req.cookies;
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_KEY);
          res.status(200).json({ verified: true, decoded });
        } catch (error) {
          res.status(200).json({ verified: false });
        }
      } else {
        res.status(200).json({ verified: false });
      }
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
};

export default authController;
