const bcrypt = require('bcrypt');
const users = require("../models/users");
const destinations = require("../models/destinations");
const messages = require("../models/messages");
const bookings = require("../models/bookings");
const faqs = require("../models/faq");
const blogs = require("../models/blog");
const Sequelize = require("sequelize");
const sequelize = require("../db/database");
const Otp = require("../models/otp");
const nodemailer = require("nodemailer");
const path=require("path");
const multer = require('multer');

exports.first = async(req,res) =>{
    var imageArray = [{ src: 'assets_front/images/img_169601_indiantourist.jpg' }, { src: 'assets_front/images/destination-12.jpg' },  { src: 'assets_front/images/destination-10.jpg' }, { src: 'assets_front/images/image_5.jpg' }, { src: 'assets_front/images/pexels-photo-5324307.jpeg' }, { src: 'assets_front/images/image_4.jpg' },   { src: 'assets_front/images/humayun-5055050_1280-1024x576.jpg' },{ src: 'assets_front/images/tourists-nov25.jpg' }, { src: 'assets_front/images/place-5.jpg' }];
    res.render('frontend/index_main', { imageArray:imageArray });
}


exports.dashboard = async(req,res) =>{
        if (req.user.role != "ADMIN") {
          res.send("You are not authorized to view this route.")
        }
    res.render("admin/index");
}


exports.register = async (req, res) =>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.pass, salt);
    const user_data = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        mobile : req.body.mobile,
    };
    const doesExist = await users.findOne({ where: { email: req.body.email } });
    if (doesExist) {
        req.flash('message', 'Username/email already exists');
        res.redirect("/signup");
        return;
    }
    users.create(user_data)
    .then(data =>{  if(data){
        req.flash('success',`${req.body.name} has been added Successfully`);
        res.redirect('/login');
    }
    else {
        res.status(500).send({
        message : err.message || "Some error occurred while creating a create operation"
        });
    }})
}   



exports.signUp = async(req, res) =>{
    res.render('sign_up_form');
}



exports.showUsers = async(req, res) =>{
    const userdb = await users.findAll();
    res.render('admin/user_data', { users: userdb});
}  



exports.website = async(req,res) =>{
    var imageArray = [{ src: 'assets_front/images/img_169601_indiantourist.jpg' }, { src: 'assets_front/images/destination-12.jpg' },  { src: 'assets_front/images/destination-10.jpg' }, { src: 'assets_front/images/image_5.jpg' }, { src: 'assets_front/images/pexels-photo-5324307.jpeg' }, { src: 'assets_front/images/image_4.jpg' },   { src: 'assets_front/images/humayun-5055050_1280-1024x576.jpg' },{ src: 'assets_front/images/tourists-nov25.jpg' }, { src: 'assets_front/images/place-5.jpg' }];
    res.render('frontend/index_main' , { imageArray:imageArray });
}


exports.login = async(req,res) =>{
    req.flash('message',"Email is not registered.");
    res.render('sign_in_form');
}



exports.add_destination = async(req,res) =>{
    res.render('admin/add_destination');
}


exports.add_testimon = async(req,res) => {
    res.render('admin/add_testimon');
}


exports.create_dest = async (req, res) =>{
var array = [];

const photo = req.files['img'][0].filename;

var files = req.files['images'];

for (let i = 0; i < files.length; i++) {   
    array.push(files[i].filename);
}
var includes = req.body['includes'];
var array_i =[];
const photos = array.toString();
for (let i = 0; i < includes.length; i++) {   
    array_i.push(includes[i]);
}
const include = array_i.toString();
var excludes = req.body['excludes'];
var array_e =[];
for (let i = 0; i < excludes.length; i++) {   
    array_e.push(excludes[i]);
}
const exclude = array_e.toString();

    const dest_data = {
        name: req.body.dname,
        state: req.body.state,
        price: req.body.price,
        city: req.body.city,
        startdate: req.body.destSdaytime,
        enddate: req.body.destEdaytime,
        images: photo,
        multi_images: photos,
        includes:include,
        excludes:exclude, 
        additionalinfo: req.body.add_info,
        descriptionbox: req.body.description,
    };
    await destinations.create(dest_data)
    .then(data =>{  if(data){
       // req.flash('success',`${req.body.name} has been added Successfully`);
        res.redirect('/add_destination');
    }
    else {
        res.status(500).send({
        message : err.message || "Some error occurred while creating a create operation"
        });
    }})
}





