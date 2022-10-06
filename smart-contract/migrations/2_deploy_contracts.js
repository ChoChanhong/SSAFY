const Confirmation = artifacts.require("Confirmation");
// const PreScription = artifacts.require("PreScription");

module.exports = function(deployer) {
    deployer.deploy(Confirmation);
    // deployer.deploy(PreScription);
};




