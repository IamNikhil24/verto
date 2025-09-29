const express = require("express")
const dotenv = require("dotenv").config()
const connectdb = require("./config/connectdb")
const authRoute = require("./routes/authRoutes")
const productRoute = require("./routes/productRoutes")
const app = express()

connectdb()
app.use(express.json())
const PORT = process.env.PORT || 9000

app.use("/api/v1", authRoute)
app.use("/api/v1/products", productRoute);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})