import { connection } from "../dbConnection.js";

export const totalCoins=async(req,res)=>{
    try {
        const { userId } = req.query;
        console.log(req.query);
        
        const [rows] = await connection.query('SELECT * FROM users WHERE userId = ?', [userId]);
        
        if(rows.length>0){
            res.status(200).json({success:true,coins:rows[0].coins});
        }else{
            throw new Error('something went wrong');
        }
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

export const buyWithCoin = async (req, res) => {
    try {
        // const { coin, reason } = req.body;
        const { userId, coin, purpose='' } = req.query;

        const [rows] = await connection.query('SELECT * FROM users WHERE userId = ?', [userId]);

        if (rows.length > 0) {

            if(rows[0].coins<coin){
                throw new Error('Not enough coin to make a buy');
            }

            const [insertRows] = await connection.query('INSERT INTO shop_action (userId, action, coins, purpose) VALUES(?, ?, ?, ?)', [userId, 'coins_spend', coin, purpose]);

            if (insertRows) {
                const [insertRows] = await connection.query('UPDATE users SET coins=? WHERE userId=?', [rows[0].coins - Number(coin), userId]);
                console.log(insertRows);
                if (insertRows) {
                    res.status(200).json({ message: 'transaction done', coin });
                } else {
                    throw new Error('something went wrong');
                }
            } else {
                throw new Error('something went wrong');
            }

        } else {
            throw new Error('user not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}


export const addCoin = async (req, res) => {
    try {
        // const { coin, reason } = req.body;
        const { userId, coin, purpose='' } = req.query;
        console.log(req.query);
        

        const [rows] = await connection.query('SELECT * FROM users WHERE userId = ?', [userId]);

        if (rows.length > 0) {
            const [insertRows] = await connection.query('INSERT INTO shop_action (userId, action, coins, purpose) VALUES(?, ?, ?, ?)', [userId, 'coins_added', coin, purpose]);

            if (insertRows) {
                const [insertRows] = await connection.query('UPDATE users SET coins=? WHERE userId=?', [rows[0].coins + Number(coin), userId]);
                if(insertRows){
                    res.status(200).json({message:'transaction done',coin});
                }else{
                    throw new Error('something went wrong');
                }
            } else {

                throw new Error('something went wrong');
            }
        } else {
            const [insertRows] = await connection.query('INSERT INTO users (userId,coins) VALUES(?,?)', [userId, coin]);

            if (insertRows) {
                const [insertRows] = await connection.query('INSERT INTO shop_action (userId, action, coins, purpose) VALUES(?, ?, ?, ?)', [userId, 'coins_added', coin, purpose]);

                if (insertRows) {
                    res.status(200).json({ message: 'transaction done', coin });
                } else {
                    throw new Error('something went wrong');
                }
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}