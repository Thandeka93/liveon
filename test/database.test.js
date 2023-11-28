import 'dotenv/config';
import assert from 'assert';
import dbQueries from '../database.js';
import pgPromise from 'pg-promise';


// Define the database connection string
const connectionString = process.env.PGDATABASE_URL ||
  'postgres://giiugpiv:jupnzDLHL6jh3-7iE4ExXZr3FCQKw3w5@ella.db.elephantsql.com/giiugpiv'

// Create a PostgreSQL database instance and connect to it
const pgp = pgPromise();
const db = pgp(connectionString);

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



  
      
        after(function () {
        db.$pool.end;
    });
    
    
    
   

}  );