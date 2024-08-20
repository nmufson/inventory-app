const { Client } = require('pg');
require('dotenv').config();

const SQL = `

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2),
  category_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL 
);
`;
// items category becomes NULL if category is deleted

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
