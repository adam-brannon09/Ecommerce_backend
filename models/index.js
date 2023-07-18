// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

//Product and Category refer to the models you have defined in your Sequelize setup. 
//Product represents the model for products, and Category represents the model for categories.
//belongsTo is a method provided by Sequelize that creates an association between two models, 
//where one model(in this case, Product) belongs to another model(Category).

// foreignKey: 'category_id' specifies the foreign key used to establish the relationship between 
//the Product and Category models.In this case, it uses the column category_id in the Product table as the foreign key.

//onDelete: 'CASCADE' defines the action to be taken when a Category is deleted. It specifies that if a Category is deleted, 
//all associated Product instances should also be deleted(i.e., cascade delete).This ensures that when a category is removed, 
//all the products belonging to that category are automatically removed as well.
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Categories have many Products

// Category and Product refer to the models you have defined in your Sequelize setup.Category 
// represents the model for categories, and Product represents the model for products.

// hasMany is a method provided by Sequelize to create a one - to - many association between two models. 
// In this case, it establishes a relationship where a Category can have multiple Product instances associated
// with it, but each Product can only belong to a single Category.

//   foreignKey: 'category_id' specifies the foreign key used to establish the relationship between the Category 
// and Product models.It indicates that the category_id column in the Product table will reference the id column
//   in the Category table.
    
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Products belongToMany Tags (through ProductTag)
// Product and Tag refer to the models you have defined in your Sequelize setup.Product represents the 
// model for products, and Tag represents the model for tags.

// belongsToMany is a method provided by Sequelize to create a many - to - many association between two models. 
// In this case, it establishes a relationship where a Product can belong to multiple Tag instances, and a Tag can 
// be associated with multiple Product instances.

// through: ProductTag specifies the intermediate model that Sequelize will use to manage the association between 
// Product and Tag.ProductTag represents the model that holds the mapping between products and tags.It contains foreign 
// keys referencing the Product and Tag models.

// foreignKey: 'product_id' defines the foreign key used in the intermediate model(ProductTag) 
// to establish the relationship with the Product model.It indicates that the product_id column in the 
// ProductTag table will reference the id column in the Product table.
  
Product.belongsToMany(Tag, {
  through: ProductTag,
  // as: 'product_tags',
  foreignKey: 'product_id',
});

// Tags belongToMany Products (through ProductTag)
// See comments starting on line 42 for explanation of this code.
Tag.belongsToMany(Product, {
  through: ProductTag,
  // as: 'product_tags',
  foreignKey: 'tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
