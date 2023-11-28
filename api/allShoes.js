export default function allShoes(db){


    async function getAll(req,res){


        try{
            let shoes=await db.manyOrNone("SELECT * FROM shoes");

            res.json({
                shoes:shoes
            });
    }catch(err){
    	
        res.json({
            shoes:err
        });
   }
}
    


async function getItem(cart_code){


    try{
        let shoes=await db.manyOrNone("SELECT * FROM cart_items WHERE cart_code=$1",cart_code);

      return shoes;
}catch(err){
  
    return err;
}

}

async function addToCart(req,res){

    let {cart_code,shoesId,qty}= req.body;

    try{

        let item= await getItem(cart_code);

        res.json({status:"success",
        
     item:item})
}catch(err){
  
    res.json({status:"error",
    item:err});

}

}
    return{

        getAll,
        getItem,
        addToCart
    }
}