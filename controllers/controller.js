const db = require('../db/queries');

async function getHomePage(req, res) {
  const categories = await db.getAllCategories();
  const items = await db.getAllItems();

  res.render('index', { title: 'Inventory Management', categories, items });
}

async function getCategoryByItemName(req, res) {
  const itemName = req.query.itemName;

  try {
    const returnedCategory = await db.getCategoryByItemName(itemName);
    const categories = await db.getAllCategories();
    const items = await db.getAllItems();

    // Return JSON response
    res.json({
      categories,
      items,
      returnedCategory,
    });
  } catch (err) {
    console.error('Error fetching data:', err.stack);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
}

async function getItemsByCategoryName(req, res) {
  const categoryName = req.query.categoryName;

  try {
    const returnedItems = await db.getItemsByCategoryName(categoryName);
    const categories = await db.getAllCategories();
    const items = await db.getAllItems();

    // Return JSON response
    res.json({
      categories,
      items,
      returnedItems,
    });
  } catch (err) {
    console.error('Error fetching data:', err.stack);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
}

async function postAddCategory(req, res) {
  const newCategory = req.body.newCategory;
  await db.addCategory(newCategory);
  res.redirect('/');
}

async function postAddItem(req, res) {
  const newItem = req.body.newItem;
  const itemCategory = req.body.itemCategory;
  await db.addItem(newItem, itemCategory);
  const categories = await db.getAllCategories();
  const items = await db.getAllItems();
  res.render('index', { title: 'Inventory Management', categories, items });
}

async function postDeleteCategories(req, res) {
  await db.deleteAllCategories();
  const categories = await db.getAllCategories();
  const items = await db.getAllItems();
  res.render('index', { title: 'Inventory Management', categories, items });
}

async function postDeleteItems(req, res) {
  await db.deleteAllItems();
  const categories = await db.getAllCategories();
  const items = await db.getAllItems();
  res.render('index', { title: 'Inventory Management', categories, items });
}

module.exports = {
  getHomePage,
  getCategoryByItemName,
  getItemsByCategoryName,
  postAddCategory,
  postAddItem,
  postDeleteCategories,
  postDeleteItems,
};
