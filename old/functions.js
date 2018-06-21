var ref = require('ref');
var assert = require('assert');

var gp2 = require('./gphoto2_ffi');
var GP_OK = require('./constants').GP_OK;

var GPhotoError = Error;

function assert_ok(funcName, returnValue) {
  if (returnValue != GP_OK) {
    var errorStr = gp2.gp_port_result_as_string(returnValue);
    throw Error(funcName + ' returned ' + returnValue + ': ' + errorStr);
  }
}


function NewList() {
  var listPtr = ref.alloc(gp2.CameraList);
  assert_ok('gp_list_new', gp2.gp_list_new(listPtr));
  return listPtr.deref();
}

module.exports.NewList = NewList;


function GetListEntry(cameraList, i) {
  var name = ref.alloc('string');
  var value = ref.alloc('string');
  // TODO - return cleaner exception
  assert_ok('gp_list_get_name', gp2.gp_list_get_name(cameraList, i, name));
  assert_ok('gp_list_get_value', gp2.gp_list_get_value(cameraList, i, value));
  return [name.deref(), value.deref()];
}

module.exports.GetListEntry = GetListEntry;


function NewCamera() {
  var cameraPtr = ref.alloc(gp2.Camera);
  assert_ok('gp_camera_new', gp2.gp_camera_new(cameraPtr));
  return cameraPtr.deref();
}

module.exports.NewCamera = NewCamera;


// TODO - Init RefCamera with parameters
function NewInitCamera(context) {
  var cameraPtr = ref.alloc(gp2.Camera);
  assert_ok('gp_camera_new', gp2.gp_camera_new(cameraPtr));
  assert_ok('gp_camera_init', gp2.gp_camera_init(cameraPtr.deref(), context));
  return cameraPtr.deref();
}

module.exports.NewInitCamera = NewInitCamera;


function GetConfig(camera, context, name) {
  var configPtr = ref.alloc(gp2.CameraWidget);
  if (name === undefined) {
    assert_ok('gp_camera_get_config', gp2.gp_camera_get_config(
      camera, configPtr, context
    ));
  }
  else {
    assert_ok(
      'gp_camera_get_single_config',
      gp2.gp_camera_get_single_config(camera, name, configPtr, context)
    );
  }
  return configPtr.deref();
}

module.exports.GetConfig = GetConfig;
