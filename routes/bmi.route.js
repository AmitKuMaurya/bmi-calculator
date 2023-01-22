const {Router} = require("express");
const { BMIModel } = require("../models/bmi.model");
const { UserModel } = require("../models/User.model");

const bmiController = Router();

bmiController.get("/getProfile", async (req, res) => {
    const {userID} = req.body
    const user =await  UserModel.findOne({_id : userID})
    const {name, email} = user
    res.send({name, email})
})

bmiController.post("/calculateBMI", async (req, res) => {
     const {height, weight, userID} = req.body;

     const height_in_cms = Number(height)/100;
     const bmi = Number(weight)/Math.pow(height_in_cms,2);
     const BMI = parseFloat(bmi).toFixed(2);
     const new_bmi = new BMIModel({
        BMI,
        height : height_in_cms,
        weight,
        userID
     })
     await new_bmi.save()
     res.send({BMI})
})

bmiController.get("/getCalculation", async (req, res) => {
    const {userID} = req.body;
    const all_bmi = await BMIModel.find({userID : userID})
    res.send({all_bmi_of_user : all_bmi});
})

module.exports ={
    bmiController
}