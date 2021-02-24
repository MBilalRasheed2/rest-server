const category = require("../../models/category");
const Catgory = require("../../models/category");
const slugify = require("slugify");

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
      parentId: cat.parentId,
      type:cat.type,
      children: createCategory(categories, cat._id),
    });
  }
  return categoriesList;
}
exports.addCategory = (req, res) => {
  const categoryObj = { name: req.body.name, slug: slugify(req.body.name) };

  if (req.file) {
    categoryObj.categoryImage =
      "/public/" + req.file.filename;
  }
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  if (req.body.type) {
    categoryObj.type = req.body.type;
  }
  const newCat = category(categoryObj);

  newCat.save((err, cat) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      category: { cat },
    });
  });
};

exports.getCategory = (req, res) => {
  category.find({}).exec((err, cat) => {
    if (cat) {
      const getAllCategory = createCategory(cat);
      res.status(200).json({
        category: getAllCategory,
      });
    }
  });
};

exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;

  const updateCategoriesList = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }
     
      
      const updateCategory = await Catgory.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updateCategoriesList.push(updateCategory);
  }
    return res.status(200).json({ updateCategoriesList });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    
    const updateCategory = await Catgory.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(200).json({ updateCategory });
  }
};
exports.deleteCategories = async (req, res) => {
  const {deleteids}=req.body.payload;
  res.status(200).json({deleteids});
 const deleteIdArray=[];
 for(let i=0;i<deleteids.length;i++){
   const deleteCategory=await Catgory.findOneAndDelete({_id:deleteids[i]._id});
   deleteIdArray.push(deleteCategory);
 }
 if(deleteIdArray.length==deleteids.length){
   res.status(200).json({message:"Categories removed"});
 }else{
  res.status(400).json({message:"error"});
 }

  
};
