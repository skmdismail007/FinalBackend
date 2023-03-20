const express = require("express");
const {
  getCoins,
  createCoins,
  updateCoins,
} = require("../controllers/coinsController");
const {
  getCoin_address,
  createCoin_address,
  Get_by_Coin_idCoin_address,
  Get_by_Coin_idCoin_address_user_update,
} = require("../controllers/coin_addressController");
const {
  createUsers_for_admin,
  getUsers_for_admin,
  Get_by_user_id_details,
  createUsers,
  getUsers,
} = require("../controllers/usersController");
const { fetchUser } = require("../controllers/loginController");
const {
  getTransactions,
  postTransactions,
} = require("../controllers/transactionController");
const { getWallet, createWallet } = require("../controllers/walletController");
 const  createBip  = require("../controllers/Bip39");
const multer = require("multer");

const router = express.Router();

// bip39
 router.route("/api/bip").get(createBip);

router.route("/api/coins").get(getCoins);
router.route("/api/coins").post(createCoins);
router.route("/api/coins/:id").put(updateCoins);

router.route("/login").post(fetchUser); // for admin

router.route("/api/Users_for_admin").get(getUsers_for_admin); // for admin
router.route("/api/Users_for_admin").post(createUsers_for_admin); // for admin

router.route("/api/users").get(getUsers);
router.route("/api/users/:id").get(Get_by_user_id_details);
router.route("/api/users").post(createUsers);

router.route("/api/coin/user/wallet/:coinId/:userId").get(getWallet);
router.route("/api/coin/user/wallet/:coinId/:userId").post(createWallet);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + ".xlsx");
  },
});

const upload = multer({ storage: storage });

router.route("/api/coins/coins_address").get(getCoin_address);
router
  .route("/api/coins/coins_address/:id")
  .post(upload.single("file"), createCoin_address);
router.route("/api/coins/coins_address/:id").get(Get_by_Coin_idCoin_address);
router
  .route("/api/coins/coins_address/:coinId/:userId/:coin_addressId")
  .put(Get_by_Coin_idCoin_address_user_update);

router.route("/api/transactions").get(getTransactions);
router.route("/api/transactions").post(postTransactions);

// router.route('/:id').get(getProfile)

// router.route('/').post(createProfiles)

// router.route('/:id').put(updateProfile)

// router.route('/:id').delete(deleteProfile)

module.exports = router;
