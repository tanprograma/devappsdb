import Model from "../models/transaction-model.mjs";
import { StoreModel } from "../models/store-model.mjs";
import CommodityModel from "../models/commodity-model.mjs";
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
const f = async function (req, model) {
  return req.map(async (item) => {
    item.commodity = await model.findOne({ commodity: item.commodity });
  });
};
router.post("/", async (req, res) => {
  console.log(req.body);

  req.body.host = (
    await StoreModel.findOne({ store: req.body.host })
  )._id.toString();

  for (let i = 0; i < req.body.commodities.length; i++) {
    const item = (
      await CommodityModel.findOne({
        commodity: req.body.commodities[i].commodity,
      })
    )._id.toString();
    // sets the id of commodities
    req.body.commodities[i].commodity = item;
    console.log(item);
  }
  console.log(req.body);
  const product = await Model.DispensedModel.create(req.body);
  // for loop that sends value to inventories
  for (let i = 0; i < product.commodities.length; i++) {
    // find and update One
    const item = await InventoryModel.findOne({
      commodity: product.commodities[i].commodity,
    });
    item.dispensed.push({ transaction: product._id });
    await item.save();
  }
  res.send(product);
});

router.get("/", async (req, res) => {
  const result = await Model.DispensedModel.find();

  res.send(result);
});
// router.get("/", async (req, res) => {
//   const result = await Model.DispensedModel.find().populate({
//     path: "medications",
//     populate: { path: "unit" },
//   });
//   // if (!products.isSuccessful) return products.error.message;
//   // // map objects to lodash objects and send
//   // const result = products.result;
//   // result = products.result.map((item) => {
//   //   return _.pick(item, ["type", "product", "unit", "quantity"]);
//   // });
//   res.send(result);
// });
// router.post("/read-all-of-kind", async (req, res) => {
//   if (req.body === {}) return { error: "request body empty" };
//   const products = await DispensedModel.readAllOfKind(req.body);
//   if (!products.isSuccessful) return products.error.message;
//   // map objects to lodash objects and send
//   result = products.result.map((item) => {
//     return _.pick(item, ["type", "product", "unit", "quantity"]);
//   });
//   res.send(result);
// });
// router.post("/read-one", async (req, res) => {
//   const product = await DispensedModel.readOne(req.body);
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
//   await DispensedModel.updateQuantity({ product, quantity });
//   const results = await DispensedModel.updateUnit({ product, unit });
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
//   const results = await DispensedModel.updateQuantity({ product, quantity });
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
//   const results = await DispensedModel.updateUnit({ product, unit });
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
//   const product = await DispensedModel.deleteOne(req.body);
//   if (!product.isSuccessful) return product.error.message;
//   res.send(product.result);
// });
// router.post("/delete-all-of-kind", async (req, res) => {
//   const products = await DispensedModel.deleteAllOfKind(req.body);
//   if (!products.isSuccessful) return products.error.message;
//   res.send(products.result);
// });
// router.post("/delete-all", async (req, res) => {
//   const products = await DispensedModel.deleteAll();
//   if (!products.isSuccessful) return products.error.message;
//   res.send(products.result);
// });

export default router;
