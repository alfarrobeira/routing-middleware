import connPool from "../db/pg.js";
import { setTokenForUser } from "./userController.js";

// create token for user
const createToken = async (req, res) => {
  const { userId } = req.params;
  // get random number as token value
  const text = Math.floor(Math.random() * 9999).toString();
  const tokenQuery = "INSERT INTO token (value) VALUES ($1) RETURNING *";

  const { rows: [token] } = await connPool.query(tokenQuery, [text]);

  // set this token for the specified user
  const user = await setTokenForUser(userId, token.id);

  res.send(user);
};

// This function checks whether the token provided in URL route is available on a user
const verifyToken = async (req, res) => {
  const { token } = req.params;
  // 1st step: check if token is available in db
  const query1 = "SELECT * FROM token WHERE value=$1";

  const { rows: [tk] } = await connPool.query(query1, [token]);

  if (tk) {
    // 2nd step: check if token is assigned to a user
    const query2 = "SELECT * FROM users WHERE token_id=$1";
    const { rows: [user] } = await connPool.query(query2, [tk.id]);
    if (user) {
      res.send("Token valid");
      return;
    }
  }
  res.status(401).send("Token invalid");
};

export { createToken, verifyToken };