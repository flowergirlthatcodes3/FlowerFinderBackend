const pg = require("pg");

const client = new pg.Client("postgres://localhost/flowergirlcodes");
const cors = require("cors");

const express = require("express");
const app = express();

app.use(cors());

app.get("/api/flowers", async (req, res, next) => {
  try {
    const SQL = `
        SELECT *
        FROM flowers
        `;
    const response = await client.query(SQL);
    console.log(response.rows);
    res.send(response.rows);
  } catch (error) {
    next(error);
  }
});

const init = async () => {
  await client.connect();
  const SQL = `
  DROP TABLE IF EXISTS flowers;
 CREATE TABLE flowers(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        is_favorite BOOLEAN

    );
    INSERT INTO flowers (name) VALUES ('Rose');
    INSERT INTO flowers (name) VALUES ('Dahlia');
    INSERT INTO flowers (name, is_favorite) VALUES ('Peony', true)
    `;
  await client.query(SQL);
  console.log("table created");

  const port = 3000;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};
init();
