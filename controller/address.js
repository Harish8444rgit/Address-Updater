const Address=require("../model/address");
const User=require("../model/user");


module.exports.index =async (req, res) => {
    const { userid } = req.params;
    const user = await User.findById(userid).populate("addresses");
    const addresses = user.addresses;
    res.render("pages/index.ejs", { addresses });
  };

  module.exports.newAddressForm=async (req, res) => {
    res.render("pages/new.ejs");
  };

  module.exports.newAddress=async (req, res) => {
    const { userid } = req.params;

     // handle potential duplicate entries
    const { street, city, state, country, zipCode } = req.body.address;
    let existingAddress = await Address.findOne({
      $and: [{ street }, { city }, { state }, { zipCode }, { country }],
    });
    if (existingAddress) {
      req.flash("error", "Address already exists");
      return res.redirect(`/users/${req.params.userid}/addresses/new`);
    }

    //Adding new address 
    const newAddress = new Address(req.body.address);
    const savedAddress = await newAddress.save();
    const newAddressId = savedAddress._id;
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { addresses: newAddressId } },
      { new: true }
    );
    req.flash("success", "New Address Created");
    res.redirect(`/users/${userid}/addresses`);
  };

  
  module.exports.updateAddessForm=async (req, res) => {
    let { id } = req.params;
    let address = await Address.findById(id);
    if (!address) {
      req.flash("error", "The address you requested to edit does not exist!");
      const userId = req.user._id;
      res.redirect(`users/${userId}/addresses`);
    }
    res.render("pages/edit.ejs", { address });
  };

  module.exports.updateAddess=async (req, res) => {
    const { userid, id } = req.params;
     // handle potential duplicate entries
    const { street, city, state, country, zipCode } = req.body.address;
    let existingAddress = await Address.findOne({
      $and: [{ street }, { city }, { state }, { zipCode }, { country }],
    });

    if (existingAddress) {
      req.flash("error", "Address already exists");
      return res.redirect(`/users/${req.params.userid}/addresses`);
    }
    //update
    const updatedAddress = req.body.address;
    await Address.findByIdAndUpdate(id, updatedAddress, { new: true });
    req.flash("success", "Address updated successfully");
    res.redirect(`/users/${userid}/addresses`);
  };

  module.exports.destroyAddressForm=async (req, res) => {
    const { id } = req.params;
    const address = await Address.findById(id);
    res.render("pages/delete.ejs", { address });
  };

  module.exports.destroyAddress=async (req, res) => {
    const { userid, id } = req.params;
    //handle potential data dependencies
    await Address.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userid, { $pull: { addresses: id } });
    req.flash("success", "Address deleted successfully");
    res.redirect(`/users/${userid}/addresses`);
  };