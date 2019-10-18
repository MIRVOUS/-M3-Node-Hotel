var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hotel', {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', function () {
	console.log("MongoDB connection estabilished successfully");
});

var Schema = mongoose.Schema;

// User
var userSchema = new Schema({
	name: String,
	mail: String,
	pass: String
}, {collection: 'user'});

var userdata = mongoose.model('userdata', userSchema);
// End User

// Hotel
var hotelSchema = new Schema({
	nama: String,
	alamat: String,
	kontak: String
}, {
	collection: 'hotel'
});

var hoteld = mongoose.model('hoteld', hotelSchema);
// End Hotel

// kamar
var kamarSchema = new Schema({
	no: String,
	jumlah_kasur: String,
	fasilitas_kamar: String,
	harga: String
}, {
	collection: 'kamar'
});

var kamard = mongoose.model('kamard', kamarSchema);
// End kamar

// Login
router.get('/login', function(req, res, next){
	let data = {
		layout: 'main',
		title: 'Sign In',
	};
	res.render('login', data);
});

router.post('/login', function(req, res, next) {
	let data = req.body;
	userdata.find({
		mail: data.mail, pass: data.pass
	}, function (err, docs) {
		if (docs[0].pass === data.pass) {
			res.redirect('/admin/admin');
		} else {
			res.redirect('/login');
		}
	});
});
// End Login

// Register
router.get('/register', function(req, res, next){
	let data = {
		layout: 'main',
		title: 'Sign Up',
	};
	res.render('register', data);
});

function insertUser(req, res){
	var item = {
		name: req.body.name,
		mail: req.body.mail,
		pass: req.body.pass
	};

	var data = new userdata(item);
	data.save();
	res.redirect('/login');
}

router.post('/register', (req, res) => {
	if(req.body._id == ''){
		insertUser(req, res);
	}else{
		console.log("Error");
	}
});
// End Register

/* GET home page. */
router.get('/', function(req, res, next) {
	let data = {
		layout:'frontend',
		title:'[M]Node Hotel'
	};
	res.render('index', data);
});
// End Home Page

/* GET home page. */
router.get('/', function(req, res, next) {
	let data = {
		layout:'frontend',
		title:'[M]Node Hotel'
	};
	hoteld.find((err, docs) => { 	
		kamard.find((err, doc) => {
			if(!err){
				res.render('index', {
					list: docs,
					item: doc
				});
			}else{
				alert("Error Pak!" + err);
			}
		});
	});
});

router.get('/logout', function(req, res, next) {
	res.redirect('/');
});

// router.get('/kamar/add', function (req, res, next) {
// 	let kamar = new Kamar({
// 		nomor: "001",
// 		lantai: 1,
// 		fasilitas: [
// 		"TV", "AC", "Kulkas"
// 		]
// 	});
// 	kamar.save();
// 	res.status(200).send(kamar);
// });

module.exports = router;