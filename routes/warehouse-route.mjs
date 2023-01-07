import { WarehouseModel } from "../models/store-model.mjs";
import commodityModel from "../models/commodity-model.mjs";
import InventoryModel from "../models/inventory-model.mjs";
import database from "../database.mjs";
import _ from "lodash";
import express from "express";
const router = express.Router();
router.use(express.json());
// router.use(express.static("public"));
router.use(express.urlencoded({ extended: true }));
// const db = "PMS";
// database(db);

router.post("/", async (req, res) => {
  // create store
  const warehouse = await WarehouseModel.create({ store: req.body.value });
  // console.log(warehouse);
  // get all the commodities ids
  const commodities = (await commodityModel.find()).map((item) => {
    return item._id.toString();
  });
  console.log(commodities);

  // use the commodity ids to initialize the inventory

  commodities.forEach(async (commodityID) => {
    const r = await InventoryModel.create({
      store: warehouse._id.toString(),
      commodity: commodityID,
    });
    console.log(`added in ${warehouse.store}: ${r.commodity}`);
  });
  console.log(warehouse);
  res.send(warehouse);
});
router.patch("/", async (req, res) => {
  const store = await WarehouseModel.findOne({ _id: req.body._id });
  store.store = req.body.store;
  const result = await store.save();
  // if (!product.isSuccessful) return product.error.message;
  // // result = _.pick(product.result, ["type", "medicine", "unit", "quantity"]);
  // const result = product.result;
  // res.header({ "Access-Control-Allow-Origin": "*" });
  res.send(result);
});

router.get("/", async (req, res) => {
  const result = await WarehouseModel.find();
  // if (!products.isSuccessful) return products.error.message;
  // map objects to lodash objects and send
  // result = products.result.map((item) => {
  //   return _.pick(item, ["type", "product", "unit", "quantity"]);
  // });
  // const result = products.result;
  res.send(result);
});
// router.post("/read-all-of-kind", async (req, res) => {
//   if (req.body === {}) return { error: "request body empty" };
//   const products = await WarehouseModel.readAllOfKind(req.body);
//   if (!products.isSuccessful) return products.error.message;
//   // map objects to lodash objects and send
//   result = products.result.map((item) => {
//     return _.pick(item, ["type", "product", "unit", "quantity"]);
//   });
//   res.send(result);
// });
// router.post("/read-one", async (req, res) => {
//   const product = await WarehouseModel.readOne(req.body);
//   if (!product.isSuccessful) return product.error.message;
//   // map objects to lodash objects and send
//   result = _.pick(product.result, ["type", "product", "unit", "quantity"]);

//   res.send(result);
// });

// router.post("/update-all", async (req, res) => {
//   const {
//     "product-3": product,
//     "quantity-3": quantity,
//     "unit-3": unit,
//   } = req.body;
//   await WarehouseModel.updateQuantity({ product, quantity });
//   const results = await WarehouseModel.updateUnit({ product, unit });
//   if (!results.isSuccessful) return results.error.message;
//   // map objects to lodash objects and send
//   const result = _.pick(results.result, [
//     "type",
//     "product",
//     "unit",
//     "quantity",
//   ]);

//   res.send(result);
// });
// router.post("/update-quantity", async (req, res) => {
//   const { "product-2": product, quantity } = req.body;
//   const results = await WarehouseModel.updateQuantity({ product, quantity });
//   if (!results.isSuccessful) return results.error.message;
//   // map objects to lodash objects and send
//   const result = _.pick(results.result, [
//     "type",
//     "product",
//     "unit",
//     "quantity",
//   ]);

//   res.send(result);
// });
// router.post("/update-unit", async (req, res) => {
//   const { "product-1": product, unit } = req.body;
//   const results = await WarehouseModel.updateUnit({ product, unit });
//   if (!results.isSuccessful) return results.error.message;
//   // map objects to lodash objects and send
//   const result = _.pick(results.result, [
//     "type",
//     "product",
//     "unit",
//     "quantity",
//   ]);

//   res.send(result);
// });

// router.post("/delete-one", async (req, res) => {
//   const product = await WarehouseModel.deleteOne(req.body);
//   if (!product.isSuccessful) return product.error.message;
//   res.send(product.result);
// });
// router.post("/delete-all-of-kind", async (req, res) => {
//   const products = await WarehouseModel.deleteAllOfKind(req.body);
//   if (!products.isSuccessful) return products.error.message;
//   res.send(products.result);
// });
// router.post("/delete-all", async (req, res) => {
//   const products = await WarehouseModel.deleteAll();
//   if (!products.isSuccessful) return products.error.message;
//   res.send(products.result);
// });

export default router;
