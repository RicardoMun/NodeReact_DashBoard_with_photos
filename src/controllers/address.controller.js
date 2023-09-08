const express = require("express");
const router = express.Router();
const Address = require("../models/address.model");
const { default: mongoose } = require("mongoose");

const createAddress = async (req, res) => {
  const address = new Address({
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    nomenclature: req.body.nomenclature,
  });
  const savedAddress = await address.save();
  res.json(savedAddress);
};

// GET all addresses
const getAllAddress = async (req, res) => {
  const addresses = await Address.find();
  res.json(addresses);
};

// GET a specific address
const getAddressById = async (req, res) => {
  const address = await Address.findById(req.params.addressId);
  res.json(address);
};

// DELETE a specific address
const deletAddressById = async (req, res) => {
  const removedAddress = await Address.findByIdAndDelete({
    _id: req.params.addressId,
  });
  res.json(removedAddress);
};

// UPDATE a specific address
const updateAddressPatch = async (req, res) => {
  const updatedAddress = await Address.updateOne(
    { _id: req.params.addressId },
    {
      $set: {
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        nomenclature: req.body.nomenclature,
      },
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
};

// DELETE MANY
const deleteManyAddress = async (req, res) => {
    const { ids } = req.body;
    console.log(ids);
    try {
      const removedAddress = await Address.deleteMany({
        _id: { $in: ids.map(mongoose.Types.ObjectId)}
      });
      res.status(200).json(removedAddress);
    } catch (err) {
      res.status(500).json({ message: err });
    }
};

module.exports = {
  createAddress,
  getAllAddress,
  getAddressById,
  deletAddressById,
  updateAddressPatch,
  deleteManyAddress
};
