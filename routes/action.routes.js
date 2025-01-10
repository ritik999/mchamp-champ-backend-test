import { Router } from "express";
import { addCoin, allData, buyWithCoin, totalCoins } from "../controllers/action.controllers.js";

const router=Router();


router.get('/total',totalCoins)
router.put('/buy',buyWithCoin)
router.put('/add',addCoin)
router.get('/all',allData);

export {router as actionRoute}
