import { connection, queryPromise } from "../Database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { promisify } from "util";

export const findAccount = async (id, username) => {
  var results = null;
  if (id) {
    results = queryPromise(`SELECT * FROM Accounts WHERE id='${id}' LIMIT 1`);
  } else if (username) {
    results = queryPromise(
      `SELECT * FROM Accounts WHERE username='${username.toLowerCase()}' LIMIT 1`
    );
  }

  return results && results.length > 0 ? results[0] : results;
};

export const signup = async (req, res) => {
  const { username, password } = req.body;

  const account = await findAccount(null, username);

  if (account.length > 0) {
    res.status(400).json({ message: "Username taken." });
    return;
  }

  const regex = /\W|_/g;

  if (username.length < 4 || username.match(regex)) {
    res.status(400).json({ success: false });
    return;
  }

  try {
    connection.query(
      `INSERT INTO Accounts (username, password) VALUES ('${username}', '${bcrypt.hashSync(
        password,
        10
      )}')`
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to create account." });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const account = await findAccount(null, username);

  if (account.length < 1) {
    res.status(400).json({ message: "Invalid credentials." });
    return;
  }

  bcrypt.compare(password, account[0].password, (err, res1) => {
    if (err) {
      res.status(500);
    }
    if (res) {
      const user = {
        id: account[0].id,
        username: account[0].username,
        password: account[0].password,
      };

      jwt.sign({ user }, "secretkey", (err, token) => {
        res.status(200).json({ token });
      });
    } else {
      res.status(400).json({ message: "Invalid credentials." });
    }
  });
};
