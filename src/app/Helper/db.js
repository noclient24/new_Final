import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    const connectionString = process.env.DB_URL;
    if (!connectionString) {
      throw new Error("MONGO_DB_URL environment variable is not defined");
    }

    const connection = await mongoose.connect(connectionString, {
      dbName: "work_Manager",
    });

    console.log(
      "=============================================================="
    );
    console.log("Connection successful to database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};
