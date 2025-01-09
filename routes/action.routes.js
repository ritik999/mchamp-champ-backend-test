import { Router } from "express";
import { addCoin, buyWithCoin, totalCoins } from "../controllers/action.controllers.js";

const router=Router();


router.get('/total',totalCoins)
router.put('/buy',buyWithCoin)
router.put('/add',addCoin)

export {router as actionRoute}
