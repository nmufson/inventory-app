const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller');

router.get('/', controller.getHomePage);
router.post('/add-category', controller.postAddCategory);
router.post('/add-item', controller.postAddItem);
router.post('/delete-all-categories', controller.postDeleteCategories);
router.post('/delete-all-items', controller.postDeleteItems);

router.get('/category', controller.getCategoryByItemName);
router.get('/item', controller.getItemsByCategoryName);

module.exports = router;
