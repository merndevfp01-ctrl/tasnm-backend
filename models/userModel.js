const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'name is required'] },
    email: { type: String, required: [true, 'email is required'] },
    password: { type: String, required: [true, 'password is required'] },
    role: { type: String, enum: ["admin", "customer"], default:"customer" }
},
    { timestamps: true }
);

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel