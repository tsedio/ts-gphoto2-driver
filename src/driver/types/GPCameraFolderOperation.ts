/**
 * A bitmask of filesystem related operations of the device.
 */
export enum GPCameraFolderOperation {
  GP_FOLDER_OPERATION_NONE = 0 /**< No special filesystem operation. */,
  GP_FOLDER_OPERATION_DELETE_ALL = 1 << 0 /**< Deletion of all files on the device. */,
  GP_FOLDER_OPERATION_PUT_FILE = 1 << 1 /**< Upload of files to the device possible. */,
  GP_FOLDER_OPERATION_MAKE_DIR = 1 << 2 /**< Making directories on the device possible. */,
  GP_FOLDER_OPERATION_REMOVE_DIR = 1 << 3 /**< Removing directories from the device possible. */
}
