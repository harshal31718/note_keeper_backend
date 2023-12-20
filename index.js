const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const noteSchema = new mongoose.Schema({
  key: Number,
  id: Number,
  title: String,
  content: String,
});
const Note = mongoose.model("Note", noteSchema);
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1/keeperDB", { useNewUrlParser: true });

app.get("/getData", async (req, res) => {
  Note.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/add", async (req, res) => {
  const newNote = new Note(req.body.newNote);
  try {
    newNote.save();
    res.redirect("/getData");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  Note.deleteOne({ id: req.body.id })
    .then(res.redirect("/getData"))
    .catch((error) => console.log(error));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// const express = require("express");
// const app = express();
// const cors= require("cors")
// app.use(cors());
// const PORT = 2020;
// const MongooseConnect =
//   "mongodb link to profile";
// const mongoose = require("mongoose");
// app.use(express.json());
// const productSchema = mongoose.Schema({
//   brend: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   context: {
//     type: String,
//     required: true,
//   },
// });
// const Products = mongoose.model("Products", productSchema);
// app.post("/add", async (req, res) => {
//   const newpProdct = new Products({
//     ...req.body,
//   });
//   await newpProdct.save();
//   res.send(newpProdct);
// });
// app.get("/add", async (req, res) => {
//   const data = await Products.find();
//   res.send(data);
// });
// app.delete("/add/:id", async (req, res) => {
//   const { id } = req.params;
//   await Products.findByIdAndDelete(id);
//   res.send("product has been deleted");
// });
// app.put("/add/:id", async (req, res) => {
//   const { id } = req.params;
//   const updatedProduct = await Products.findByIdAndUpdate(id, { ...req.body
// });
// });
// mongoose.connect(MongooseConnect).then(() => {
//   console.log("DB CONNECTED");
// });
// app.listen(PORT, () => {
//   console.log("App running");
// });
