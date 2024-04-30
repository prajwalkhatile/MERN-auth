const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => /^[a-zA-Z0-9_-]{3,16}$/.test(value),
        message: (props) =>
          `${props.value} is not a valid username. Username must be 3 to 16 characters long and can only contain letters, numbers, dashes, and underscores.`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          ),
        message: (props) =>
          `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
