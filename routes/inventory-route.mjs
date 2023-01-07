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

router.post("/create", async (req, res) => {
  const product = await InventoryModel.create(req.body);
  if (!product.isSuccessful) return product.error.message;
  const result = product.result;
  // if (!product.isSuccessful) return product.error.message;
  // const result = _.pick(product.result, ["type", "product", "unit", "quantity"]);

  res.send(result);
});

router.get("/allstores", async (req, res) => {
  const result = await InventoryModel.find().populate({ path: "store" });
  // if (!products.isSuccessful) return products.error.message;
  // // map objects to lodash objects and send
  // const result = products.result;
  // result = products.result.map((item) => {
  //   return _.pick(item, ["type", "product", "unit", "quantity"]);
  // });
  res.send(result);
});
router.get("/allstores/:commodity", async (req, res) => {
  const result = await InventoryModel.find({ commodity: req.params.commodity });
  // if (!products.isSuccessful) return products.error.message;
  // // map objects to lodash objects and send
  // const result = products.result;
  // result = products.result.map((item) => {
  //   return _.pick(item, ["type", "product", "unit", "quantity"]);
  // });
  res.send(result);
});
router.get("/stores/:store", async (req, res) => {
  const result = await InventoryModel.find({ store: req.params.store });
  // if (!products.isSuccessful) return products.error.message;
  // // map objects to lodash objects and send
  // const result = products.result;
  // result = products.result.map((item) => {
  //   return _.pick(item, ["type", "product", "unit", "quantity"]);
  // });
  res.send(result);
});
router.get("/stores/:store/:commodity", async (req, res) => {
  const result = await InventoryModel.findOne({
    store: req.params.store,
    commodity: req.params.store,
  });
  // if (!products.isSuccessful) return products.error.message;
  // // map objects to lodash objects and send
  // const result = products.result;
  // result = products.result.map((item) => {
  //   return _.pick(item, ["type", "product", "unit", "quantity"]);
  // });
  res.send(result);
});
// router.post("/read-all-of-kind", async (req, res) => {
//   if (req.body === {}) return { error: "request body empty" };
//   const products = await InventoryModel.readAllOfKind(req.body);
//   if (!products.isSuccessful) return products.error.message;
//   // map objects to lodash objects and send
//   result = products.result.map((item) => {
//     return _.pick(item, ["type", "product", "unit", "quantity"]);
//   });
//   res.send(result);
// });
// router.post("/read-one", async (req, res) => {
//   const product = await InventoryModel.readOne(req.body);
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
//   await InventoryModel.updateQuantity({ product, quantity });
//   const results = await InventoryModel.updateUnit({ product, unit });
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
//   const results = await InventoryModel.updateQuantity({ product, quantity });
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
//   const results = await InventoryModel.updateUnit({ product, unit });
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
//   const product = await InventoryModel.deleteOne(req.body);
//   if (!product.isSuccessful) return product.error.message;
//   res.send(product.result);
// });
// router.post("/delete-all-of-kind", async (req, res) => {
//   const products = await InventoryModel.deleteAllOfKind(req.body);
//   if (!products.isSuccessful) return products.error.message;
//   res.send(products.result);
// });
// router.post("/delete-all", async (req, res) => {
//   const products = await InventoryModel.deleteAll();
//   if (!products.isSuccessful) return products.error.message;
//   res.send(products.result);
// });

export default router;
