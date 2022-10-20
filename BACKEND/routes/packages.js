const router = require("express").Router(); //import package
const { response } = require("express");
const packages = require("../Models/package"); //use
let Package = require("../Models/package");//use n import model file


http://localhost:8060/package//addPackage
router.route("/addPackage").post((req,res)=>{ //post - http request method
                                   //js arrow function
    //create variables
    const package_id = req.body.package_id;      //get insert data add n send to databae to use this variables
    const package_type = req.body.package_type;
    const package_name = req.body.package_name;
    const day_range = req.body.day_range;            //send request in frontend to backend to save data in databas (as a request's body )
    const price_range = req.body.price_range;
    const other_details = req.body.other_details;
    //const images = req.body.images;
    

    const newPackage = new Package({
        //initiolize that properties
        package_id,
        package_type,
        package_name,
        day_range,
        price_range,
        other_details,
        images,
        
    })
    //insert js objects to DB
    newPackage.save().then(() => {       //js promis (same if else)
        res.json("Package Added")  // that msg sent as a response, to front end, json format
    }).catch((err) =>{
        console.log(err);
    })         
})

//retrive
http://localhost:8060/package

/*router.route("/allPackages").get((req,res)=>{  //get data in database

    //calling package model 
    Package.find().then((packages)=>{
        res.json(packages)
    }).catch((err)=>{
        console.log(err);
    })

})*/

router.get("/package" , (req,res)=>{
    Package.find().exec((err,package) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPackage:package
        });
    });
});


//get a single data
/*router.route("/get/:id").get(async(req, res) =>{
    let pId = req.params.id;
    await Package.findById(pId).then(()=>{
        res.status(200).send({status: "Package fetched",package:package})
    }).catch(() =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error: err.message});
    })
})*/

router.get("/package/:id", (req, res) =>{
    let ptId = req.params.id;

    Package.findById(ptId,(err,package)=>{

        if(err){
            return res.status(400).json({success:false, err});


        }

        return res.status(200).json({
            success:true,
            package
        })
    });

})


//update
http://localhost:8060/package/update/

/*router.route("/update/:id").put(async(req,res) => {
    //create variable to get id
    let pId = req.params.id;   //fetch the id (parameter)
    //destruture
    const {package_type,package_name,day_range,price_range,other_details} = req.body

    //create object to update
    const updatePackage = {
        package_type,
        package_name,
        day_range,
        price_range,
        other_details,
       
    }

    const update = await Package.findByIdAndUpdate(pId,updatePackage).then(() =>{      //waiting for the update (waiting for the promise)
        res.status(200).send({status: "Package updated"}) // update success
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error:err.message}); // update success
    }) 

    
})*/

router.put('/package/update/:id', (req, res)=>{

    Package.findByIdAndUpdate(
        req.params.id,{
            $set:req.body

        },
        (err, package)=>{
            if(err){
                return res.status(400).json({error:err});

            }
            return res.status(200).json({
                success:"updated succesfully"
            });
        }
    );
});


// Delete
router.route("/package/delete/:id").delete(async(req,res) => {
    let pId = req.params.id;

    await Package.findByIdAndDelete(pId).then(()=> {
        res.status(200).send({status:"Package deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status:"Error with delete package",error: err.message});
    })
})


//create PDF

router.post('/createpdfpack', (req, res) => {
    pdf.create(pdfTemplate3(req.body), {}).toFile('pdfpack.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

//get PDF

router.get('/fetchpdfpack', (req, res) => {
    res.sendFile('pdfpack.pdf', { root: `${__dirname}/../..` })
})


module.exports = router;


