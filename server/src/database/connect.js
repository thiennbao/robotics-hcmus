import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(process.env.DB_CONNECT_STRING)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connect;
