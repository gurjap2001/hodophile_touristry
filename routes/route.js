const express = require('express');
const router = express.Router(); 
const controller = require("../controllers/controller");
const passport = require('passport');
const session = require('express-session');
const Razorpay = require("razorpay");
const path=require("path");
const multer = require('multer');
const destinations = require("../models/destinations");
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');


router.get("/", controller.first );
router.post("/register", controller.register );
router.get("/signup", controller.signUp );
router.get("/dashboard",ensureLoggedIn({ redirectTo: '/login' }),controller.dashboard);
router.get("/show_users",controller.showUsers);
router.get("/login",controller.login);
// router.post('/loggedin', ensureLoggedOut({ redirectTo: '/' }), passport.authenticate('local', {   
//     successReturnToOrRedirect:'/website',
//     failureRedirect: '/',
//     failureFlash: true,
//   })
// );

// const storage= multer.diskStorage(
//   {
//     destination: (req, file, cb) => {
//       cb(null,"assets/images")
//     },
//     filename: (req, file, cb) => {
//       console.log(file);
//       cb(null,file);
//     }
//   }
// )

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({storage: storage});

router.post("/create_dest",upload.fields([{ name: 'img', maxCount: 1}, { name: 'images', maxCount:10}]), controller.create_dest);
router.post("/update_dest/:id",upload.fields([{ name: 'img', maxCount: 1}, { name: 'images', maxCount:10}]),controller.updated);
router.get("/edit_dest/:id",controller.edit_dest);
router.get("/del_dest/:id",controller.delete_dest);
router.post("/messages",controller.messages);
router.get("/profile/:id",controller.profile);

router.get('/edit_dest/:id/assets/css/style.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'public', 'css', 'style.css'));
});

router.post('/loggedin', ensureLoggedOut({ redirectTo: '/' }),
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.

    // Determine which URL to redirect to based on some condition.
    let redirectUrl;
    if (req.user.role == "ADMIN") {
      redirectUrl = '/dashboard';
    } else {
      
      redirectUrl = '/website';
    }
    // req.flash("message","Email is not registered.")
    res.redirect(redirectUrl);
  });



router.get('/logout',ensureLoggedIn({ redirectTo: '/website' }),(req ,res ,next)=>{

  req.session.destroy(function(err){
      if(err){
          console.log(err);
          res.send("Error")
      }else{
         res.redirect("/website");
      }
  })
})



const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload2 = multer({storage: storage2});


const storage3 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload3 = multer({storage: storage3});


router.get('/add_destination',controller.add_destination);
router.get('/add_testimon',controller.add_testimon);
router.post("/update_profile/:id",upload2.single("profile_picture"), controller.update_profile);
router.get('/website',controller.website);
router.get('/all_dest',controller.all_dest);
router.get("/single_dest/:id",ensureLoggedIn({ redirectTo: '/login' }),controller.single_dest);
router.get("/all_messages",controller.all_messages);
router.post("/booking",controller.booking);
router.get("/delete_booking/:id",controller.delete_booking);
router.get("/booking_data",controller.booking_data);
router.get("/forgot",controller.forgot);
router.post("/forgot_password",controller.forgot_password);
router.post("/verify_otp/:email",controller.verify_otp);
router.post("/confirm_pass/:email",controller.confirm_pass);
router.get("/booking/:id/:id2/:amount/:order_id",controller.booking_page);
router.post("/payment_booking/:order_id",controller.payment_booking);
router.get("/delete_booking_admin/:id",controller.delete_booking_admin);

// router.post('/payverify',(req,res) => {
//   console.log(req.body);
//   body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
//   var crypto = require("crypto");
//   var expectedSignature = crypto.createHmac('sha256', '9QATOPSak0ILXOv6oBcEz9i9')
//                                   .update(body.toString())
//                                   .digest('hex');
//                                   console.log("sig"+req.body.razorpay_signature);
//                                   console.log("sig"+expectedSignature);
  
//   if(expectedSignature === req.body.razorpay_signature){
//     console.log("Payment Success");
//   }else{
//     console.log("Payment Fail");
//   }
// })





const instance =new Razorpay({
  key_id: 'rzp_test_yBiUMWdvGMIun4',
  key_secret:'9QATOPSak0ILXOv6oBcEz9i9'
});

router.post('/checkout/:price2/:id/:id2',async (req, res) => {
  const id2 = req.params.id2;
  const id = req.params.id;
  const p = req.params.price2;
  const pricee = req.body.number_p*p;
  const mob = req.body.mobile;
  const naam = req.body.name;
 // console.log(p);
 // console.log(pricee);
  var string = req.body.email;
  var amounty = pricee*100;
  console.log(amounty);
  var options = {
      amount: amounty,
      currency: 'INR',
  };
  instance.orders.create(options, function (err, order) {
      if (err) {
          console.log(err);
      } else {
          console.log(order);
          res.render('frontend/checkout', {id2:id2,id:id,naam:naam,price:p,name:string,amount: order.amount, order_id: order.id,mob:mob});
      }
  });
});


router.post('/pay-verify',(req,res) => {
  console.log(req.body);
  body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  var crypto = require("crypto");
  var expectedSignature = crypto.createHmac('sha256', '9QATOPSak0ILXOv6oBcEz9i9')
                                  .update(body.toString())
                                  .digest('hex');
                                  console.log("sig"+req.body.razorpay_signature);
                                  console.log("sig"+expectedSignature);
  if(expectedSignature === req.body.razorpay_signature){
    console.log("Payment Success");
  }else{
    console.log("Payment Fail");
  }
})

router.post("/price_limit", controller.price_limit_name);
router.post("/feedback",controller.feedback );
router.post("/blogs",upload3.single("photo"),controller.blogs);
router.get("/file_faq",controller.faq);
router.post("/add_faq", controller.add_faq);
router.get("/all_faqs",controller.all_faqs);
router.get("/faqs",controller.faqs);
router.get("/all_faqs/edit_faq/:id",controller.edit_faq);
router.post("/update_faq/:id",controller.update_faq);
router.get("/del_faq/:id",controller.del_faq);
module.exports = router;