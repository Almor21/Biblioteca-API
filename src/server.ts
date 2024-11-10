import createApp from "./app";
import handleMongoConnection from "./db";
import dotenv from "dotenv";

dotenv.config();
const app = createApp();

handleMongoConnection();

app.listen(3000, () => {
  console.log("Server listening to port 3000.");
});
