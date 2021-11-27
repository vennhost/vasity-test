const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const endpoints = require("express-list-endpoints");
const port = 5555;
const productRouter = require("./routes/product");
const variantRouter = require("./routes/variant"); 

const sequelize = require("./config/config");
 const { applyExtraSetup } = require("./src/utils/extra-setup"); 
const db = require("./models")
db.sequelize.sync()

app.use(express.static(__dirname + "/public"));

var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"],
};

app.use(express.json());
app.use(cors(corsOption));


app.use("/products", productRouter);
app.use("/variant", variantRouter);
 


applyExtraSetup(db.sequelize); 

console.log(endpoints(app));

app.listen(process.env.PORT, () => {
  console.log(`server is listening at http://localhost:${process.env.PORT}`),
    sequelize.authenticate().then(
      () => {
        console.log("DB Connected");
      },
      (err) => console.log("Error in connection", err)
    );
});
