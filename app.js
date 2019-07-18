var app 			= require('express')();
var mongoose  		= require('mongoose');
var bodyparser 		= require('body-parser');
var routes 			= require('./routes/route');
var cors 			= require('cors');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended :true }));

// mongoose.connect('mongodb://localhost/slack');
mongoose.connect("mongodb://a:a@cluster0-shard-00-00-04d6p.mongodb.net:27017,cluster0-shard-00-01-04d6p.mongodb.net:27017,cluster0-shard-00-02-04d6p.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority");

app.get('/', function(req, res) {
	res.send('app is working properly');
})
https://gentle-castle-45666.herokuapp.com/
app.use(cors());

app.use('/', routes)

app.listen(process.env.PORT || 3000, function() {
	console.log('server is running .....');
})