exports.all_dest = async(req,res) => {
    const destinationss = await destinations.findAll();
    res.render('admin/all_dest', { destinations: destinationss});
}




exports.single_dest = async(req,res)=>{
    const id = req.params.id;
   var destinationss = await destinations.findOne({
        where:{
            id:id
        }
    })
    const id2 = req.user.id;
    var userss = await users.findOne({
        where:{
            id:id2
        }
    })
    const dataType =destinations.rawAttributes.price.type;
        console.log(dataType.key); 
     res.render("frontend/single_dest",{destinations:destinationss, users:userss});
}


exports.edit_dest = async(req,res) =>{
    const id = req.params.id;
    destinations.findOne({
        where:{
            id:id
        }
    }) .then( data2=> {
        if(!data2){
            res.status(404).send({ message : `Cannot edit with id ${id}.`})
        }
        else{
            //console.log(data);
        res.render('admin/edit_dest', { destinations: data2 });
        }
    })    
}





exports.updated = async(req,res)=>{
    var array = [];

const photo = req.files['img'][0].filename;

var files = req.files['images'];

for (let i = 0; i < files.length; i++) {   
    array.push(files[i].filename);
}
const photos = array.toString();
var includes = req.body['includes'];
var array_i =[];
for (let i = 0; i < includes.length; i++) {   
    array_i.push(includes[i]);
}
const include = array_i.toString();
var excludes = req.body['excludes'];
var array_e =[];
for (let i = 0; i < excludes.length; i++) {   
    array_e.push(excludes[i]);
}
const exclude = array_e.toString();

    const dest_data = {
        name: req.body.dname,
        state: req.body.state,
        price: req.body.price,
        city: req.body.city,
        startdate: req.body.destSdaytime,
        enddate: req.body.destEdaytime,
        images: photo,
        multi_images: photos,
        includes:include,
        excludes:exclude, 
        additionalinfo: req.body.add_info,
        descriptionbox: req.body.description
    };
    await destinations.update(dest_data, {
        where: {
        id: req.params.id
        }
    })
    .then(data =>{  if(data){
       // req.flash('success',`${req.body.name} has been added Successfully`);
        res.redirect('/all_dest');
    }
    else {
        res.status(500).send({
        message : err.message || "Some error occurred while creating a update operation"
        });
    }})
}



exports.delete_dest = async(req,res) =>{
        const id = req.params.id;
        destinations.destroy({
        where:{id:id}
        })
        .then(data => {
            if(data){
                req.flash('danger','A destination has been deleted.')
            res.redirect('/all_dest');
            }
            else{
                res.status(404).send({message: `Cannot delete with id ${id}`})
            }
        })
    }



exports.messages = async(req,res) =>{
        const message_data = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.messages
    };
    messages.create(message_data)
    .then(data =>{  if(data){
    res.redirect('/contact');
    }
    else {
        res.status(500).send({
        message : err.message || "Some error occurred while sending message"
        });
    }})
}



exports.all_messages = async(req,res) => {
    const message = await messages.findAll();
    res.render('admin/all_messages', { messages: message});
}



exports.profile = async(req,res)=>{
    
    const id = req.params.id;
    const bookingss = await bookings.findAll();
    const user =  await users.findOne({
        where:{
            id:id
        }
    });
        if(!user && !bookingss){
            res.status(404).send({ message : `Cannot show with id ${id}.`})
        }
        else{
        res.render('frontend/profile', { users: user, bookings:bookingss});
        }
    }    


exports.update_profile = async(req,res) =>{
    const profile_pic = req.file.filename;
    console.log(profile_pic);
    const user_data=
    { name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    gender: req.body.gender,
    disability: req.body.dis,
    allergies: req.body.allergies,
    address: req.body.address,
    profile_image: profile_pic
    };
    const bookingss = await bookings.findAll();
     users.update(user_data,
        {
            where: {
            id: req.params.id
            }
        }
          ).then(user => {
            if(!user){
                res.status(404).send({ message : `Cannot update with id ${id}.`})
            }
            else{
                req.flash("success","Your profile has been updated.");
                res.render("frontend/profile",{ users: user, bookings:bookingss});
            }
          });
    }


exports.booking_data = async(req,res)=>{
    const booking = await bookings.findAll();
    res.render("admin/booking_data",{bookings:booking});
}


