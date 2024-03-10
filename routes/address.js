const express = require("express");
const router=express.Router({mergeParams:true});
const { isLoggedIn, wrapAsync, validateaddress } = require("../utils/middleware.js");
const AddressController=require("../controller/address.js");

//index route
router.route("/")
.get(isLoggedIn,wrapAsync(AddressController.index))

//new Address route
router.route("/new")
.get(isLoggedIn,wrapAsync(AddressController.newAddressForm))
.post(isLoggedIn, validateaddress , wrapAsync(AddressController.newAddress))

// edit Address routes
router.route("/:id/edit")
.get(isLoggedIn,wrapAsync(AddressController.updateAddessForm))
.put(isLoggedIn, validateaddress,wrapAsync(AddressController.updateAddess))

// delete Address routes
router.route("/:id/delete")
.get(isLoggedIn,wrapAsync(AddressController.destroyAddressForm))
.delete(isLoggedIn, wrapAsync(AddressController.destroyAddress))
module.exports=router;
