require("dotenv").config();
const http = require("http");
const { connectToMongo } = require("./src/config/db");
const app = require("./src/app");
const server = http.createServer(app);



async function initialize() {
  console.log("🔄 Starting initialization...");

  try {
    const mongoUrl = process.env.MONGO_URL;
    console.log("⛳ MONGO_URL is:", mongoUrl);

    if (!mongoUrl) {
      console.error("❌ MONGO_URL is undefined in worker. Check Render env.");
    }
    await connectToMongo();
    console.log("✅ Mongo connected");

    console.log("🚀 Initialization complete");
  } catch (error) {
    console.error("❌ Error during initialization:", error);
    process.exit(1);
  }
}



server.listen(process.env.PORT, "0.0.0.0", async () => {
  await initialize();
  console.log(`Worker running on http://localhost:${process.env.PORT}`);
});
