const { promisify } = require('util');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Patient = require('../models/Patient');
const Practitioner = require('../models/Practitioner');
const { Web5 } = require('@web5/api');
const { webcrypto } = require('node:crypto');

if (!globalThis.crypto) globalThis.crypto = webcrypto;

console.log(process.env.JWT_EXPIRES_IN);

let web5;
let userDid;

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const signToken = (id) => {
  expiresIn = process.env.JWT_EXPIRES_IN;
  console.log({ expiresIn });
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSignedToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.patientSignup = catchAsync(async (req, res, next) => {
  // Object.keys(req.body).forEach(key => {
  //   if (!key) return next(new AppError(`${key} cannot be empty`, 400));
  // })

  const patient = await Patient.create(req.body);

  createSignedToken(patient, 201, req, res);
});

exports.practitionerSignup = catchAsync(async (req, res, next) => {
  const practitioner = await Practitioner.create(req.body);

  createSignedToken(practitioner, 201, req, res);
});

exports.patientLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(
      new AppError('Please provide either of email or password to proceed', 400)
    );

  const patient = await Patient.findOne({ email }).select('+password');

  if (!patient || !(await Patient.comparePasswords(password, patient.password)))
    return next(new AppError('Invalid login credentials!', 401));

  patient.password = undefined;

  createSignedToken(patient, 200, req, res);
});

exports.practitionerLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(
      new AppError('Please provide either of email or password to proceed', 400)
    );

  const practitioner = await Practitioner.findOne({ email }).select(
    '+password'
  );

  if (
    !practitioner ||
    !(await Practitioner.comparePasswords(password, practitioner.password))
  )
    return next(new AppError('Invalid login credentials!', 401));

  practitioner.password = undefined;

  createSignedToken(practitioner, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1. Check if token exist
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token)
    return next(
      new AppError(
        'You are not logged in. Please log in to get autorization.',
        401
      )
    );
  // 2. Check if token is valid
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user exist
  const patient = await Patient.findById(decoded.id);
  const practitioner = await Practitioner.findById(decoded.id);

  if (!patient && practitioner)
    return next(new AppError('The user with this token does not exist', 401));

  // 4. Check if user hasn't changed password after token issuance
  if (
    (await patient?.passwordChangedAfter(decoded.iat)) &&
    (await practitioner?.passwordChangedAfter(decoded.iat))
  )
    return next(
      new AppError(
        'Password has been changed after this token was issued. Please log in again!',
        401
      )
    );
  req.user = patient || practitioner;
  next();
});

exports.isLoggedIn = async (req, res, next) => {};

// exports.updatePassword = catchAsync(async (req, res, next) => {
//   const { currentPassword, newPassword, confirmNewPassword } = req.body;

//   if (!currentPassword || !newPassword || !confirmNewPassword)
//     return next(new AppError('Please provide all required fields', 401));

//   const user = await User.findById(req.user.id).select('+password');

//   if (!(await user.comparePassword(currentPassword, user.password)))
//     return next(new AppError('The password is incorrect!'), 401);

//   user.password = newPassword;
//   user.confirmPassword = confirmNewPassword;
//   await user.save({ validateBeforeSave: true });

//   createSignedToken(user, 201, req, res);
// });

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError('You are not authorized to perform this task', 403)
      );

    next();
  };
};

exports.createDID = catchAsync(async (req, res, next) => {
  const { _id, role } = req.user;
  const { domain } = req.body;

  let options;

  if (domain)
    options = {
      techPreview: {
        dwnEndpoints: [domain],
      },
    }(({ web5, did: userDid } = await Web5.connect(options)));

  const patient = role === 'patient';

  const user = await User.findOne({ _id, role: 'patient' });

  user.userDid = userDid;
  await user.save();

  console.log({ user });

  res.status(200).json({
    status: 'success',
    message: `Your newly created DID is ${userDid}`,
    data: {
      user,
    },
  });
});

// exports.sendPhoneToken = catchAsync(async (req, res, next) => {});
