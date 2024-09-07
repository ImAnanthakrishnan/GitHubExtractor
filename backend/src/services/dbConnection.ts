import mongoose from "mongoose";

class DatabaseConnection {
  uri: string;
  constructor(uri: string | undefined) {
    if (!uri) {
      throw new Error("Database URI is not provided");
    }
    this.uri = uri;
  }

  async connect() {
    try {
      const connection = await mongoose.connect(this.uri);
      console.log("Connected to DB.");
    } catch (error: any) {
      console.log("Error connecting to DB:", error.message);
    }
  }
}

export default DatabaseConnection;
