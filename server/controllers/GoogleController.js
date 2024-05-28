
const admin = require('firebase-admin');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const serviceAccount = require('../config/firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.authGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { name, email } = decodedToken;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, password: '', isAdmin: false });
      await user.save();
    }
    const authToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ token: authToken });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
