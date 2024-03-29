const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name of the user'],
  },
  email: {
    type: String,
    required: [true, 'Please enter email address'],
    unique: true,
    lowcase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password is not the same',
    },
  },
  passwordChangedAt: Date,
  passwordResetCode: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  numberPhone: {
    type: String,
    required: [true, 'Please enter a phone number'],
    validate: {
      validator: function (el) {
        return validator.isMobilePhone(el, ['vi-VN']);
      },
      message: 'Please enter a valid number phone',
    },
  },
  address: {
    type: String,
    required: [true, 'Please enter address'],
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  // False mean not change
  return false;
};

userSchema.methods.createPasswordResetCode = function () {
  const resetCode = crypto.randomBytes(32).toString('hex');

  this.passwordResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');

  console.log({ resetCode }, this.passwordResetCode);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetCode;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
