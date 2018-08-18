/**
 * Type of the device represented. Currently we have Still Cameras
 * and MTP Audio Players.
 */
export enum GPDeviceType {
  GP_DEVICE_STILL_CAMERA = 0 /**< Traditional still camera */,
  GP_DEVICE_AUDIO_PLAYER = 1 << 0 /**< Audio player */
}
