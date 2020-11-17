const { Category, User } = require("../models");

module.exports = {
  index: async (req, res) => {
    const categories = await Category.find().limit(30);
    res.json(categories);
  },

  show: async (req, res) => {
    const category = await Category.find({
      name: { $regex: req.query.name, $options: "i" },
    }).limit(10);
    res.json(category);
  },

  create: async (req, res) => {
    const user = await User.findById(req.user);
    if (user.admin === true) {
      const form = formidable({ multiples: true });

      const category = await new Category({
        name: req.body.name,
        banner: [],
      });
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(files, fields);
        let category = await new Category(fields);
        if (files.image !== undefined) {
          category.image = `https://carlitosbucket.s3-sa-east-1.amazonaws.com/${
            category._id
          }.${files.image.type.replace("image/", "")}`;
          console.log(category);
          let img = fs.readFileSync(files.image.path);
          let data = {
            Bucket: "carlitosbucket",
            Key: `${category._id}.${files.image.type.replace("image/", "")}`,
            ContentType: files.image.type,
            Body: img,
          };
          s3.putObject(data, async () => {
            console.log("Successfully uploaded data to myBucket/myKey");
          });
        }

        await category.save();
        return res.json(category);
      });
    } else {
      return res.json("unauthorized");
    }
  },

  update: async (req, res) => {
    const user = await User.findById(req.user);
    if (user.admin === true) {
      const form = formidable({ multiples: true });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.log(err);
          return;
        }

        const category = await Category.findByIdAndUpdate(fields._id, fields, {
          new: true,
        });
        if (files.image !== undefined) {
          category.image = `https://carlitosbucket.s3-sa-east-1.amazonaws.com/${
            category._id
          }.${files.imageFile.type.replace("image/", "")}`;

          console.log(category);
          let img = fs.readFileSync(files.imageFile.path);
          let data = {
            Bucket: "carlitosbucket",
            Key: `${category._id}.${files.imageFile.type.replace(
              "image/",
              ""
            )}`,
            ContentType: files.imageFile.type,
            Body: img,
          };
          s3.putObject(data, async () => {
            console.log("Successfully uploaded data to myBucket/myKey");
          });
        }
        await category.save();
        return res.json(category);
      });
    } else {
      return res.json("unauthorized");
    }
  },

  erase: async (req, res) => {
    const user = await User.findById(req.user);
    if (user.admin === true) {
      const category = await Category.findById(req.body._id);
      if (category.productsList.length > 0) {
        return res.json("unable to delete category");
      } else {
        const category = await Category.findByIdAndDelete(req.body._id);
        return res.json("category deleted");
      }
    } else {
      return res.json("unauthorized");
    }
  },
};
