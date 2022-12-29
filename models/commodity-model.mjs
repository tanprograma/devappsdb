// const {
//   createDocument,
//   readDocuments,
//   jawabu,
// } = require("../pito-apothecary-library");
// const myLibrary = require("../libraries/pms-library.mjs");
import myLibrary from "../libraries/pms-library.mjs";

import mongoose from "mongoose";

const commoditySchema = new mongoose.Schema({
  commodity: {
    type: String,
    minlength: 3,
    required: true,
    lowercase: true,
  },
  units: [
    {
      unit: { type: mongoose.Schema.Types.ObjectId, ref: "Units" },
      value: Number,
    },
  ],
});

// static methods
// create a debug message..called jawabu
commoditySchema.statics.jawabu = myLibrary.jawabu;
commoditySchema.statics.create = myLibrary.createDocument;
commoditySchema.statics.readAll = myLibrary.readAllDocuments;
commoditySchema.statics.readAllOfKind = myLibrary.readAllDocumentsOfKind;
commoditySchema.statics.readOne = myLibrary.readDocument;
commoditySchema.statics.deleteAll = myLibrary.deleteAllDocuments;
commoditySchema.statics.deleteAllOfKind = myLibrary.deleteAllDocumentsOfKind;
commoditySchema.statics.deleteOne = myLibrary.deleteDocument;
commoditySchema.statics.updateQuantity = myLibrary.updateQuantity;
commoditySchema.statics.updateUnit = myLibrary.updateUnit;
// ends here
// commoditySchema.statics.dispense = async function (req, Model) {
//   const quantityUpdated = await this.updateQuantitySubtract(req);
//   const refillTransactionCreated = await this.createDispenseTransaction(
//     req,
//     Model
//   );
//   return result;
// };
// commoditySchema.statics.updateQuantitySubtract = async function (req) {
//   let { dispenseQuantity, genericName } = req;

//   // x;
//   // update commodity quantity and expiry date
//   const queryCondition = { "generic-name": genericName };
//   const query = await this.findOne(queryCondition);
//   // update quantity and expiry
//   query.quantity -= parseInt(dispenseQuantity);
//   await query.save();

//   return true;
// };
// commoditySchema.statics.createDispenseTransaction = async function (req, Model) {
//   let {
//     dispenseQuantity,
//     patient,
//     unit,
//     genericName,
//     scientificName,
//     dispenser,
//     strength,
//   } = req;
//   // const {dispenser} = req.user.name
//   const dispenseCondition = {
//     scientificName,
//     genericName,
//     quantity: dispenseQuantity,
//     unit,
//     patient,
//     dispenser,
//     strength,
//   };
//   try {
//     const dispenseRecord = new Model(dispenseCondition);
//     await dispenseRecord.save();
//     return true;
//   } catch (error) {
//     return false;
//   }

//   // return savedDispenseRecord;
// };

// commoditySchema.statics.refill = async function (req, Model) {
//   try {
//     const quantityUpdated = await this.updateQuantityAdd(req);
//     if (!quantityUpdated)
//       return {
//         status: quantityUpdated,
//         error: "could not update quantity",
//         success: null,
//       };
//     const expiryUpdated = await this.updateExpiryDate(req);
//     if (!expiryUpdated)
//       return {
//         status: expiryUpdated,
//         error: "could not update expiry",
//         success: null,
//       };
//     const refillTransactionCreated = await this.createRefillTransaction(
//       req,
//       Model
//     );
//     if (!refillTransactionCreated)
//       return {
//         status: refillTransactionCreated,
//         error: "could not create refill Transaction",
//         success: null,
//       };
//     return {
//       status: refillTransactionCreated,
//       error: null,
//       success: "refill Transaction successful",
//     };
//   } catch (error) {}
// };
// // does the updatting of refill docs
// commoditySchema.statics.createRefillTransaction = async function (req, Model) {
//   let {
//     refillQuantity,
//     supplier,
//     recorder,
//     unit,
//     genericName,
//     scientificName,
//     expiryDate,
//     strength,
//   } = req;
//   const refillCondition = {
//     scientificName,
//     genericName,
//     quantity: refillQuantity,
//     unit,
//     expiry: expiryDate,
//     supplier,
//     recorder,
//     strength,
//   };
//   // create protype
//   try {
//     const refillRecord = new Model(refillCondition);
//     // save prototype
//     await refillRecord.save();

//     return true;
//   } catch (error) {
//     return false;
//   }
// };
// commoditySchema.statics.updateQuantityAdd = async function (req) {
//   const queryCondition = { "generic-name": new RegExp(genericName, "i") };
//   const query = await this.findOne(queryCondition);

//   return true;
// };

// commoditySchema.statics.updateExpiryDate = async function (req) {
//   let { expiryDate } = req;

//   const queryCondition = { "generic-name": genericName };
//   const query = await this.findOne(queryCondition);
//   query.expiry = query.expiry < expiryDate ? expiryDate : query.expiry;
//   await query.save();

//   return true;
// };

const commodityModel = mongoose.model("Commodities", commoditySchema);

export default commodityModel;
