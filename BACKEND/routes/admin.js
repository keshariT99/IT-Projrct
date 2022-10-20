const router = require("express").Router();
const { response } = require("express");
const adminpackages = require("../Models/Admin");
let AdminPackage = require("../Models/Admin");


http://localhost:8060/adminpackage//add
router.route("/add").post((req,res)=>{
    //create variables
    const package_id = req.body.package_id;
    const package_type = req.body.package_type;
    const package_name = req.body.package_name;
    const day_range = req.body.day_range;
    const price_range = req.body.price_range;
    const other_details = req.body.other_details;
    

    const newPack = new AdminPackage({
        //initiolize that properties
        package_id,
        package_type,
        package_name,
        day_range,
        price_range,
        other_details,
        
    })
    //insert js objects to DB
    newPack.save().then(() => {       //js promis (same if else)
        res.json("Package Added")  // that msg sent as a response, to front end, json format
    }).catch((err) =>{
        console.log(err);
    })         
})

//retrive
http://localhost:8060/package



router.get("/packs" , (req,res)=>{
    AdminPackage.find().exec((err,Admin) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPack:Admin
        });
    });
});


//single data

router.get("/pack/:id", (req, res) =>{
    let ptId = req.params.id;

    AdminPackage.findById(ptId,(err,Admin)=>{

        if(err){
            return res.status(400).json({success:false, err});


        }

        return res.status(200).json({
            success:true,
            Admin
        })
    });

})





// Delete
router.route("/pack/delete/:id").delete(async(req,res) => {
    let pId = req.params.id;

    await AdminPackage.findByIdAndDelete(pId).then(()=> {
        res.status(200).send({status:"Package deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status:"Error with delete package",error: err.message});
    })
})







module.exports = router;


