import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/routes", routes);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
app.get()