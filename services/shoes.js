export default function  shoes(query){

    let allShoes=[];
    
    async function showAll(req,res,next){
    
           await query.setOwner("Admin","Admin@2023");
          res.render("index",{
          allShoes
         });
    }
    
    
    async function getAll(req,res,next){
    
    
      try{
    
               allShoes= await query.getAll();
               res.redirect("/");
    
       }catch(err){
              console.log(err);
    
       }
    
    }
    
    async function getBrand(req,res,next){
    
        let brand= req.params.brandname;
        try{
            
                allShoes= await query.getBrand(brand);
                res.redirect("/");
                
              
          }catch(err){
                 console.log(err);
          }
    
    }
    
    async function getSize(req,res,next){
    
        let size= req.params.size;
        try{
            
                allShoes= await query.getSize(size);
                res.redirect("/");
                
              
          }catch(err){
                 console.log(err);
          }
    
    }
    
    async function getCartItems(){
    
           await query.clearCart();
        }
    
    return{
    showAll,
    getAll,
    getBrand,
    getSize,
    getCartItems
    
    }
    
    }