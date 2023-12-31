const express = require("express");
const {
  addtransaction,
  getAlltransaction,
  edittransaction,
  deletetransaction,
} = require("../controllers/transactionCtrl");

//router object
const router = express.Router();

//routes
//add transaction POST MEthod
router.post("/add-transaction", addtransaction);
//Edit transaction POST MEthod
router.patch("/edit-transaction", edittransaction);
//Delete transaction POST MEthod
router.delete("/delete-transaction", deletetransaction);

//get transactions
router.post("/get-transaction", getAlltransaction);

module.exports = router;
