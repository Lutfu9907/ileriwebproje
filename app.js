const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
const dateHelper = require("./helpers/dateHelper");

const store = new MongoDBStore({
  uri: "mongodb+srv://Lutfu99:Lutfu2019@cluster0.ncgj7iq.mongodb.net/iwebDB?retryWrites=true&w=majority",
  collection: "sessions",
});

app.set("view engine", "ejs");
app.locals.formatDate = dateHelper.formatDate;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrf());

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Rotaları tanımlayın
const announcementRoutes = require("./routes/announcementRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/announcements", announcementRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.redirect("/users/login");
});

mongoose
  .connect(
    "mongodb+srv://Lutfu99:Lutfu2019@cluster0.ncgj7iq.mongodb.net/iwebDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
