const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router;


// Code Explanation

// Importing Required Dependencies:

// const router = require('express').Router();: This line imports the Router class from the Express framework. 
// The Router class allows you to create modular, mountable route handlers that can be used to handle different 
// HTTP methods for specific paths.

// const categoryRoutes = require('./category-routes');: This line imports a set of routes defined in the category - routes.js
// file. These routes handle CRUD(Create, Read, Update, Delete) operations related to categories in the application.

// const productRoutes = require('./product-routes');: This line imports a set of routes defined in the product - routes.js file. 
// These routes handle CRUD operations related to products in the application.

// const tagRoutes = require('./tag-routes');: This line imports a set of routes defined in the tag - routes.js file.These routes 
//  handle CRUD operations related to tags in the application.

// Mounting Routes with router.use():

// router.use('/categories', categoryRoutes);: This line mounts the routes defined in the categoryRoutes on the path / categories. 
// It means that all routes defined in the categoryRoutes file will be accessible under the / categories path.For example, if there's 
// a route in categoryRoutes that handles getting all categories, it would be accessible via GET / categories.

// router.use('/products', productRoutes);: This line mounts the routes defined in the productRoutes on the path / products.It means that 
// all routes defined in the productRoutes file will be accessible under the / products path.For example, if there's a route in productRoutes 
// that handles getting all products, it would be accessible via GET / products.

// router.use('/tags', tagRoutes);: This line mounts the routes defined in the tagRoutes on the path / tags.It means that all routes defined in
// the tagRoutes file will be accessible under the / tags path.For example, if there's a route in tagRoutes that handles getting all tags, it would 
// be accessible via GET / tags.

// Exporting the Router:

// module.exports = router;: This line exports the router object, which now contains all the mounted routes.When this index.js file is imported in
// the main application file, the exported router object with mounted routes will be used as middleware to handle incoming HTTP requests.