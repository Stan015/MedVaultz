const mongoose = require('mongoose');
const patientSchema = mongoose.Schema(
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
      default: 'patient',
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

patientSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
