const destinations = require("../models/destinations");
const blogs = require("../models/blog");
const users = require("../models/users");
exports.about = async(req,res) => {
    res.render('frontend/about');
}
exports.destination = async(req,res) =>{
    const destination2 = await destinations.findAll();
    res.render('frontend/destination',{ destinations: destination2} );
}
exports.contact = async(req,res) =>{
    res.render('frontend/contact');
}
exports.blog = async(req,res) =>{
    const blogss = await blogs.findAll();
    res.render("frontend/blog",{blog: blogss});
}
exports.blogsingle = async(req,res) =>{
    const id = req.params.id;
    const blogss = await blogs.findOne({where:{id:id}});
    const id2 = blogss.user_id;
    const user = await users.findOne({where:{id:id2}});
    res.render("frontend/blog-single",{blog: blogss,users:user});
}
exports.privacypolicy = async(req, res)=>{
    res.render("frontend/privacypolicy");
}
exports.terms_conditions = async(req, res)=>{
    res.render("frontend/terms_conditions");
}
exports.refund = async(req,res) =>{
    res.render("frontend/refund");
}

exports.adventure = async(req,res) =>{
    res.render("frontend/adventure");
}
exports.camping = async(req,res) =>{
    res.render("frontend/camping");
}
exports.nature = async(req,res) =>{
    res.render("frontend/nature");
}
exports.party = async(req,res) =>{
    res.render("frontend/party");
}