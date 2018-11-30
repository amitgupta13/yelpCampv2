const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelpCamp',{useNewUrlParser:true})
.then(()=>{
    console.log('Connected to mongoDB')
})
.catch(()=>{
    console.log('error connecting to DB');
});

app.set('view engine', 'ejs');

//Schema Setup
const campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String
});

const Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({
//             name:'shimla', 
//             image:'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201810/SHIMLA.jpeg?p8rkDgUaxdIezLOdixVSYZfIdYEkHBUU',
//             description:'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah '
//                 },function(err, campground){
//                     if(err) return console.log(err);
//                         console.log('Newly created campground');
//                         console.log(campground);
//                 });

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){

    Campground.find({},function(err, campgrounds){
        if(err) return console.log(err);
        res.render('index', {campgrounds:campgrounds});
    });
});

app.post('/campgrounds', function(req, res){
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const newCampground = {
                name:name,
                image:image,
                description:description
            }

        Campground.create(newCampground,(err, campground)=>{
            if(err) return console.log(err);
                res.redirect('/campgrounds');
        });
});

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

app.get('/campgrounds/:id', function(req, res){
    Campground.findById(req.params.id, (err, campground)=>{
        if(err) return console.log(err);
            res.render('show', {campground:campground});
    });
});

app.listen(3000, ()=>{
    console.log('server started on port 3000');
});