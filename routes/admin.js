var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hotel', {useNewUrlParser: true, useUnifiedTopology: true});

var Schema = mongoose.Schema;

// Hotel
var hotelSchema = new Schema({
	nama: String,
	alamat: String,
	kontak: String
}, {
	collection: 'hotel'
});

var hoteldata = mongoose.model('hoteldata', hotelSchema);
// End Hotel

// Get Hotel
router.get('/kelhotel', function (req, res, next) {
	hoteldata.find()
	.then(function (doc) {
		res.render('admin/kelhotel', {
			items: doc
		});
	});
});
// End Get Hotel

// kamar
var kamarSchema = new Schema({
	no: String,
	jumlah_kasur: String,
	fasilitas_kamar: String,
	harga: String
}, {
	collection: 'kamar'
});

var kamardata = mongoose.model('kamardata', kamarSchema);
// End kamar

// Get kamar
router.get('/kelkamar', function (req, res, next) {
	kamardata.find()
	.then(function (doc) {
		res.render('admin/kelkamar', {
			items: doc
		});
	});
});
// End Get kamar

// Get Home Page
router.get('/admin', function(req, res, next) {
    
    let data = {
        layout: 'admain',
        title: 'Admin Page',
    };
    res.render('admin/index', data);
});
// Get Home Page

//-------------------------------------------------------

// Informasi Hotel
// GetAll
router.get('/kelhotel', (req, res) => {
    hoteldata.find((err, docs) => {
        let data = {
            layout: 'admain',
            title: 'Informasi Hotel',
            list: docs
        };

        if(!err){
            res.render('admin/kelhotel', data);
        }else{
            alert("Error Pak!" + err);
        }

    });
});
// End GetAll

// Function Post_Data and Update_Data
function tambahhotel(req, res){
    var item = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        kontak: req.body.kontak
    };

    var data = new hoteldata(item);
    data.save();
    res.redirect('/admin/kelhotel');
}

function ubahhotel(req, res){
    hoteldata.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect('/admin/kelhotel');
        }else{
            alert("Error" + err);
        }
    });
}
// End Function Post_Data and Update_Data

// Post Data and Update Data
router.post('/ubah/hotel', (req, res) => {
    if(req.body._id == ''){
        tambahhotel(req, res);
    }else{
        ubahhotel(req, res);
    }
});
// End Post Data and Update Data

// Get Data By ID
router.get('/kelhotel/:id', (req, res) => {
    hoteldata.findById(req.params.id, (err, doc) => {
        let data = {
            layout: 'admain',
            title: 'Informasi Hotel',
            value: doc
        };
        if(!err){
            res.render('admin/tbhhotel', data);
        }
    });
});
// End Get Data By ID

// Hapus Data
router.get('/hapus/kelhotel/:id', (req, res) => {
    hoteldata.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/admin/kelhotel');
        }else{
            alert("Error" + err);
        }
    });
});
// End Hapus Data
// End Informasi Hotel

//-------------------------------------------------------
// Informasi kamar
// Get Data All
router.get('/kelkamar', (req, res) => {
    
    kamardata.find((err, docs) => {

        hoteldata.find((err, doc) => {

        let data = {
            layout: 'admain',
            title: 'Informasi kamar',
            list: docs,
            item: doc
        };

        if(!err){
            res.render('admin/kelkamar', data);
        }else{
            alert("Error Pak!" + err);
        }
    });

    }); 
});
// End Data Get Data All

// Function Post_Data and Update_Data
    function tambahkamar(req, res){
        var item = {
            no: req.body.no,
            jumlah_kasur: req.body.jumlah_kasur,
            fasilitas_kamar: req.body.fasilitas_kamar,
            harga: req.body.harga,
        };
    
        var data = new kamardata(item);
        data.save();
        res.redirect('/admin/kelkamar');
    }

    function ubahkamar(req,res){
        kamardata.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
            if(!err){
                res.redirect('/admin/kelkamar');
            }else{
                alert("Error" + err);
            }
        });
    }
// End Function Post Data and Update Data

// Post Data and Update Data
router.post('/ubah/kamar', (req, res) => {
    if(req.body._id == ''){
        tambahkamar(req, res);
    }else{
        ubahkamar(req, res);
    }
});
// End Post and Update Data

// Get Data By ID
router.get('/kelkamar/:id', (req, res) => {
    kamardata.findById(req.params.id, (err, doc) => {
        let data = {
            layout: 'admain',
            title: 'Informasi kamar',
            value: doc
        };
        if(!err){
            res.render('admin/tbhkamar', data);
        }
    });
});
// End Get Data By ID

// Hapus Data
router.get('/hapus/kelkamar/:id', (req, res) => {
    kamardata.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/admin/kelkamar');
        }else{
            alert("Error" + err);
        }
    });
});
// End Hapus Data

router.get('/logout', function(req, res, next) {
    res.redirect('/');
});

module.exports = router;
