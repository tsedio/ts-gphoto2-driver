/**
 * \brief The type of view on the specified file.
 *
 * Specifies the file of the current file, usually passed
 * to the gp_camera_file_get() and gp_camera_file_put()
 * functions. This is useful for multiple views of one
 * file, like that an single image file has "raw", "normal",
 * "exif" and "preview" views, or a media file has "normal"
 * and "metadata" file views.
 */
export enum GPCameraFileType {
  /**
   * A preview of an image.
   */
  GP_FILE_TYPE_PREVIEW = 0,
  /**
   * The regular normal data of a file.
   */
  GP_FILE_TYPE_NORMAL = 1,
  /**
   * The raw mode of a file, for instance the raw bayer data for cameras where postprocessing is done in the driver. The RAW files of modernDSLRs are GP_FILE_TYPE_NORMAL usually.
   */
  GP_FILE_TYPE_RAW = 2,
  /**
   * The audio view of a file. Perhaps an embedded comment or similar.
   */
  GP_FILE_TYPE_AUDIO = 3,
  /**
   * The embedded EXIF data of an image.
   */
  GP_FILE_TYPE_EXIF = 4,
  /**
   * The metadata of a file, like Metadata of files on MTP devices.
   */
  GP_FILE_TYPE_METADATA = 5
}