exports.delete_booking = async(req,res) =>{// convert milliseconds to hours
    const id = req.params.id;
    const destid = await bookings.findOne({where:{id:id},attributes:['dest_id'],raw:true})
    const email = await bookings.findOne({where:{id:id},attributes:['email'],raw:true})
    const emaill = email.email;
    const dest_id_value = destid.dest_id;
   // console.log(dest_id_value);
    const MIN_CANCEL_HOURS = 48; // minimum hours required to cancel a booking
    const currentDate = new Date();
    const start = await destinations.findOne({where:{id:dest_id_value},attributes:['startdate'],raw:true});
    const startDate = new Date(start.startdate);
  //   console.log(startDate);
    const timeDiff = startDate.getTime() - currentDate.getTime();
   //  console.log(timeDiff);
     const hoursDiff = Math.ceil(timeDiff / (1000 * 3600)); 
     //console.log(hoursDiff);
    if(hoursDiff > MIN_CANCEL_HOURS){
    bookings.destroy({
    where:{id:id}
    })
    .then(data => {
        if(data){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sainijappy01@gmail.com',
                pass: 'ellxnepirezhdbna',
            }
        });
        var mailOptions = {
            from: process.env.USER_EMAIL,
            to: 'sainijappy01@gmail.com',
            subject: 'Booking Cancellation',
            text: `A booking has been cancelled for Destination Id: ${id} by the username: ${emaill} `
        };
   const userId = req.user.id;
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                return res.status(200).send({
                    status: false,
                    message: "Failed",
                })
            } else {
                req.flash("success","Your booking is cancelled successfully.");
                res.redirect(`/profile/${userId}`);
            }
        });
}
else {
    res.status(404).send({message: `Cannot delete with id ${id} => You cannot cancel a booking less than 48 hours from starting date of destinations.`});
}})
}
}

exports.booking = async(req,res) =>{
    const amount = parseInt(req.body.price)*req.body.number_p; 
    const booking_data = {
        name: req.body.name,
        email: req.body.email,
        no_of_person: req.body.number_p,
        price: amount,
        dest_id: req.body.dest_id
    };
    bookings.create(booking_data)
    .then(data =>{  if(data){
        req.flash("success",`You have booked a destination with ID: ${req.body.dest_id}`);
    res.redirect('/destination');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sainijappy01@gmail.com',
            pass: 'ellxnepirezhdbna',
        }
    });
    var mailOptions = {
        from:"sainijappy01@gmail.com",
        to: "sainijappy01@gmail.com",
        subject: "Booking Completion",
        text: "A booking is made by " + req.body.email +" "+ `for destination id: ${req.body.dest_id}.`
    };
    var mailOptions2 = {
        from:"sainijappy01@gmail.com",
        to: req.body.email,
        subject: "Congratulations!",
        text: "You have successfully completed your booking for the destination ID: " + req.body.dest_id +"."
    };
     transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            return res.status(200).send({
                status: false,
                message: "Failed",
            })
    }
})
    transporter.sendMail(mailOptions2, function(error, info) {
        if (error) {
            console.log(error);
            return res.status(200).send({
                status: false,
                message: "Failed",
            })
    }
})}
    else {
        res.status(500).send({
        message : err.message || "Some error occurred while booking destination"
        });
    }})
} 



exports.forgot = async(req,res) =>{
    res.render("enter_email");
}



exports.forgot_password = async(req, res) => {
    const user = await users.findOne({ where: { email: req.body.email } });
    if (user) {
        Otp.findOne({
            where: {
                email: req.body.email
            }
        }).then(otp => {

            const minutesToAdd = 2
            const currentDate = new Date()
            const futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000)
            var otp_code = Math.floor(100000 + Math.random() * 900000);

            if (otp) {
                Otp.update({
                    otp: otp_code,
                    expiredAt: futureDate
                }, { where: { email: req.body.email } })
            } else {
                console.log("yes")
                const optData = {
                    email: req.body.email,
                    user_id: user.id,
                    otp: otp_code,
                    expiredAt: futureDate
                };
                const otpResponse = Otp.create(optData)
            }

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sainijappy01@gmail.com',
                    pass: 'ellxnepirezhdbna',
                }
            });

            var mailOptions = {
                from: process.env.USER_EMAIL,
                to: req.body.email,
                subject: 'Sending otp for password change',
                text: 'OTP in order to change your password is ' + otp_code
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    return res.status(200).send({
                        status: false,
                        message: "Failed",
                    })
                } else {
                    res.render("otp_form",{user:user})
                }
            });
        })

    } else {
        res.status(404).send({
            status: false,
            message: "user not found",
        });
    }
}

