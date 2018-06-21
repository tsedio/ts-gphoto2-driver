var ref = require("ref");
var gphoto = require("../gphoto2");
var assert = require("assert");
var util = require('util');
var get_config = require("../get_config");

var context = gphoto.gp_context_new();
var cameraList = gphoto.NewList();

var GP_OK = gphoto.GP_OK;

function assert_ok(returnValue) {
    assert.equal(returnValue, gphoto.GP_OK);
}

var LOG_EVERYTHING = true;

function debug_log(str) {
    if (LOG_EVERYTHING)
        console.log(str);
}

assert(gphoto.gp_camera_autodetect(cameraList, context) >= 0);

var count = gphoto.gp_list_count(cameraList);
if (count == 0) {
    console.error("No camera detected");
    return;
}
else if (LOG_EVERYTHING) {
    console.log("RefCamera(s) detected (" + count + "):");
    for (var i = 0; i < count; ++i) {
        var name, value;
        [name, value] = gphoto.GetListEntry(cameraList, i);
        console.log("- '" + name + "' -> " + value);
    }
}
gphoto.gp_list_unref(cameraList);

var camera = gphoto.NewInitCamera(context);

var config = gphoto.GetConfig(camera, context);
var tree = get_config.getWidgetTree(config);
debug_log(util.inspect(tree, {showHidden: false, depth: null}));
gphoto.gp_widget_unref(config);

get_config.setCameraSetting(camera, "iso", "400", context);


gphoto.gp_camera_unref(camera);
