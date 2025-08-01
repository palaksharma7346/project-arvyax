const express = require('express');
const { registerUser, loginUser, getUserInfo } =require('../controllers/authController');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');


router.post('/register', registerUser);
router.post('/login', loginUser);
  router.get('/getUser',protect, getUserInfo);

 

module.exports = router;
