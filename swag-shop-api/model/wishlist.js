const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let wishList = new Schema({
	title: {
		type: String,
		default: "My Wish List",
		required: true
	},
	products: [
		{
			type: ObjectId,
			ref: 'Product'
		}
	]
}); 

module.exports = mongoose.model('WishList', wishList);
