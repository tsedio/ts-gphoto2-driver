var ref = require("ref");
var gphoto = require("../gphoto2");
var assert = require("assert");

var context = gphoto.gp_context_new();

var list = gphoto.NewList();
assert(!ref.isNull(list));
assert.equal(gphoto.gp_list_count(list), 0);

assert.equal(gphoto.gp_list_append(list, "Name0", "Value0"), gphoto.GP_OK);
assert.equal(gphoto.gp_list_count(list), 1);

assert.equal(gphoto.gp_list_reset(list), gphoto.GP_OK);
assert.equal(gphoto.gp_list_count(list), 0);

assert.equal(gphoto.gp_list_append(list, "Name0", "Value1"), gphoto.GP_OK);
assert.equal(gphoto.gp_list_append(list, "Name1", "Value1"), gphoto.GP_OK);
assert.equal(gphoto.gp_list_append(list, "Name1", "Value0"), gphoto.GP_OK);
assert.equal(gphoto.gp_list_append(list, "Name2", "Value0"), gphoto.GP_OK);
assert.equal(gphoto.gp_list_append(list, "Name0", "Value0"), gphoto.GP_OK);
count = gphoto.gp_list_count(list);
assert.equal(count, 5);

assert.equal(gphoto.gp_list_sort(list), gphoto.GP_OK);
assert.equal(gphoto.gp_list_count(list), count);

var foundId = ref.alloc("int");
assert.equal(gphoto.gp_list_find_by_name(list, foundId, "Name0"), gphoto.GP_OK);
assert.equal(foundId.deref(), 1);
assert.equal(gphoto.gp_list_find_by_name(list, foundId, "Name1"), gphoto.GP_OK);
assert.equal(foundId.deref(), 3);
assert.equal(gphoto.gp_list_find_by_name(list, foundId, "Name2"), gphoto.GP_OK);
assert.equal(foundId.deref(), 4);
assert.equal(
    gphoto.gp_list_find_by_name(list, foundId, "WrongName"),
    gphoto.GP_ERROR
);

var name = ref.alloc("string");
var value = ref.alloc("string");
assert.equal(gphoto.gp_list_set_name(list, 0, "NewName"), gphoto.GP_OK);
assert.equal(gphoto.gp_list_set_value(list, 0, "NewValue"), gphoto.GP_OK);
assert.equal(gphoto.gp_list_get_name(list, 0, name), gphoto.GP_OK);
assert.equal(gphoto.gp_list_get_value(list, 0, value), gphoto.GP_OK);
assert.equal(name.deref(), "NewName");
assert.equal(value.deref(), "NewValue");

//int 	gp_list_populate (RefCameraList *list, const char *format, int count)

gphoto.gp_list_unref(list);

gphoto.gp_context_unref(context);
