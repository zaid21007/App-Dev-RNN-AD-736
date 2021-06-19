const express = require('express');
const bcrypt = require('bcryptjs');
const {
  User,
  validateUser,
  generateToken,
  matchPassword,
} = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { handleRouteErrors } = require('../tryCatch');
const auth = require('../Middlewares/auth');
const admin = require('../Middlewares/admin');
const router = express.Router();

router.post(
  '/signup',
  handleRouteErrors(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let { name, email, password, accountType } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('Email Already In Use');
    if (!accountType) accountType = 'basic';
    const user = new User({
      name,
      email,
      password,
      accountType,
    });
    const salt = await bcrypt.genSalt(10);
    const HASHED_PASS = await bcrypt.hash(user.password, salt);
    user.password = HASHED_PASS;
    await user.save();
    const token = generateToken(user);
    res.status(200).send(token);
  })
);

router.post(
  '/login',
  handleRouteErrors(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await matchPassword(user, req.body.password))) {
      const token = generateToken(user);
      return res.status(200).send(token);
    }
    res.status(400).send('Invalid Credentials');
  })
);

router.get(
  '/',
  [auth, admin],
  handleRouteErrors(async (req, res) => {
    let users = await User.find();
    if (users) {
      return res.status(200).send(users);
    }
    res.status(404).send('Not Found');
  })
);

router.delete(
  '/delete/:id',
  [auth, admin],
  handleRouteErrors(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id).catch((err) =>
      res.status(404).send(err)
    );
    if (user) await user.remove().catch((err) => res.status(500).send(err));
    res.status(200).send('Deleted Successfully');
  })
);

// router.put(
//   '/updateuser/:id',
//   [auth, admin],
//   handleRouteErrors(async (req, res) => {
//     const id = req.params.id;
//     const user = await User.findById(id).catch((err) =>
//       res.status(404).send('No User Found')
//     );
//     if (!user) return res.status(404).send('No User Found');
//     await User.updateOne(
//       { _id: id },
//       {
//         name: req.body.name,
//         email: req.body.email,
//         accountType: req.body.accountType,
//       }
//     ).catch((err) => res.status(500).send('Unable tp Update user'));
//     res.status(200).send('Successfully Updated User');
//   })
// );

// router.put(
//   '/update/:id',
//   [auth],
//   handleRouteErrors(async (req, res) => {
//     const id = req.params.id;
//     const user = await User.findById(id).catch((err) =>
//       res.status(404).send('No User Found')
//     );
//     const { accountType } = user;
//     if (!user) return res.status(404).send('No User Found');
//     await User.updateOne(
//       { _id: id },
//       { name: req.body.name, email: req.body.email, accountType: accountType }
//     ).catch((err) => res.status(500).send('Unable tp Update user'));
//     res.status(200).send('Successfully Updated User');
//   })
// );

router.put(
  '/update/:id',
  [auth],
  handleRouteErrors(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id).catch((err) =>
      res.status(404).send('No User Found')
    );
    if (req.body.accountType && !req.user.isAdmin) user.approval = false;
    await user.save();
    if (!user) return res.status(404).send('No User Found');
    await User.updateOne({ _id: id }, { $set: req.body }).catch((err) =>
      res.status(500).send('Unable tp Update user')
    );
    res.status(200).send('Successfully Updated User');
  })
);

router.get(
  '/:id',
  [auth, admin],
  handleRouteErrors(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id).catch((err) =>
      res.status(500).send("Can't find user")
    );
    if (!user) return res.status(404).send('User Not Found');
    res.status(200).send(user);
  })
);

module.exports = router;
