const categoryModel = require("../../models/category");
const productModel = require("../../models/product");
function createCategory(categories, parentId = null) {
    const categoriesList = [];
    let catgory;
    if (parentId == null) {
      catgory = categories.filter((f) => f.parentId == undefined);
    } else {
      catgory = categories.filter((f) => f.parentId == parentId);
    }
    for (let cat of catgory) {
      categoriesList.push({
        _id: cat._id,
        name: cat.name,
        slug: cat.slug,
        parentId:cat.parentId,
        type:cat.type,
        children: createCategory(categories, cat._id),
      });
    }
    return categoriesList;
  }
exports.catAndProd = async (req, res) => {
  const category = await categoryModel.find({}).exec();
  const product = await productModel
    .find({})
    .select("_id name slug price quantity description productPictures category")
    .populate({path:'category',select:'_id name'})
    .exec();
  res.status(200).json({
    category:createCategory(category),
    product,
  });
};
