const mongoose = require('mongoose');
const practitionerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 3,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: 'practitioner',
    },
    designation: {
      type: String,
      trim: true,
    },
    did: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

practitionerSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const Practitioner = mongoose.model('Practioner', practitionerSchema);
module.exports = Practitioner;