exports.verify_otp = async(req, res) => {
    
    const currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
//   console.log(currentDate);
    const verifyOtp = await Otp.findOne({ where: { otp: req.body.otp } });
    const email = await users.findOne({where:{email:req.params.email}});
    // console.log(verifyOtp);
    if (verifyOtp) {

        if (verifyOtp.expiredAt > currentDate) {
            res.render("change_pass",{user:email});
        } else {
            res.send({ status: false, message: "OTP expired!!" });
        }

    } else {
        res.send({ status: false, message: "Invalid Otp" });
    }
}




exports.confirm_pass= async(req,res) =>{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await users.findOne({ where: { email: req.params.email } });
        
        if (user) {
            users.update({
                    password: hashedPassword
                }, { where: { email:req.params.email } })
                .then(data => {
                    if (!data) {
                        res.status(404).send({ status: false, message: `Cannot Update user with ${email}. Maybe user not found!` })
                    } else {
                        req.flash("success","Password has been updated.");
                        res.redirect("/login");
                    }
                })
        } else {
            res.status(404).send({ status: false, message: `user not found!` })
        }
    }

   
   
exports.price_limit_name = async (req, res) => {

        const priceLimit = req.body.price.replace(/,/g, '') || '';
        const place = req.body.dname ||'';
        try {
            let query = `
            SELECT *
            FROM destinations
            WHERE name OR city OR state LIKE :place
        `;
        const replacements = { place: `%${place.trim()}%` };

        if (priceLimit) {
            query += ` AND price <= :priceLimit`;
            replacements.priceLimit = priceLimit;
        }

        const destination_search = await sequelize.query(query, {
            replacements,
            model: destinations,
            mapToModel: true
        });
          console.log(JSON.stringify(destination_search));
          res.render("frontend/destination", { destinations: destination_search });
        } catch (error) {
          // Handle error
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      };


      

exports.feedback = async(req,res) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sainijappy01@gmail.com',
            pass: 'ellxnepirezhdbna',
        }
    });

    var mailOptions = {
        from: 'sainijappy01@gmail.com' ,
        to: 'sainijappy01@gmail.com',
        subject: 'You have received a feedback from ' + req.body.email , 
        text: req.body.message 
    }; 

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            return res.status(200).send({
                status: false,
                message: "Failed",
            })
        } else {
            res.redirect("/destination");
        }
    });
}


exports.blogs = async(req,res) =>{
    const upload_photo = req.file.filename;
    const blog_data = {
        user_id: req.body.user_id,
        date:req.body.date,
        photo: upload_photo,
        title:req.body.title,
        content: req.body.content
    };
    blogs.create(blog_data)
    .then(data =>{  if(data){
    res.redirect('/blog');
    }
    else {
        res.status(500).send({
        message : err.message || "Some error occurred while creating blog"
        });
    }})
}
exports.booking_page = async(req,res) =>{
    const destinationss = await destinations.findOne({ where: { id: req.params.id } });
   const order_id = req.params.order_id;
    const id2 = req.params.id2;
    const price = req.params.amount;
    var userss = await users.findOne({
        where:{
            id:id2
        }})
    res.render("frontend/booking",{price:price, destinations:destinationss,users:userss,order_id:order_id});
}
exports.payment_booking = async(req,res) =>{
    const booking_data = {
        name: req.body.name,
        email: req.body.email,
        price: req.body.price,
        no_of_person: req.body.number_p,
        payment_status:1,
        dest_id: req.body.dest_id
    };
    bookings.create(booking_data)
    .then(data =>{  if(data){
        req.flash("success",`You have done the payment successfully and booked the destination ID: ${req.body.dest_id}`);
    res.redirect("/destination");
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sainijappy01@gmail.com',
            pass: 'ellxnepirezhdbna',
        }
    });
    var mailOptions = {
        from:"sainijappy01@gmail.com",
        to: "sainijappy01@gmail.com",
        subject: "Booking Completion",
        text: "A booking is made by " + req.body.email +" "+ `for destination id: ${req.body.dest_id} and payment is successful with order_id: ${req.body.order_id}.`
    };
    var mailOptions2 = {
        from:"sainijappy01@gmail.com",
        to: req.body.email,
        subject: "Congratulations!",
        text: "You have successfully completed your booking for the destination ID: " + req.body.dest_id +"."
    };
     transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            return res.status(200).send({
                status: false,
                message: "Failed",
            })
    }
})
    transporter.sendMail(mailOptions2, function(error, info) {
        if (error) {
            console.log(error);
            return res.status(200).send({
                status: false,
                message: "Failed",
            })
    }
})}
    else {
        res.status(500).send({
        message : err.message || "Some error occurred while booking destination"
        });
    }})
}

