const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

//See code explanation at the bottom of this file

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    include: [{ model: Tag, through: ProductTag },],
  })
    .then((products) => res.json(products))
    .catch((err) => res.status(500).json(err));
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: { id: req.params.id, }, include: [Category, { model: Tag, through: ProductTag, },],
  })
    .then((product) => res.json(product))
    .catch((err) => res.status(500).json(err));
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  
  })
  .then((product) => {
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = ProductTag.findAll({ where: { product_id: req.params.id } 
      });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
            
          };
        });
        // figure out which ones to remove
        const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);

        // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
            
          ]);
        }

    return res.json({message: `Product ${req.params.id} updated!`});
    
    }) 
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
    
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: { id: req.params.id, },
  })
    .then((product) => res.json({message: `Product ${req.params.id} deleted!`}))
    .catch((err) => res.status(400).json(err));
});
  
  

module.exports = router;

//Code Explanation

// Get all products (GET /api/products):
// This route fetches all products from the database, including their associated categories and tags. 
// It uses the Product model and the findAll method to retrieve the data.The associated Category and Tag 
// data are included using the include option in the query.

// Get one product (GET /api/products/:id):
// This route fetches a single product based on the provided id parameter.It uses the Product model 
// and the findOne method with a where clause to find the product by its id.It also includes the 
// associated Category and Tag data using the include option.

// Create new product (POST /api/products):
// This route allows the addition of a new product to the database.The request body is expected 
// to contain the necessary details for the product, such as product_name, price, stock, and an 
// array of tagIds.The Product model and the create method are used to create the product.If tagIds 
// are provided, it also handles the creation of associations between the product and tags using the 
// ProductTag model.

// Update product (PUT /api/products/:id):
// This route updates an existing product in the database based on the provided id parameter.It 
// uses the Product model and the update method with a where clause to find and update the product by 
// its id.If tagIds are provided in the request body, it handles updating the associated tags by adding
// new ones or removing existing ones.It uses the ProductTag model to manage the relationships between 
// products and tags.

// Delete product (DELETE /api/products/:id):
// This route deletes a product from the database based on the provided id parameter.However, the route 
// itself is not implemented in the provided code snippet, as the route handler function is empty.To implement
// this route, you would need to use the Product model and the destroy method with a where clause to delete the product.