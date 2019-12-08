let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let nums = [
	{
		"id": "1",
		"text": "One"
	},
	{
		"id":"2",
		"text":"two"
	},
	{
		"id": "3",
		"text":"three"
	}
]

app.get('/nums', function(req, res){
    res.send(nums);
});

app.post('/nums', function(req, res){
	let num = req.body;
	if(!num || num.text == ""){
		res.status(500).send({error: "Text is empty."})
	}
	else{
		nums.push(num);
		res.status(200).send(num);
	}
})

// Write Delete

app.put('/nums/:numId', function(req, res){
	let newtext = req.body.text;
	
	if(!newtext || newtext === ""){
		res.status(500).send({error:"No text"})
	}
	else{
		let found = false;
	
		for(let i = 0; i < nums.length; i++){
			let num = nums[i];
			
			if(num.id === req.params.numId) {
				nums[i].text = newtext;
				found = true;
				break;
			}
		}
		
		if(!found){
			res.status(500).send({error: "Num is not present"})
		}
		else {
			res.send(nums);
		}
	}
	
});



app.listen(process.env.PORT || 8000, function(){
    console.log("Fist API running on port 3000!");
});






















