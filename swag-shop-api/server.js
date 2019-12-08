let mongoose = require('mongoose');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let db = mongoose.connect('mongodb://localhost/swag-shop');

let Product = require('./model/product');
let WishList = require('./model/wishlist');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*
app.get('/product/:name', function(req, res){
	let name = req.params.name;
	Product.findOne({"title": name}, function(err, item){
		if(err){
			res.status(500).send({error:"Product not found."});
		}
		else {
			res.send(item);
		}
	});
	
});
*/

app.get('/products', function(req, res){
	Product.find({}, function(err, items){
		if(err){
			res.status(500).send({error:"Product not found."});
		}
		else {
			res.send(items);
		}
	});
	
});

app.post("/product", function(req, res){
	let product = new Product();
	product.title = req.body.title;
	product.price =  req.body.price;
	product.save(function(err, savedProduct){
		if(err){
			res.status(500).send({error:"Could not save product."})
		}
		else {
			res.send(savedProduct);
		}
	});
});











app.get('/wishlist', function(req, res){
	WishList.find({}).populate({path:'products', model:'Product'}).exec(function(err, list){
		if(err){
			res.status(500).send({error:"Could not create wish list."});
		}
		else {
			res.send(list);
		}
	});
	
});

app.post('/wishlist', function(req, res){
	let wishList = new WishList();
	wishList.title = req.body.title;
	wishList.save(function(err, newwishList){
		if(err){
			res.status(500).send({error:"Could not create wish list."})
		}
		else {
			res.send(newwishList);
		}
	});
});

app.put('/wishlist/product/add', function(req, res){
	Product.findOne({_id: req.body.productId}, function(err, item){
		if(err){
			res.status(500).send({error:"Product not found."});
		}
		else {
			WishList.update(
			{_id: req.body.wishListId}, 
			{$addToSet: {products: item.id}},function(err, list){
			if(err){
			res.status(500).send({error:"Could not add item to wish list."})
			}
			else{
				res.send(list); 
			}
			});
		}
	})
	 
});















app.listen(3000, function(){
    console.log("running on port 3000:");
});






















