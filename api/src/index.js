import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import jwt from "jsonwebtoken"
import { createTables } from "./Database.js"
import { signup, login } from "./controllers/AuthController.js"
import dotenv  from "dotenv"

dotenv.config()

// initalize DB
createTables();

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(express.json());
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan("combined"));

// --------------- ROUTING ----------------
app.post("/api/signup", async (req, res) => signup(req, res));

app.post("/api/login", async (req, res) => login(req, res));

// endpoint to delete an ad
app.post("/api/test", verifyTokenMiddleware, async (req, res) => {
  verifyToken(res, req, () => {
    console.log("VERIFIED");
  });
});

// endpoint to update an ad
app.put("/:id", verifyTokenMiddleware, async (req, res) => {});
// ------------ END ROUTING ---------------

// starting the server
app.listen(3001, () => {
  console.log("listening on port 3001");
});

function verifyTokenMiddleware(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

function verifyToken(res, req, next) {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      next();
    }
  });
}


