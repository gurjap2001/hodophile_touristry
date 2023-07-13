const express = require('express');
const router2 = express.Router();
const controller2 = require("../controllers/controller_front");

router2.get("/about",controller2.about);
router2.get("/contact",controller2.contact);
router2.get("/destination",controller2.destination);
router2.get("/blog",controller2.blog);
router2.get("/blogsingle/:id",controller2.blogsingle);
router2.get("/privacypolicy",controller2.privacypolicy);
router2.get("/terms_conditions",controller2.terms_conditions);
router2.get("/refund",controller2.refund);
router2.get("/adventure",controller2.adventure);
router2.get("/camping", controller2.camping);
router2.get("/nature",controller2.nature);
router2.get("/party",controller2.party);
module.exports = router2;

