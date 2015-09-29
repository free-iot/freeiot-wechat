var should = require("should");
var api = require("../lib/pandocloud-api");
var aithinkerAPI = require("../lib/aithinker-api");

describe("getDeviceInfo", function() {
    it("should return valid device info", function(done) {
        api.getDeviceInfo("5c1e5c16cd8db7d20793a5a54782380887d035fe47c2fa03d7129e32b4abd278", function(err, data) {
            should.not.exist(err);
            should.exist(data);
            console.log(JSON.stringify(data));
            done();
        });
    });
});

describe("sendCommandToDevice", function() {
    it("should send a command to device", function(done) {
        api.sendCommandToDevice("64-65-a0ebc8", {switch: [0]}, function(err, data) {
            should.not.exist(err);
            console.log(JSON.stringify(data));
            done();
        });
    });
});


describe("getDeviceCurrentStatus", function() {
    it("should return valid device status", function(done) {
        api.getDeviceCurrentStatus("64-65-a0ebc8", function(err, data) {
            should.not.exist(err);
            should.exist(data);
            console.log(JSON.stringify(data));
            done();
        });
    });
});
