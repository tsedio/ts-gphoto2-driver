var ref = require("ref");
var assert = require("assert");

var gp2 = Object.assign(
    {},
    require("./gphoto2_ffi"),
    require("./functions"),
    require("./constants")
);

var GPhotoError = Error;


function addWidgetToTree(tree, widget) {
    // Code modeled after `display_widgets` in gphoto2/actions.c
    var namePtr = ref.alloc("string");
    var labelPtr = ref.alloc("string");
    gp2.gp_widget_get_label(widget, labelPtr); // TODO - check return val
    gp2.gp_widget_get_name(widget, namePtr);
    var name = namePtr.deref();
    var label = labelPtr.deref();

    var subtree = getWidgetValue(widget);

    var n = gp2.gp_widget_count_children(widget);
    for (var i = 0; i < n; ++i) {
        var childWidgetPtr = ref.alloc(gp2.CameraWidget);
        gp2.gp_widget_get_child(widget, i, childWidgetPtr);
        // TODO - exception
        addWidgetToTree(subtree, childWidgetPtr.deref());
    }

    tree[name || label] = subtree;
}
module.exports.addWidgetToTree = addWidgetToTree;


var widgetTypeNames = {
    [gp2.GP_WIDGET_TEXT]:       "string",
    [gp2.GP_WIDGET_RANGE]:      "range",
    [gp2.GP_WIDGET_TOGGLE]:     "toggle",
    [gp2.GP_WIDGET_DATE]:       "date",
    [gp2.GP_WIDGET_MENU]:       "choice",
    [gp2.GP_WIDGET_RADIO]:      "choice",
    [gp2.GP_WIDGET_WINDOW]:     "window",
    [gp2.GP_WIDGET_SECTION]:    "section",
    [gp2.GP_WIDGET_BUTTON]:     "button"
};

function getWidgetValue(widget) {
    var labelPtr = ref.alloc("string");
    var typePtr = ref.alloc("int");
    var ret = gp2.GP_OK;
    value = Object();

    gp2.gp_widget_get_type(widget, typePtr);    // TODO - check return val
    gp2.gp_widget_get_label(widget, labelPtr);

    value.label = labelPtr.deref();
    value.type = widgetTypeNames[typePtr.deref()];

    switch (typePtr.deref()) {
        case gp2.GP_WIDGET_TEXT: { /* string */
            var txtPtr = ref.alloc("string");
            ret = gp2.gp_widget_get_value(widget, txtPtr);
            if (ret == gp2.GP_OK)
                value.value = txtPtr.deref();
            break;
        }

        case gp2.GP_WIDGET_RANGE: { /* float */
            var valuePtr = ref.alloc("float");
            var maxPtr = ref.alloc("float");
            var minPtr = ref.alloc("float");
            var stepPtr = ref.alloc("float");

            ret = gp2.gp_widget_get_range(widget, minPtr, maxPtr, stepPtr);
            if (ret == gp2.GP_OK) {
                ret = gp2.gp_widget_get_value(widget, valuePtr);
            }
            if (ret == gp2.GP_OK) {
                value = {
                    label: value.label,
                    type: "range",
                    value: valuePtr.deref(),
                    max: maxPtr.deref(),
                    min: minPtr.deref(),
                    step: stepPtr.deref()
                };
            }
            break;
        }

        case gp2.GP_WIDGET_TOGGLE: { /* int */
            var valuePtr = ref.alloc("int");
            ret = gp2.gp_widget_get_value(widget, valuePtr);
            if (ret == gp2.GP_OK) {
                value.value = valuePtr.deref();
            }
            break;
        }

        case gp2.GP_WIDGET_DATE: {
            var valuePtr = ref.alloc("int");
            ret = gp2.gp_widget_get_value(widget, valuePtr);
            if (ret == gp2.GP_OK) {
                value.value = Date(valuePtr.deref() * 1000.0);
            }
            break;
        }

        case gp2.GP_WIDGET_MENU:
        case gp2.GP_WIDGET_RADIO: { /* string */
            var currentChoicePtr = ref.alloc("string");
            var choicesCount = gp2.gp_widget_count_choices(widget);

            ret = gp2.gp_widget_get_value(widget, currentChoicePtr);
            if (ret != gp2.GP_OK) {
                break;
            }
            choices = [];
            for (var i = 0; i < choicesCount; ++i) {
                var choicePtr = ref.alloc("string");
                gp2.gp_widget_get_choice(widget, i, choicePtr);
                // TODO - check for errors?
                choices.push(choicePtr.deref());
            }
            value.value = currentChoicePtr.deref();
            value.choices = choices;
            break;
        }

        /* ignore: */
        case gp2.GP_WIDGET_WINDOW:
        case gp2.GP_WIDGET_SECTION:
        case gp2.GP_WIDGET_BUTTON: {
            break;
        }

        default: {
            throw new GPhotoError(
                "Retrieved type of widget " + value.label + " is invalid"
            );
        }
    }

    if (ret != gp2.GP_OK) {
        throw new GPhotoError(
            "Failed to retrieve value of " + value.type
            + " widget " + value.label
        );
    }

    return value;
}
module.exports.getWidgetValue = getWidgetValue;


function getWidgetTree(widget) {
    tree = Object();
    addWidgetToTree(tree, widget);
    return tree;
}
module.exports.getWidgetTree = getWidgetTree;


function assert_ok(returnValue) {
    assert.equal(returnValue, gp2.GP_OK);
}

function setWidgetValue(widget, value) {
    var roPtr = ref.alloc("int");
    assert_ok(gp2.gp_widget_get_readonly(widget, roPtr));
    assert(!roPtr.deref());

    var typePtr = ref.alloc("int");
    assert_ok(gp2.gp_widget_get_type(widget, typePtr));
    var widgetType = typePtr.deref();

    var stringWidgets = [
        gp2.GP_WIDGET_MENU, gp2.GP_WIDGET_TEXT, gp2.GP_WIDGET_RADIO
    ];
    var floatWidgets = [
        gp2.GP_WIDGET_RANGE
    ];
    var intWidgets = [
        gp2.GP_WIDGET_DATE, gp2.GP_WIDGET_TOGGLE
    ];

    if (stringWidgets.includes(widgetType)) {
        assert_ok(gp2.gp_widget_set_value(widget, ref.allocCString(value)));
    }
    else if (floatWidgets.includes(widgetType)) {
        assert_ok(gp2.gp_widget_set_value(widget, ref.alloc("int", value)));
    }
    else if (intWidgets.includes(widgetType)) {
        assert_ok(
            gp2.gp_widget_set_value(widget, ref.alloc("float", value))
        );
    }
    else {
        typeName = widgetTypeNames[typePtr.deref()] || "<unknown type>";
        throw new GPhotoError(
            "Cannot change value of given " + typeName + " widget"
        );
    }
}
module.exports.setWidgetValue = setWidgetValue;


function setCameraSetting(camera, key, value, context) {
    var widget = gp2.GetConfig(camera, context, key);

    setWidgetValue(widget, value);

    assert_ok(gp2.gp_camera_set_single_config(
        camera, key, widget, context
    ));
    gp2.gp_widget_unref(widget);
}
module.exports.setCameraSetting = setCameraSetting;
