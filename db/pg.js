//import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

const connPool = new Pool({
  // todo: save connection string to ENV variable
  connectionString:
    "postgres://jsrjextg:0vU5h7kbfsnldaOLyCr9CsybatpdFe-M@surus.db.elephantsql.com/jsrjextg",
});

export default connPool;
