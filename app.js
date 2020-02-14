const express = require("express");
const app = express();

const db = require("./config/db");

app.get("/", (req, res) => res.send("respon nodejs berhasil"));

app.use(express.urlencoded({ extended: true }));

db.authenticate().then(() =>
  console.log("berhasil terkoneksi dengan database")
);

const User = require("./models/User");

app.post("/crud", async (req, res) => {
  try {
    //   destructuring object
    const { username, email, password } = req.body;

    // initialize models database
    const newUser = new User({
      username,
      email,
      password
    });

    // await = menjalankan kode models user
    await newUser.save();

    // menampilkan newuser ketika di save postman
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.get("/crud", async (req, res) => {
  try {
    const getAllUser = await User.findAll({});

    res.json(getAllUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.get("/crud/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const getUser = await User.findOne({
      where: { id: id }
    });

    res.json(getUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.delete("/crud/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deleteUser = await User.destroy({
      where: { id: id }
    });

    await deleteUser;

    res.json("berhasil di hapus");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.put("/crud/:id", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const id = req.params.id;

    const updateUser = await User.update(
      {
        username,
        email,
        password
      },
      { where: { id: id } }
    );

    await updateUser;

    res.json("berhasil di update");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.listen(4500, () => console.log("port bejalan di 4500"));
