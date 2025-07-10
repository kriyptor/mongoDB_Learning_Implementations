require("dotenv").config();
const express = require(`express`);
const { connectToDb } = require(`./db`);
const { insertBookData } = require(`./bulk-Insertion`);
const crudRouter = require(`./router/crud-router`);
const queryRouter = require(`./router/query-router`);
const { ObjectId } = require(`mongodb`);
const bodyParser = require("body-parser");
const cors = require(`cors`);


const PORT = process.env.PORT || 3000;

if(!process.env.DB_URI){
    console.error('Missing required environment variables');
    process.exit(1);
}

const app = express();

app.use(bodyParser.json());
app.use(cors())

/* -----------API Routes--------------- */

app.use(`${process.env.API_BASE_URL}/crud`, crudRouter);
app.use(`${process.env.API_BASE_URL}/query`, queryRouter);


/* -------DB Connection------- */
connectToDb()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Connected To DB, Sever Started At Port:${PORT}`) 
    );
    /* insertBookData() */
  })
  .catch((err) => console.log(`Server Crashed with error: ${err}`));
