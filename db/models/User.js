const mongoose = require("mongoose");

const ROLES = {
   USER: "user",
   ADMIN: "admin"
};

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      unique: true
   },
   password: {
      type: String
   },
   role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER
   },
   createdAt: {
      type: Date,
      default: new Date()
   },
   updatedAt: {
      type: Date,
      default: new Date()
   }
});

userSchema.pre("save", function(next) {
   this.updatedAt = Date.now();
   next();
});

const User = mongoose.model("User", userSchema);
User.ROLES = ROLES;
module.exports = User;
