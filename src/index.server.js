const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRouters = require("./routes/admin/auth");
const intialData = require("./routes/admin/intialData");
const userRouters = require("./routes/user/auth");
const categoryRouter=require("./routes/category");
const productRouter=require("./routes/product");
const cartRouter=require("./routes/cart");
const pageRouter=require("./routes/page");
const addressRouter=require("./routes/address");
const orderRouter=require("./routes/order");
const adminOrdersRouter=require("./routes/admin/order");
const app = express();
const path=require('path');
const cors=require('cors');
env.config();
const port = process.env.PORT;

mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.jtznj.mongodb.net/mydb?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify:true }
  )
  .then(() => console.log("Database is connected"));

//middlewares
app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/public',express.static(path.join(__dirname+'/uploads')));
app.use("/api", adminRouters);
app.use("/api",intialData);
app.use("/api", userRouters);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/api", pageRouter);
app.use("/api", addressRouter);
app.use("/api", orderRouter);
app.use("/api", adminOrdersRouter);
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
