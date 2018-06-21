var ref = require("ref");
var gphoto = require("../gphoto2");
var assert = require("assert");

assert.equal(
    gphoto.gp_port_result_as_string(gphoto.GP_OK),
    "No error"
);

assert.equal(
    gphoto.gp_port_result_as_string(gphoto.GP_ERROR),
    "Unspecified error"
);
