/**
 * \brief Type of the capture to do.
 *
 * Specifies the type of capture the user wants to do with the
 * gp_camera_capture() function.
 */
export enum GPCameraCaptureType {
  GP_CAPTURE_IMAGE = 0 /**< \brief Capture an image. */,
  GP_CAPTURE_MOVIE = 1 /**< \brief Capture a movie. */,
  GP_CAPTURE_SOUND = 2 /**< \brief Capture audio. */
}
