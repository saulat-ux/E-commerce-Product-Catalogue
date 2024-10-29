const dotenv = require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("home page..");
});

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((error) => console.error("Unable to connect to the database:", error));

// Connect to PostgreSQL using Sequelize
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
