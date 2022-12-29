var Funder = artifacts.require("Funder");
module.exports = function (deployer, network, accounts) {
deployer.then(async () => {
await deployer.deploy(Funder, accounts[1], accounts[2], 10, {from:
accounts[0]})
});
};