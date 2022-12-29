import dispensed from "./routes/dispensed-route.mjs";
import issued from "./routes/issued-route.mjs";
import received from "./routes/received-route.mjs";
import requested from "./routes/requests-route.mjs";
import commodities from "./routes/commodities-route.mjs";
import units from "./routes/units-route.mjs";
import stores from "./routes/stores-routes.mjs";
import inventory from "./routes/inventory-route.mjs";
import requests from "./routes/requests-route.mjs";
import express from "express";
import database from "./database.mjs";
const db = "PMS-PRO";
database(db);
const app = express();
// app.set("view engine", "pug");
// app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/dispensed", dispensed);
app.use("/received", received);
app.use("/issued", issued);

app.use("/commodities", commodities);
app.use("/units", units);
app.use("/stores", stores);
app.use("/requests", requests);
app.use("/inventory", inventory);

const port = 5500;
app.listen(port, () => {
  console.log("server is listening....");
});
