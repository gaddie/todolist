// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

var newItem = ["wake up", "break fast"];
var workItems = []

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function (req, res) {

    let day = date();
    // let day = date.getDate();

    res.render('list', { 
        listTitle: day, 
        newListItems: newItem,
    });


});

app.post("/", function(req, res) {
    console.log(req.body);
    let item = req.body.newitem;
    if (req.body.list === "work list") {
        workItems.push(item);
        res.redirect("/work")
    } else {
        newItem.push(item);
        res.redirect("/")
    }
   
})

app.get("/work", function(req, res) {
    res.render("list", {
        listTitle: "work list", 
        newListItems: workItems
    })
})



app.listen(3000, function () {
    console.log("server started running on port 3000")
});