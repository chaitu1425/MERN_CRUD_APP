const { default: mongoose } = require("mongoose");
const enquiryModel = require("../../models/enquiry_model");

let enquiryInsert = (req, res) => {
  let { name, email, phone } = req.body;
  let enquirylist = new enquiryModel({
    name,
    email,
    phone,
  });
  enquirylist
    .save()
    .then(() => {
      res.send({ status: 1, message: "Data Inserted Successful" });
    })
    .catch((err) => {
      res.send({ status: 0, message: "Error in inserting", error: err });
    });
};

let enquiryList = async (req, res) => {
  let data = await enquiryModel.find();
  res.send({ status: 1, enquiry: data });
};

let enquiryDelete = async (req, res) => {
  try {
    let enid = req.params.id;
    let enquiry = await enquiryModel.deleteOne({ _id: enid });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Enquiry delete error: ${error}` });
  }
};

let enquirySingle = async (req, res) => {
  let enid = req.params.id;
  let enquiry = await enquiryModel.findOne({ _id: enid });
  res.send({ status: 1, enquiry });
};

let enquiryUpdate = async (req, res) => {
  let enqid = req.params.id;
  let { name, email, phone } = req.body;
  let updateobj = {
    name,
    email,
    phone,
  };

  let update = await enquiryModel.updateOne({ _id: enqid }, updateobj);
  res.send({ status: 1, message: "Successfully updated", update });
};

module.exports = { enquiryInsert, enquiryList, enquiryDelete, enquirySingle, enquiryUpdate };
