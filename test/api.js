var should = require("should");
var api = require("../lib/pandocloud-api");

var TEST_DEVICE = "0-e1-000163ee";

describe("getDeviceInfo", function() {
    it("should return valid device info", function(done) {
        api.getDeviceInfoByIdentifier(TEST_DEVICE, function(err, data) {
            should.not.exist(err);
            should.exist(data);
            console.log(JSON.stringify(err));
            console.log(JSON.stringify(data));
            done();
        });
    });
});

describe("sendCommandToDevice", function() {
    it("should send a command to device", function(done) {
        api.sendCommandToDevice(TEST_DEVICE, {switch: [0]}, function(err, data) {
            should.not.exist(err);
            console.log(JSON.stringify(data));
            done();
        });
    });
});


describe("getDeviceCurrentStatus", function() {
    it("should return valid device status", function(done) {
        api.getDeviceCurrentStatus(TEST_DEVICE, function(err, data) {
            should.not.exist(err);
            should.exist(data);
            console.log(JSON.stringify(data));
            done();
        });
    });
});
