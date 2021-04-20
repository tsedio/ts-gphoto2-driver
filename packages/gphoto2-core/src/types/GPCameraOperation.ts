/**
 * A bitmask of remote control related operations of the device.
 * Some drivers might support additional dynamic capabilities (like the PTP driver).
 */
export enum GPCameraOperation {
  GP_OPERATION_NONE = 0 /**< No remote control operation supported. */,
  GP_OPERATION_CAPTURE_IMAGE = 1 << 0 /**< Capturing images supported. */,
  GP_OPERATION_CAPTURE_VIDEO = 1 << 1 /**< Capturing videos supported. */,
  GP_OPERATION_CAPTURE_AUDIO = 1 << 2 /**< Capturing audio supported. */,
  GP_OPERATION_CAPTURE_PREVIEW = 1 << 3 /**< Capturing image previews supported. */,
  GP_OPERATION_CONFIG = 1 << 4 /**< Camera and Driver configuration supported. */,
  GP_OPERATION_TRIGGER_CAPTURE = 1 << 5 /**< Camera can trigger capture and wait for events. */
}
