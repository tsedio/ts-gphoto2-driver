/**
 * A bitmask of image related operations of the device.
 */
export enum GPCameraFileOperation {
  GP_FILE_OPERATION_NONE = 0 /**< No special file operations, just download. */,
  GP_FILE_OPERATION_DELETE = 1 << 1 /**< Deletion of files is possible. */,
  GP_FILE_OPERATION_PREVIEW = 1 << 3 /**< Previewing viewfinder content is possible. */,
  GP_FILE_OPERATION_RAW = 1 << 4 /**< Raw retrieval is possible (used by non-JPEG cameras) */,
  GP_FILE_OPERATION_AUDIO = 1 << 5 /**< Audio retrieval is possible. */,
  GP_FILE_OPERATION_EXIF = 1 << 6 /**< EXIF retrieval is possible. */
}
