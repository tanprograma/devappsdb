import mongoose from "mongoose";
function database(db) {
  (async function () {
    const connectString = `mongodb://127.0.0.1/${db}`;
    await mongoose.connect(connectString);
    console.log("databse connected and running");
  })();
}

export default database;
