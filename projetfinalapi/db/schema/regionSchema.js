const mongoose = require("mongoose");
const slugify = require("slugify");

const regionSchema = new mongoose.Schema({
  nom: String,
  actif: Boolean,
  verifie: Boolean,
  slug: String,
});

regionSchema.pre("save", function (next) {
  const slug = slugify(this.nom, {
    locale: "fr",
    lower: true,
  });

  this.slug = slug;

  next();
});

regionSchema.statics.getRegions = function () {
  return new Promise((resolve, reject) => {
    this.find({}, (err, docs) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      resolve(docs);
    });
  });
};

regionSchema.statics.updateRegion = function (id, body) {
  return new Promise((resolve, reject) => {
    this.findByIdAndUpdate(id, body, (err, doc) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(doc);
    });
  });
};

regionSchema.statics.deleteRegion = function (id) {
  return new Promise((resolve, reject) => {
    this.findByIdAndDelete(id, (err, doc) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(doc);
    });
  });
};

regionSchema.statics.findRegion = function (id) {
  return new Promise((resolve, reject) => {
    this.findById(id, (err, doc) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(doc);
    });
  });
};

regionSchema.statics.addRegion = function (body) {
  return new Promise((resolve, reject) => {
    this.create(body, (err, doc) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(doc);
    });
  });
};

module.exports = mongoose.model("Region", regionSchema);
