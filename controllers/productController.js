const { Product, User, Category } = require("../models");
const formidable = require("formidable");
const { s3 } = require("../awsConfig");
const fs = require("fs");

module.exports = {
  getProducts: async (req, res) => {
    const products = await Product.find().limit(30);
    res.json(products);
  },

  getProductsByName: async (req, res) => {
    const products = await Product.find({
      name: { $regex: req.query.name, $options: "i" },
    }).limit(10);
    res.json(products);
  },

  getProductsByCategory: async (req, res) => {
    const { category } = req.params;
    const products = await Category.find({ name: category }).populate(
      "productsList"
    );
    res.json(products);
  },

  createProduct: async (req, res) => {
    const user = await User.findById(req.user);
    if (user.admin === true) {
      const form = formidable({ multiples: true });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.log(err);
          return;
        }

        let product = await new Product(fields);
        product.image = `https://carlitosbucket.s3-sa-east-1.amazonaws.com/${
          product._id
        }.${files.imageFile.type.replace("image/", "")}`;
        await product.save();
        console.log(product);
        let img = fs.readFileSync(files.imageFile.path);
        let data = {
          Bucket: "carlitosbucket",
          Key: `${product._id}.${files.imageFile.type.replace("image/", "")}`,
          ContentType: files.imageFile.type,
          Body: img,
        };
        s3.putObject(data, async () => {
          console.log("Successfully uploaded data to myBucket/myKey");
        });

        return res.json(product);
      });
    } else {
      return res.json("unauthorized");
    }
  },

  updateProduct: async (req, res) => {
    const user = await User.findById(req.user);
    if (user.admin === true) {
      const form = formidable({ multiples: true });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.log(err);
          return;
        }

        const product = await Product.findOneAndUpdate(
          { _id: fields._id },
          fields,
          {
            new: true,
          }
        );
        product.image = `https://carlitosbucket.s3-sa-east-1.amazonaws.com/${
          product._id
        }.${files.imageFile.type.replace("image/", "")}`;
        await product.save();
        console.log(product);
        let img = fs.readFileSync(files.imageFile.path);
        let data = {
          Bucket: "carlitosbucket",
          Key: `${product._id}.${files.imageFile.type.replace("image/", "")}`,
          ContentType: files.imageFile.type,
          Body: img,
        };
        s3.putObject(data, async () => {
          console.log("Successfully uploaded data to myBucket/myKey");
        });
      });

      return res.json("product updated");
    } else {
      return res.json("unauthorized");
    }
  },

  deleteProduct: async (req, res) => {
    const user = await User.findById(req.user);
    if (user.admin === true) {
      const products = await Product.findByIdAndDelete(req.body._id);
      return res.json("product deleted");
    } else {
      return res.json("unauthorized");
    }
  },
};
