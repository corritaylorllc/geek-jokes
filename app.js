const express        = require("express"),
      app            = express(),
      request        = require("request"),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose");
      
mongoose.connect("mongodb://localhost:27017/geek-jokes", { useNewUrlParser: true });

mongoose.set('useFindAndModify', false);

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
        let options = {
            url: 'https://geek-jokes.sameerkumar.website/api',
            method: 'GET'
    };
    
    request(options, (err, response, body) => {
        if(!err && response.statusCode == 200)
            var parsedData = JSON.parse(body);
            console.log(parsedData);
            res.render("index", {body: parsedData });
    });
});

app.get("*", function(req, res){
    res.send("Error - I'm sorry, the page you tried to get to either does not exist or has been removed.");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Geeks are ready!");
});