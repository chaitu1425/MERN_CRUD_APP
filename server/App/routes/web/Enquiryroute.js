let express = require("express");
const { enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate, enquirySingle } = require("../../controller/web/enquiryController");

let Enquiryroute = express.Router();


Enquiryroute.post('/insert',enquiryInsert)

Enquiryroute.get('/getdata',enquiryList)

Enquiryroute.delete('/delete/:id',enquiryDelete)


Enquiryroute.get('/single/:id',enquirySingle)

Enquiryroute.put('/update/:id',enquiryUpdate)   


module.exports = Enquiryroute;