exports.delete_booking_admin = async(req,res) =>{
    const id = req.params.id;
    const destid = await bookings.findOne({where:{id:id},attributes:['dest_id'],raw:true})
    const email = await bookings.findOne({where:{id:id},attributes:['email'],raw:true})
    const dest_id_value = destid.dest_id;
   // console.log(dest_id_value);
    const MIN_CANCEL_HOURS = 48; // minimum hours required to cancel a booking
    const currentDate = new Date();
    const start = await destinations.findOne({where:{id:dest_id_value},attributes:['startdate'],raw:true});
    const startDate = new Date(start.startdate);
  //   console.log(startDate);
    const timeDiff = startDate.getTime() - currentDate.getTime();
   //  console.log(timeDiff);
     const hoursDiff = Math.ceil(timeDiff / (1000 * 3600)); 
     //console.log(hoursDiff);
    if(hoursDiff > MIN_CANCEL_HOURS){
    bookings.destroy({
    where:{id:id}
    })
    .then(data => {
        if(data){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sainijappy01@gmail.com',
                pass: 'ellxnepirezhdbna',
            }
        });
        var mailOptions = {
            from: process.env.USER_EMAIL,
            to: email.email,
            subject: 'Booking Cancellation',
            text: `Your booking has been cancelled for Destination Id: ${id} by the admin.
            For further details, Contact the admin : M. +919877243152.`
        };
   //const userId = req.user.id;
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                return res.status(200).send({
                    status: false,
                    message: "Failed",
                })
            } else {
                req.flash("success","The booking is cancelled successfully.");
                res.redirect("/booking_data");
            }
        });
}
else {
    res.status(404).send({message: `Cannot delete with id ${id} => You cannot cancel a booking less than 48 hours from starting date of destinations.`});
}})
}
}



exports.faq = async(req,res) =>{
    res.render("admin/add_faq");
}



exports.add_faq = async(req,res) =>{
    const faq_data= {
        question: req.body.question,
        answer: req.body.answer
    };
    faqs.create(faq_data)
    .then(data =>{  if(data){
        req.flash("success","This FAQ has been added successfully.");
    res.redirect('/file_faq');
    }
    else {
        res.status(500).send({
        message : err.message || "Some error occurred while adding FAQ"
        });
    }})
}

exports.all_faqs = async(req,res) => {
   const faqss = await faqs.findAll();
    res.render("admin/all_faqs",{faqs:faqss});
}

exports.faqs = async(req,res) =>{
    const faqss = await faqs.findAll();
    res.render("frontend/faqs",{faqs:faqss});
}
exports.edit_faq = async(req,res) =>{
    const id = req.params.id;
    const faqss = await faqs.findOne({where:{id:id}});
    res.render("admin/edit_faq",{faqs:faqss});
}
exports.update_faq = async(req,res) =>{
    const id = req.params.id;
    const faq_data= {
        question: req.body.question,
        answer: req.body.answer
    };
    faqs.update(faq_data, {where:{id:id}})
    .then(data =>{  if(data){
        req.flash("success","This FAQ has been edited successfully.");
    res.redirect('/all_faqs');
    }
    else {
        res.status(500).send({
        message : err.message || "Some error occurred while adding FAQ"
        });
    }})
}

exports.del_faq = async(req,res) =>{
    const id = req.params.id;
    faqs.destroy({
    where:{id:id}
    })
    .then(data => {
        if(data){
            req.flash('danger','This FAQ has been deleted.')
        res.redirect('/all_faqs');
        }
        else{
            res.status(404).send({message: `Cannot delete with id ${id}`})
        }
    })
}