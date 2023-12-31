const router = require('express').Router();
const { Category, Product } = require('../../models');

//See code explanation at the bottom of this file

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product],
  })
    .then((category) => res.json(category))
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: { id: req.params.id, },
    include: [Product],
  })
    .then((category) => res.json(category))
    .catch((err) => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => res.status(200).json({message:`${req.body.category_name} category created!`}))
    .catch((err) => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.status(200).json({message: `Category ${req.params.id} updated!`}))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id, },
  })
    .then((category) => res.status(200).json({message: `Category ${req.params.id} deleted!`}))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;

// Code Explanation: !This list was written for the tag-routes.js file, but the same logic applies to the category-routes.js file.
// instead of Tag, use Category

// 1. `router.get('/', (req, res) => { ... })`:
//    - Route: This route handles a GET request to the root ("/") endpoint.
//    - Purpose: Retrieves all tags from a data source, including their associated product data.
//    - Implementation: It uses the `Tag` model's `findAll` method with an include option to fetch the associated `Product` data through the `ProductTag` model.
//    - Response: Sends a JSON response with the retrieved tags on success (HTTP status 200) or an error JSON response on failure (HTTP status 500).

// 2. `router.get('/:id', (req, res) => { ... })`:
//    - Route: This route handles a GET request to the "/:id" endpoint, where ":id" represents a dynamic parameter.
//    - Purpose: Retrieves a single tag by its ID, including its associated product data.
//    - Implementation: It uses the `Tag` model's `findOne` method with a `where` option to find the tag by the provided `id` parameter. The include option is used to fetch the associated `Product` data through the `ProductTag` model.
//    - Response: Sends a JSON response with the retrieved tag on success (HTTP status 200) or an error JSON response on failure (HTTP status 500).

// 3. `router.post('/', (req, res) => { ... })`:
//    - Route: This route handles a POST request to the root ("/") endpoint.
//    - Purpose: Creates a new tag.
//    - Implementation: It uses the `Tag` model's `create` method and expects the tag data to be provided in the request body.
//    - Response: Sends a JSON response with the created tag on success (HTTP status 200) or an error JSON response on failure (HTTP status 500).

// 4. `router.put('/:id', (req, res) => { ... })`:
//    - Route: This route handles a PUT request to the "/:id" endpoint, where ":id" represents a dynamic parameter.
//    - Purpose: Updates a tag's name by its ID.
//    - Implementation: It uses the `Tag` model's `update` method with the provided data in the request body and the `id` parameter to identify the tag to update.
//    - Response: Sends a JSON response with the updated tag on success (HTTP status 200) or an error JSON response on failure (HTTP status 500).

// 5. `router.delete('/:id', (req, res) => { ... })`:
//    - Route: This route handles a DELETE request to the "/:id" endpoint, where ":id" represents a dynamic parameter.
//    - Purpose: Deletes a tag by its ID.
//    - Implementation: It uses the `Tag` model's `destroy` method with the `id` parameter to identify the tag to delete.
//    - Response: Sends a JSON response with the deleted tag on success (HTTP status 200) or an error JSON response on failure (HTTP status 500).

// Note: In all the route handlers, if an error occurs during the database operation (such as querying, creating, updating, or deleting a record), it will send an error response with HTTP status 500.