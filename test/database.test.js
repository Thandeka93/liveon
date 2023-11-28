import 'dotenv/config';
import assert from 'assert';
import dbQueries from '../database.js';
import pkg from 'pg-promise';
const connectionString = process.env.URL;
const Pool = pkg();
const db = Pool({
    connectionString,
    ssl: true
});

let queries= dbQueries(db);


describe('The Shoes Catalogue web app',async function(){
		
beforeEach(async function () {
	
    try {
        	
       await queries.resetAll();
           }catch(err){

         console.log(err);
}
        
}  );

            

    it("should be able to claer all items ",async function(){

let deleted= await queries.resetAll();
assert.equal("Successfully deleted!", deleted);
});


it("should return the admin password",async function(){
    	
    let pass= await queries.getOwner("Admin");
    assert.equal("Admin@2023", pass);
    });
  
      
        after(function () {
        db.$pool.end;
    });
    
    
    
   

}  );