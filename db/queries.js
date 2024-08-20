const pool = require('./pool');

async function getAllCategories() {
  const query = 'SELECT * FROM categories';
  const categories = await pool.query(query);
  return categories.rows;
}

async function getAllItems() {
  const query = 'SELECT * FROM items';
  const items = await pool.query(query);
  return items.rows;
}

async function getCategoryByItemName(itemName) {
  const query = `
    SELECT c.id, c.name
    FROM categories c
    JOIN items i ON c.id = i.category_id
    WHERE i.name = $1;
  `;

  try {
    const result = await pool.query(query, [itemName]);
    return result.rows; // Returns an array of categories
  } catch (err) {
    console.error('Error executing query', err.stack);
    throw err; // Re-throw the error after logging it
  }
}

async function getItemsByCategoryName(categoryName) {
  const query = `
  SELECT i.category_id, i.name
  FROM items i
  JOIN categories c ON i.category_id = c.id
  WHERE c.name = $1;
  `;

  try {
    const result = await pool.query(query, [categoryName]);
    return result.rows; // Returns an array of items
  } catch (err) {
    console.error('Error executing query', err.stack);
    throw err; // Re-throw the error after logging it
  }
}

async function searchCategory(category) {
  const query = 'SELECT * FROM categories WHERE name ILIKE $1';
  const values = [`%${category}%`];
  const result = await pool.query(query, values);
  return result.rows;
}

async function addCategory(newCategory) {
  // use of $1 as a placeholder for parameters helps prevent SQL injection
  // by separating SQL code from data
  const query = 'INSERT INTO categories (name) VALUES ($1)';
  const values = [newCategory];
  await pool.query(query, values);
}

async function addItem(newItem, itemCategory) {
  let query;
  let values;

  if (itemCategory) {
    // check if category exists
    const categoryQuery = 'SELECT id FROM categories WHERE name = $1';
    const categoryResult = await pool.query(categoryQuery, [itemCategory]);

    let categoryId;
    if (categoryResult.rows.length > 0) {
      // Category exists, use its ID
      categoryId = categoryResult.rows[0].id;
    } else {
      await addCategory(itemCategory);
      const categoryRow = await searchCategory(itemCategory);
      categoryId = categoryRow[0].id;
    }

    query = 'INSERT INTO items (name, category_id) VALUES ($1, $2)';
    values = [newItem, categoryId];
  } else {
    query = 'INSERT INTO items (name) VALUES ($1)';
    values = [newItem];
  }

  await pool.query(query, values);
}

async function deleteAllCategories() {
  const query = 'DELETE FROM categories';
  await pool.query(query);
}

async function deleteAllItems() {
  const query = 'DELETE FROM items';
  await pool.query(query);
}

module.exports = {
  getAllCategories,
  getAllItems,
  addCategory,
  addItem,
  deleteAllCategories,
  deleteAllItems,
  getCategoryByItemName,
  getItemsByCategoryName,
};
