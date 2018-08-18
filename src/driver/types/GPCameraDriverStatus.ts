/**
 * Current implementation status of the camera driver.
 */
export enum GPCameraDriverStatus {
  GP_DRIVER_STATUS_PRODUCTION = 0 /**< Driver is production ready. */,
  GP_DRIVER_STATUS_TESTING = 1 /**< Driver is beta quality. */,
  GP_DRIVER_STATUS_EXPERIMENTAL = 2 /**< Driver is alpha quality and might even not work. */,
  GP_DRIVER_STATUS_DEPRECATED = 3 /**< Driver is no longer recommended to use and will be removed. */
}
