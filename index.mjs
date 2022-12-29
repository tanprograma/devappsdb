import dispensed from "./routes/dispensed-route.mjs";
import medicines from "./routes/medicine-route.mjs";
import units from "./routes/units-route.mjs";
import express from "express";
import database from "./database.mjs";
const db = "PMS";
database(db);

const app = express();
// app.set("view engine", "pug");
// app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/dispensed", dispensed);
app.use("/medicines", medicines);
app.use("/units", units);

const port = 5500;
app.listen(port, () => {
  console.log("server is listening....");
});
