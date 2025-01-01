import express from "express";
import crypto from 'crypto'; // For ES Modules

const router = express.Router();
 import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: 'rzp_test_vJSuXkj8TU4T34',
    key_secret: 'M5Hz7j1Qxz89Dr0XyKlO0xjN',
  });

router.get("/getUsers",(req,res)=>{

    res.json({msg:"ok this is routing get "});
    
    
});

router.post('/create-order', async (req, res) => {
    try {
      let amount = req.body.amount;
      const options = {
        amount: amount, // amount in the smallest currency unit
        currency: 'INR',
        receipt: 'receipt_' + Math.random().toString(36).substring(7),
      };
  
      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    } catch (err) {
      res.status(700).json({ error: err });
    }
  });


  router.post('/verify-payment', async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
      const sign = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSign = crypto.createHmac('sha256', 'YOUR_RAZORPAY_KEY_SECRET')
                              .update(sign.toString())
                              .digest('hex');
  
      if (razorpay_signature === expectedSign) {
        // Payment is verified
        res.status(200).json({ message: 'Payment verified successfully' });
      } else {
        res.status(400).json({ error: 'Invalid payment signature' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;