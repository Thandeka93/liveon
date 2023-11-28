export default function dbQueries(db){


    async function createCart(username){

            try{

               await db.none("INSERT INTO cart(cart_code,status,username) VALUES(DEFAULT,$1,$2)",['open',username]);


            }  catch(err){
               console.log(err);
            } 
       }


     


       async function getCartCode(username){

    try{

      let result= await db.oneOrNone("SELECT cart_code FROM cart WHERE username=$1",username);
     
      return result.cart_code;
    }catch(err){
            console.log(err);
    }
       }

       async function addToCart(cart_code,shoesId,qty){
      
            try{
                  await db.none("INSERT INTO cart_items(cart_code,id,qty) VALUES($1,$2,$3)",[cart_code,shoesId,qty]);

                  let result= await db.manyOrNone("SELECT shoes.brand, shoes.color,shoes.price,shoes.image,cart_items.qty FROM cart_items JOIN shoes on cart_items.id=shoes.id WHERE cart_code=$1",cart_code);
    
                    return result;
    
            }catch(err){
    
                    console.log(err);
                    return err;
            }
              }

       async function allCarts(){

            try{
              let result= await db.manyOrNone("SELECT * FROM cart");
              
              return result;
            }catch(err){
                    console.log(err);
            }
               }



               
    async function getQuantity(shoesId,cart_code){

            try{

              let result= await db.oneOrNone("SELECT id,qty from cart_items WHERE id=$1 AND cart_code=$2",[shoesId,cart_code]);
              
              let result2= await db.oneOrNone("SELECT id,in_stock from shoes WHERE id=$1",shoesId);

              if(result.qty>=result2.in_stock){

              return true;


              }

              else{
                    return false;
              }

            }  catch(err){
               return err;
            } 
       }

                       


async function  addShoes(color,brand,price,size,in_stock,image){

try{

            await db.none("INSERT INTO shoes (id,color,brand,price,size,in_stock,image) VALUES (DEFAULT,$1,$2,$3,$4,$5,$6)",[color,brand,price,size,in_stock,image]);

            
    return "Successfully  added new stock";
     }catch(err){

             console.log(err);
    return "Could not add stock";

  }
}

async function updateStock(qty,shoesId){

try{

          await db.none("UPDATE shoes SET in_stock=$1 WHERE id=$2",[qty,shoesId])
            
    return "Successfully  updated stock";
     }catch(err){

            
    return err;

  }

}

async function  getAll(){

try{
        let shoes=await db.manyOrNone("SELECT * FROM shoes");
        return shoes;
}catch(err){
    
       console.log(err);
}
}


async function  getBrand(brand){

try{
        let shoes=await db.manyOrNone("SELECT * FROM shoes WHERE brand=$1",brand);
        return shoes;
      
}catch(err){
    
       console.log(err);
}
}


async function  getBrandColor(brand,color){

try{
        let shoes=await db.manyOrNone("SELECT * FROM shoes WHERE brand=$1 AND color=$2",[brand,color]);
        return shoes;
      
}catch(err){
    
       console.log(err);
}
}


async function  getSize(size){

try{
        let shoes=await db.manyOrNone("SELECT * FROM shoes WHERE size=$1",size);
        return shoes;
      
}catch(err){
    
       console.log(err);
}
}

async function  getBrandSize(brand,size){

try{
         let shoes= await db.manyOrNone("SELECT * FROM shoes WHERE brand=$1 AND size=$2",[brand,size]);
         return shoes;

}catch(err){

       console.log(err);
}

}


async function  getBrandSizeColor(brand,size,color){

    try{
               let shoes= await db.manyOrNone("SELECT * FROM shoes WHERE brand=$1 AND size=$2 AND color=$3",[brand,size,color]);
               return shoes;
    
    }catch(err){
  
             console.log(err);
  }
  
  }


async function  getSizeColor(size,color){

    try{
            let shoes=await db.manyOrNone("SELECT * FROM shoes WHERE size=$1 AND color=$2",[size,color]);
            return shoes;
          
    }catch(err){
            
           console.log(err);
   }
}


async function getColor(color){
    try{
            let shoes=await db.manyOrNone("SELECT * FROM shoes WHERE color=$1",color);
            return shoes;
          
    }catch(err){
            
           console.log(err);
   }
}



async function deleteSold(shoesId){

try{


    let quantity= await db.oneOrNone("SELECT in_stock FROM shoes WHERE id=$1",shoesId);
    let in_stock=quantity.in_stock-1;
    

     await db.none("UPDATE shoes SET in_stock=$1 WHERE id=$2",[in_stock,shoesId]);

return "deleted";
}catch(err){
return err;
}
}



async function resetAll(cart_code){
    try{

            await db.none("DELETE FROM cart_items");
    
            return "Successfully deleted!"

       
            }catch(err){
            
            console.log(err);
            return err
            }      
}


async function pay(){
    try{

            await db.none("DELETE FROM cart_items");
            

            return "Payment successful!";
            }catch(err){
            
            console.log(err);
            return "Payment not processed";
            }      
}


async function updateCart(shoesId,cart_code){

    try{

            let quantity= await db.oneOrNone("SELECT qty FROM cart_items WHERE id=$1 AND cart_code=$2",[shoesId,cart_code]);
           let qty=quantity.qty+1;
           

            await db.none("UPDATE cart_items SET qty=$1 WHERE id=$2 AND cart_code=$3",[qty,shoesId,cart_code]);

            return ("succesfully updated");
            

            }catch(err){
            
            console.log(err);
            return err;
            } 




}


async function removeItem(shoesId,cart_code){

    try{

            let quantity= await db.oneOrNone("SELECT qty FROM cart_items WHERE id=$1 AND cart_code=$2",[shoesId,cart_code]);
           let qty=quantity.qty-1;
           
           if(qty>0){

            await db.none("UPDATE cart_items SET qty=$1 WHERE id=$2 AND cart_code=$3",[qty,shoesId,cart_code]);


           }


           else{

            await db.none("DELETE FROM cart_items WHERE id=$1 AND cart_code=$2",[shoesId,cart_code]);

            
           }
 
        
           return "successfully updated";

            }catch(err){
            
            console.log(err);                                                                                                                                                                                                                                                               
            return err;
            } 



}

     async function getCartItems(cart_code){

         try{

            let result= await db.manyOrNone("SELECT shoes.brand, shoes.color,shoes.price,shoes.image, cart_items.qty,cart_items.id FROM cart_items JOIN shoes on cart_items.id=shoes.id WHERE cart_code=$1",cart_code);
    
              return result;
            

            }catch(err){
            
            console.log(err);
            return err.stack;
            } 

    }

  async function getItem(cart_code,shoesId){
    try{
            let shoes=await db.manyOrNone("SELECT * FROM cart_items WHERE cart_code=$1 AND id=$2",[cart_code,shoesId]);
            return shoes;
          
    }catch(err){
            
           console.log(err);
   }

}


async function pastOrders(shoesId,cart_code){


    try{

         await db.none("INSERT INTO past_orders(id,order_day,cart_code) VALUES ($1,DEFAULT,$2)",[shoesId,cart_code]);

        return "Recorded successfully";

    }catch(err){
            console.log(err);
            return err;
          
    }
}


async function getOrders(cart_code){

    try{

let result= await db.manyOrNone("SELECT shoes.brand, shoes.color,shoes.price,shoes.image,past_orders.order_day,past_orders.cart_code FROM past_orders JOIN shoes ON past_orders.id=shoes.id WHERE past_orders.cart_code=$1",cart_code);


return result;


}catch(err){

    return err;
}    

}


async function setOwner(name,password){

    try{

            await db.none("INSERT INTO owner(name,password) VALUES ($1,$2)",[name,password]);

            return 'successful'

    }catch(err){
return err;

    }

}

async function getOwner(name){
    try{

           let password= await db.oneOrNone("SELECT password FROM owner Where name=$1",name);

            return password.password;

    }catch(err){

            return err;


}
}


return{
addShoes,
getAll,
getBrand,
getSize,
getBrandSize,
deleteSold,
    getColor,
    getBrandColor,
    getSizeColor,
    getBrandSizeColor,
    createCart,
    getCartCode,
    allCarts,
    addToCart,
    pay,
    updateCart,
    getItem,
    getCartItems,
    resetAll,
    removeItem,
    pastOrders,
    getOrders,
    setOwner,
    getOwner,
    updateStock,
    getQuantity



}

}