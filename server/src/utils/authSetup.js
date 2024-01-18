import bcrypt from "bcrypt";
import Account from "../models/Account.js";

const authSetup = async () => {
  try {
    const count = await Account.count();
    if (count === 0) {
      const setup = { username: "admin", password: "1", role: 1 };
      setup.password = await bcrypt.hash(setup.password, 10);
      await Account.create(setup);
    }
  } catch (error) {
    console.log("Cannot setup auth");
  }
};

export default authSetup;
