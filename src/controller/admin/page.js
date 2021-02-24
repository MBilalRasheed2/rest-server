const Page = require("../../models/page");
exports.createPage = (req, res) => {
  const { products, banners } = req.files;
  if (banners) {
    if (banners.length > 0) {
      req.body.banners = banners.map((banner, index) => ({
        img: `/public/${banner.filename}`,
        navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
      }));
    }
  }
  if (products) {
    if (products.length > 0) {
      req.body.products = products.map((product, index) => ({
        img: `/public/${product.filename}`,
        navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
      }));
    }
  }

  req.body.createdby = req.user._id;



Page.findOne({category:req.body.category}).exec((error,page)=>{
   if(error){
      return res.status(400).json({error});

   }
   if(page){
      Page.findOneAndUpdate({category:req.body.category},req.body).exec((_error,updatedPage)=>{
         if(_error){

            return res.status(400).json({error:_error});
         }
         if(updatedPage){
            return res.status(200).json({page:updatedPage});
         }
      });
     
   }else{
      const page = new Page(req.body);
            page.save((error, page) => {
              if (error) {
                return res.status(400).json({ error });
              }
              if (page) {
                return res.status(200).json({ page: page });
              }
            });

   }

});
};

exports.getPage=(req,res)=>{
   const {category,type}=req.params;
   if(type==="page"){
   Page.findOne({category:category}).exec((error,page)=>{

      if(error){
         return res.status(400).json({
            error:error
         });
      }
      if(page){
         return res.status(200).json({
            page:page
         });
      }

   });
   }
}
