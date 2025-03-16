import express from "express";
import cors from "cors";
import path from "path";
import * as dotenv from "dotenv";
import * as http from "http";
import { connectDB } from "./config/database"; // Import MongoDB connection
import { routes } from "./routes/routes";
import { authentificationMiddleware } from "./util/auth.middleware";

dotenv.config({ path: ".env" });

const app = express();
app.use(express.json({ limit: "10mb" })); // Use express.json() directly
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set("host", process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0");
app.set("port", process.env.PORT || 8081);
app.set("env", process.env.NODE_ENVR || "development");

app.use("/api", authentificationMiddleware ,routes);

export const server: http.Server = http.createServer(app);

(async () => {
  try {
    await connectDB(); // Connect to MongoDB

    server.listen(app.get("port"), (): void => {
      console.log(
        "🚀 App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
      );
      console.log("✅ Press CTRL-C to stop\n");
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
})();
