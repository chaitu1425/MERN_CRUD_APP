let express = require("express")
let mongoose = require("mongoose");
const Enquiryroute = require("./App/routes/web/Enquiryroute");
require("dotenv").config();
let cors = require("cors")
let app=express();
app.use(cors())
app.use(express.json());

app.use('/api/enquiry',Enquiryroute)


mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected Success");
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`server listening in ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log(err);
})