import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';
import dbQueries from './database.js';
import services from './services/shoes.js';
import api from './api/shoesApi.js';
import cors from 'cors';
import allShoes from "./api/allShoes.js"

// Define the database connection string
const connectionString = process.env.PGDATABASE_URL ||
  'postgres://giiugpiv:jupnzDLHL6jh3-7iE4ExXZr3FCQKw3w5@ella.db.elephantsql.com/giiugpiv'

// Create a PostgreSQL database instance and connect to it
const pgp = pgPromise();
const db = pgp(connectionString);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.static('images'));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: "no secret",
  resave: false,
  saveInitialized: false
}));
app.use(flash());


const query= dbQueries(db);
const getAllShoes= allShoes(db);
const service= services(query);
const shoesApi= api(query);


app.get("/", service.showAll);


app.get("/api/shoes", getAllShoes.getAll);
app.get("/api/shoes/brand/:brandname", shoesApi.getBrand);
app.get("/api/shoes/size/:size", shoesApi.getSize);
app.get("/api/shoes/color/:color",shoesApi.getColor);
app.get("/api/shoes/brand/:brandname/size/:size/color/:color",shoesApi.getBrandSizeColor);
app.get("/api/shoes/brand/:brandname/size/:size",shoesApi.getBrandSize);
app.get("/api/shoes/brand/:brandname/color/:color",shoesApi.getBrandColor);
app.get("/api/shoes/size/:size/color/:color",shoesApi.getSizeColor);
app.post("/api/shoes/sold", shoesApi.deleteSold);
app.post("/api/shoes", shoesApi.addShoes);
app.get('/api/shoes/create',shoesApi.createCart);
app.post("/api/shoes/addToCart",shoesApi.addToCart);
app.get('/api/shoes/cartItems/cart/:cart_code',shoesApi.getCartItems);
app.post("/api/shoes/pay",shoesApi.pay);
app.post("/api/shoes/removeItem",shoesApi.removeItem);
app.post("/api/shoes/history",shoesApi.pastOrders);
app.get("/api/shoes/showHistory/cart/:cart_code", shoesApi.getOrders);
app.get("/api/shoes/admin/:name", shoesApi.getPassword);
app.post("/api/shoes/update",shoesApi.updateStock);
app.get("/api/shoes/id/:shoesId/cart_code/:cart_code", shoesApi.getQuantity);


const PORT= process.env.PORT||3005;
app.listen(PORT,function(){
    console.log("App starting on port "+PORT);
});