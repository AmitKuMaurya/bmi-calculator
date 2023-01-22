const express = require("express")
const PORT = 7080;
const cors = require("cors")
// require("dotenv").config();
const {userController} = require("./routes/user.route")
const {connection} = require("./config/db")
const {authentication} = require("./middlewares/authentification");
const { bmiController } = require("./routes/bmi.route");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home page");
})

app.use(cors())

app.use("/user", userController)
app.use(authentication);
app.use("/data",bmiController);

app.listen(PORT, async () => {
    try{
        await connection;
        console.log({"msg" :"BMI calculator is Connected to DataBase"});
    }
    catch(err){
        console.log("Error connnecting to DB")
        console.log(err)
    }
    console.log(`listening on PORT ${PORT}`)
})