const productModel = require("../Models/product.model");

module.exports.createProduct = async ({
    name, image, createdBy
}) => {
    
    if (!name || !image) {
        throw new Error(' product Name & image are  required')
    }

    const product = productModel.create({
        name,
        image,
        createdBy
    })
    
    return product;
};
module.exports.getAllProducts = async () => {
  return await productModel.find().sort({ createdAt: -1 });
};
module.exports.getDailyIdsData = async () => {
  return await productModel.find().sort({ createdAt: -1 });
};
