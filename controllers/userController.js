import connPool from "../db/pg.js";

// as these are all "end-of-line" functions, the next variable is not required

const getUsers = async (req, res) => {
  // query all users from db
  const query = "SELECT * FROM users";
  // {rows} or {rows:users} is both functional
  const { rows } = await connPool.query(query);

  res.send(rows);
};

const addUser = async (req, res) => {
  // variable names as provided in JSON request
  const { firstName, lastName } = req.body;
  // first_name, last_name as column names in db
  const query = "INSERT INTO users (first_name, last_name) VALUES ($1, $2) RETURNING *";

  // optionally add some verification of the names here

  const { rows: [user] } = await connPool.query(query, [firstName, lastName]);
  console.log(user);

  res.send(user);
};

const setTokenForUser = async (userId, tokenId) => {
  const query = "UPDATE users SET token_id = $1 WHERE id = $2 RETURNING *";

  const { rows: [user] } = await connPool.query(query, [tokenId, userId]);

  return user;
};

export { getUsers, addUser, setTokenForUser };
