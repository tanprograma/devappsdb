// const {
//   createDocument,
//   readDocuments,
//   jawabu,
// } = require("../pito-apothecary-library");
// const myLibrary = require("../libraries/pms-library.mjs");
import myLibrary from "../libraries/pms-library.mjs";

import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
  },
  commodity: { type: mongoose.Schema.Types.ObjectId, ref: "Commodities" },
  received: [
    {
      date: {
        type: Date,
        default: function () {
          return new Date();
        },
        immutable: true,
      },
      transaction: { type: mongoose.Schema.Types.ObjectId, ref: "Receiveds" },
    },
  ],
  issued: [
    {
      date: {
        type: Date,
        default: function () {
          return new Date();
        },
        immutable: true,
      },
      transaction: { type: mongoose.Schema.Types.ObjectId, ref: "Issueds" },
    },
  ],
  dispensed: [
    {
      date: {
        type: Date,
        default: function () {
          return new Date();
        },
        immutable: true,
      },
      transaction: { type: mongoose.Schema.Types.ObjectId, ref: "Dispenseds" },
    },
  ],
});

// static methods
// create a debug message..called jawabu
inventorySchema.statics.jawabu = myLibrary.jawabu;
inventorySchema.statics.create = myLibrary.createDocument;
inventorySchema.statics.readAll = myLibrary.readAllDocuments;
inventorySchema.statics.readAllOfKind = myLibrary.readAllDocumentsOfKind;
inventorySchema.statics.readOne = myLibrary.readDocument;
inventorySchema.statics.deleteAll = myLibrary.deleteAllDocuments;
inventorySchema.statics.deleteAllOfKind = myLibrary.deleteAllDocumentsOfKind;
inventorySchema.statics.deleteOne = myLibrary.deleteDocument;
inventorySchema.statics.updateQuantity = myLibrary.updateQuantity;
inventorySchema.statics.updateUnit = myLibrary.updateUnit;
// ends here
// inventorySchema.statics.dispense = async function (req, Model) {
//   const quantityUpdated = await this.updateQuantitySubtract(req);
//   const refillTransactionCreated = await this.createDispenseTransaction(
//     req,
//     Model
//   );
//   return result;
// };
// inventorySchema.statics.updateQuantitySubtract = async function (req) {
//   let { dispenseQuantity, genericName } = req;

//   // x;
//   // update medicine quantity and expiry date
//   const queryCondition = { "generic-name": genericName };
//   const query = await this.findOne(queryCondition);
//   // update quantity and expiry
//   query.quantity -= parseInt(dispenseQuantity);
//   await query.save();

//   return true;
// };
// inventorySchema.statics.createDispenseTransaction = async function (req, Model) {
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

// inventorySchema.statics.refill = async function (req, Model) {
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
// inventorySchema.statics.createRefillTransaction = async function (req, Model) {
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
// inventorySchema.statics.updateQuantityAdd = async function (req) {
//   const queryCondition = { "generic-name": new RegExp(genericName, "i") };
//   const query = await this.findOne(queryCondition);

//   return true;
// };

// inventorySchema.statics.updateExpiryDate = async function (req) {
//   let { expiryDate } = req;

//   const queryCondition = { "generic-name": genericName };
//   const query = await this.findOne(queryCondition);
//   query.expiry = query.expiry < expiryDate ? expiryDate : query.expiry;
//   await query.save();

//   return true;
// };

const InventoryModel = mongoose.model("Inventories", inventorySchema);

export default InventoryModel;
