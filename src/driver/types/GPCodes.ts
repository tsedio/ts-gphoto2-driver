export enum GPCodes {
  /**
   * \brief Everything is OK
   *
   * Note that this is also the value 0, and every error is negative (lower).
   */
  GP_OK = 0,
  /**
   * \brief Generic Error
   */
  GP_ERROR = -1,
  /**
   * \brief Bad parameters passed
   */
  GP_ERROR_BAD_PARAMETERS = -2,
  /**
   * \brief Out of memory
   */
  GP_ERROR_NO_MEMORY = -3,
  /**
   * \brief Error in the camera driver
   */
  GP_ERROR_LIBRARY = -4,
  /**
   * \brief Unknown libgphoto2 port passed
   */
  GP_ERROR_UNKNOWN_PORT = -5,
  /**
   * \brief Functionality not supported
   */
  GP_ERROR_NOT_SUPPORTED = -6,
  /**
   * \brief Generic I/O error
   */
  GP_ERROR_IO = -7,
  /**
   * \brief Buffer overflow of internal structure
   */
  GP_ERROR_FIXED_LIMIT_EXCEEDED = -8,
  /**
   * \brief Operation timed out
   */
  GP_ERROR_TIMEOUT = -10,
  /**
   * \brief Serial ports not supported
   */
  GP_ERROR_IO_SUPPORTED_SERIAL = -20,
  /**
   * \brief USB ports not supported
   */
  GP_ERROR_IO_SUPPORTED_USB = -21,
  /**
   * \brief Error initialising I/O
   */
  GP_ERROR_IO_INIT = -31,
  /**
   * \brief I/O during read
   */
  GP_ERROR_IO_READ = -34,
  /**
   * \brief I/O during write
   */
  GP_ERROR_IO_WRITE = -35,
  /**
   * \brief I/O during update of settings
   */
  GP_ERROR_IO_UPDATE = -37,
  /**
   * \brief Specified serial speed not possible.
   */
  GP_ERROR_IO_SERIAL_SPEED = -41,
  /**
   * \brief Error during USB Clear HALT
   */
  GP_ERROR_IO_USB_CLEAR_HALT = -51,
  /**
   * \brief Error when trying to find USB device
   */
  GP_ERROR_IO_USB_FIND = -52,
  /**
   * \brief Error when trying to claim the USB device
   */
  GP_ERROR_IO_USB_CLAIM = -53,
  /**
   * \brief Error when trying to lock the device
   */
  GP_ERROR_IO_LOCK = -60,
  /**
   * \brief Unspecified error when talking to HAL
   */
  GP_ERROR_HAL = -70,
  /**
   * Corrupted data received
   *
   * Data is corrupt. This error is reported by camera drivers if corrupted
   * data has been received that can not be automatically handled. Normally,
   * drivers will do everything possible to automatically recover from this
   * error.
   *
   */
  GP_ERROR_CORRUPTED_DATA = -102,
  /**
   * File already exists
   *
   * An operation failed because a file existed. This error is reported for
   * example when the user tries to create a file that already exists.
   *
   */
  GP_ERROR_FILE_EXISTS = -103,
  /**
   * Specified camera model was not found
   *
   * The specified model could not be found. This error is reported when the
   * user specified a model that does not seem to be supported by any driver.
   *
   */
  GP_ERROR_MODEL_NOT_FOUND = -105,
  /**
   * Specified directory was not found
   *
   * The specified directory could not be found. This error is reported when
   * the user specified a directory that is non-existent.
   *
   */
  GP_ERROR_DIRECTORY_NOT_FOUND = -107,
  /**
   * Specified file was not found
   *
   * The specified file could not be found. This error is reported when the
   * user wants to access a file that is non-existent.
   *
   */
  GP_ERROR_FILE_NOT_FOUND = -108,
  /**
   * Specified directory already exists
   *
   * The specified directory already exists. This error is reported for
   * example when the user wants to create a directory that already exists.
   *
   */
  GP_ERROR_DIRECTORY_EXISTS = -109,
  /**
   * The camera is already busy
   *
   * Camera I/O or a command is in progress.
   *
   */
  GP_ERROR_CAMERA_BUSY = -110,
  /**
   * Path is not absolute
   *
   * The specified path is not absolute. This error is reported when the user
   * specifies paths that are not absolute, i.e. paths like
   * "path/to/directory". As a rule of thumb, in gphoto2, there is nothing
   * like relative paths.
   *
   */
  GP_ERROR_PATH_NOT_ABSOLUTE = -111,
  /**
   * Cancellation successful.
   *
   * A cancellation requestion by the frontend via progress callback and
   * GP_CONTEXT_FEEDBACK_CANCEL was successful and the transfer has been
   * aborted.
   */
  GP_ERROR_CANCEL = -112,
  /**
   * Unspecified camera error
   *
   * The camera reported some kind of error. This can be either a photographic
   * error, such as failure to autofocus, underexposure, or violating storage
   * permission, anything else that stops the camera from performing the
   * operation.
   */
  GP_ERROR_CAMERA_ERROR = -113,
  /**
   * Unspecified failure of the operating system
   *
   * There was some sort of OS error in communicating with the camera, e.g.
   * lack of permission for an operation.
   */
  GP_ERROR_OS_FAILURE = -114
}
