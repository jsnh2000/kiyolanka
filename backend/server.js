const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error) => {
    if (error) {
        console.log("Database error:", error.message);
    }
});

mongoose.connection.once('open', () => {
    console.log('Database synced');
});

const employeeRouter = require("./routes/employees.js");
const machineRouter = require("./routes/machine.js");
const productRouter = require("./routes/product.js");
const salaryRouter = require("./routes/salary.js");

app.use("/employee", employeeRouter);
app.use("/machine", machineRouter);
app.use("/product", productRouter);
app.use("/salary", salaryRouter);

app.route('/').get((req, res) => {
    res.send('FactoryManagement System API');
});

app.listen(PORT, () => {
    console.log(`server is up and running on PORT ${PORT}`);
});