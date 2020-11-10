const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

module.exports = (mongoose, Schema) => {
  const UserSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    telephone: { type: Number, required: true },
    password: { type: String, required: true },
    orderlist: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    tokens: [],
  });

  UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  });

  const User = mongoose.model("User", UserSchema);

  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  return User;
};
