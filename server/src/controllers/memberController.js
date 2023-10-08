import Member from "../models/Member.js";

const memberController = {
  getMembers: async (req, res) => {
    try {
      const members = await Member.find().skip(req.query.skip).limit(req.query.limit);
      res.status(200).json(members);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getMember: async (req, res) => {
    try {
      const member = await Member.findOne({ _id: req.params.slug });
      res.status(200).json(member);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  postMember: async (req, res) => {
    try {
      const newMember = await Member.create(req.body);
      res.status(200).json(newMember);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  patchMember: async (req, res) => {
    await Member.findByIdAndUpdate(req.params.slug, req.body);
  },
  deleteMember: async (req, res) => {
    await Member.deleteOne({ _id: req.params.slug });
  },
};

export default memberController;
