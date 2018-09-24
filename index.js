/***********Imports from social network****************/
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
const compression = require("compression");
const db = require("./db");
const s3 = require("./s3.js");
const config = require("./config");
const csurf = require("csurf");
const cookieSession = require("cookie-session");
app.use(require("cookie-parser")());
app.use(require("body-parser").json());
const cookieSessionMiddleware = cookieSession({
  secret: `I'm always angry.`,
  maxAge: 1000 * 60 * 60 * 24 * 90
});
app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
  cookieSessionMiddleware(socket.request, socket.request.res, next);
});
/*******CSURF*************************/
app.use(csurf());
app.use(function(req, res, next) {
  res.cookie("mytoken", req.csrfToken());
  next();
});
/************end csurf ***************/
/***********File upload header declr*******/
var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");

var diskStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + "/uploads");
  },
  filename: function(req, file, callback) {
    uidSafe(24).then(function(uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  }
});

var uploader = multer({
  storage: diskStorage,
  limits: {
    fileSize: 2097152
  }
});
/***********End imports *******************************/

app.use(compression());
app.use(express.static("./public"));
if (process.env.NODE_ENV != "production") {
  app.use(
    "/bundle.js",
    require("http-proxy-middleware")({
      target: "http://localhost:8081/"
    })
  );
} else {
  app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//REGISTER POST
app.post("/register", (req, res) => {
  console.log("Running register");
  if (
    !req.body.firstname &&
    !req.body.lastname &&
    !req.body.email &&
    !req.body.password
  ) {
    res.render("register", {
      // throw new Error();
      error: true
    });
  } else {
    db.hash(req.body.password)
      .then(function(hashedPassWrd) {
        console.log("DB hashed pass:", hashedPassWrd);
        return db.createUser(
          req.body.firstname,
          req.body.lastname,
          req.body.email,
          hashedPassWrd
        );
      })
      .then(function(results) {
        req.session.userId = results.rows[0].id;
        console.log("user ID:", results.rows[0]);
        console.log("last name from post/register: ", req.body.lastname);
        res.json({
          success: true
        });
      })
      .catch(function(err) {
        res.json({
          sucess: false
        });
        console.log("error in registration: ", err);
      });
  }
});
//END OF REGISTER

//POST LOG IN
app.post("/login", (req, res) => {
  if (!req.body.email && !req.body.password) {
    res.render("login", {
      error: true
    });
  } else if (req.body.email && req.body.password) {
    db.loginUser(req.body.email)
      .then(function(user) {
        req.session.userId = user.id;
        console.log("user ID in login post: ", user.id);
        db.checkPass(req.body.password, user.password).then(function(
          registered
        ) {
          if (!registered) {
            throw new Error();

            // res.redirect("/app");
          } else {
            console.log("registered!", registered);
            // req.session.userId = user.id;
            res.json({
              success: true
            });
            // location.replace("/app");
          }
        });
      })
      .catch(function(err) {
        console.log("login error", err);
      });
  }
});

/*****************GET USER PROFILE ************************/
app.get("/getuserprofile", (req, res) => {
  db.getUserProfile(req.session.userId)

    .then(results => {
      // console.log("get user prof results:", results);
      let imageurl = "/IMG_8213.JPG";
      if (results.url != null) {
        // imageurl = results.url;
        imageurl = results.url;
      }
      res.json({
        id: req.session.userId,
        firstname: results.firstname,
        lastname: results.lastname,
        email: results.email,
        imageUrl: imageurl,
        bio: results.bio
      });
    })

    .catch(function(err) {
      console.log("User profile error", err);
    });
});

/*****************END GET USER PROFILE ************************/

/****************EDIT PROFILE**********************************/

app.post("/editprofile", (req, res) => {
  console.log("editProfile req.body: ", req.body);
  db.editProfile(
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.bio,
    req.session.userId
  )
    .then(() => {
      // req.session.firstname = req.body.firstname;
      // console.log("", req.session);
      res.json({
        success: true
      });
    })
    .catch(error => {
      console.log("error in editProfile", error);
    });
});
/****************END EDIT PROFILE******************************/

/******************UPLOAD IMAGE********************************/
app.post("/uploadimage", uploader.single("file"), s3.upload, (req, res) => {
  // console.log("req body", req.body);
  db.insertUrl(config.s3Url + req.file.filename, req.session.userId)
    .then(({ rows }) => {
      res.json(rows[0]);
    })

    .catch(function(err) {
      console.log("Error while getting user details", err);
      res.json({ success: false });
    });
});
/******************END IMAGE UPLOAD****************************/

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
  console.log("I'm listening.");
});
