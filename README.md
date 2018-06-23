
# ts-gphoto2-driver

```typescript
import  {Camera, CameraList} from require('ts-gphoto2-driver');

new CameraList().toString(); //

// new Camera()

```




const gp2 = require("gphoto2_ffi");

var context = gp2.gp_context_new();
var camera = gp2.NewInitCamera(context);

var config = gp2.GetConfig(camera, context, name);
var tree = gp2.getWidgetTree(config);
console.log(name + ":");
console.log(util.inspect(tree[name], {showHidden: false, depth: null}));

gp2.gp_widget_unref(config);
gp2.gp_camera_exit(camera, context);
gp2.gp_camera_unref(camera);
gp2.gp_context_unref(context);