const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

let items = [];
let workItems = [];
let day = date;

app.get("/", function (req, res) {
    res.render("list", {
        currentDate: day,
        listTitle: "To-Do List",
        newListItems: items
    });
});

app.post("/", function (req, res) {
    let item = req.body.listItem;
    console.log(req.body);
    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function (req, res) {
    res.render("list", {
        currentDate: day,
        listTitle: "Work List",
        newListItems: workItems
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is up and running!");
})