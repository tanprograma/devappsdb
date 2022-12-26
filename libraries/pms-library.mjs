// create a debug message..called jawabu
const myLibraryFunctions = {};
// error handling
myLibraryFunctions.jawabu = {
  success: function (result) {
    return {
      isSuccessful: true,
      result: result,
    };
  },

  makeError: function (message, error) {
    return {
      isSuccessful: false,
      error: new Error(message, { cause: error }),
    };
  },
};
// other functions
myLibraryFunctions.createDocument = async function (req) {
  try {
    // console.log("startiiiing");
    const newMedicine = new this(req);
    const result = await newMedicine.save();

    return this.jawabu.success(result);
  } catch (error) {
    return this.jawabu.makeError("an error occured", error);
  }
};
myLibraryFunctions.readAllDocuments = async function () {
  // reads all documents in a database if bound to model
  try {
    const result = await this.find();

    return this.jawabu.success(result);
  } catch (error) {
    return this.jawabu.makeError("an error occured", error);
  }
};
myLibraryFunctions.readAllDocumentsOfKind = async function (req) {
  // reads all documents in a database if bound to model
  try {
    const result = await this.find(req);

    return this.jawabu.success(result);
  } catch (error) {
    return this.jawabu.makeError("an error occured", error);
  }
};
myLibraryFunctions.readDocument = async function (req) {
  // reads one document (product) database if bound to model
  try {
    const result = await this.findOne(req);
    return this.jawabu.success(result);
  } catch (error) {
    return this.jawabu.makeError("an error occured", error);
  }
};
myLibraryFunctions.deleteAllDocuments = async function () {
  // reads all documents in a database if bound to model
  try {
    const result = await this.deleteMany();

    return this.jawabu.success(result);
  } catch (error) {
    return this.jawabu.makeError("an error occured", error);
  }
};
myLibraryFunctions.deleteAllDocumentsOfKind = async function (req) {
  // reads all documents in a database if bound to model
  try {
    const result = await this.deleteMany(req);

    return this.jawabu.success(result);
  } catch (error) {
    return this.jawabu.makeError("an error occured", error);
  }
};
myLibraryFunctions.deleteDocument = async function (req) {
  // reads one document (product) database if bound to model
  try {
    const result = await this.findOneAndDelete(req);
    return this.jawabu.success(result);
  } catch (error) {
    return this.jawabu.makeError("an error occured", error);
  }
};
myLibraryFunctions.updateUnit = async function (req) {
  try {
    const { product, unit } = req;
    const query = { product };
    let result = await this.findOne(query);
    result.unit = unit;
    result = await result.save();
    return this.jawabu.success(result);
  } catch (error) {
    return this.jawabu.makeError("an error occured", error);
  }
};
myLibraryFunctions.updateQuantity = async function (req) {
  try {
    const { product, quantity } = req;
    const query = { product: product };
    let result = await this.findOne(query);
    result.quantity = parseInt(quantity);
    result = await result.save();
    return this.jawabu.success(result);
  } catch (error) {
    return this.jawabu.makeError("an error occured", error);
  }
};

export default myLibraryFunctions;
