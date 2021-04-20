/**
 * \brief The gphoto port type.
 *
 * Enumeration specifying the port type.
 * The enum is providing bitmasks, but most code uses it as
 * just the one specific values.
 */
export enum GPPortType {
  GP_PORT_NONE = 0 /**< \brief No specific type associated. */,
  GP_PORT_SERIAL = 1 << 0 /**< \brief Serial port. */,
  GP_PORT_USB = 1 << 2 /**< \brief USB port. */,
  GP_PORT_DISK = 1 << 3 /**< \brief Disk / local mountpoint port. */,
  GP_PORT_PTPIP = 1 << 4 /**< \brief PTP/IP port. */,
  GP_PORT_USB_DISK_DIRECT = 1 << 5 /**< \brief Direct IO to an usb mass storage device. */,
  GP_PORT_USB_SCSI = 1 << 6 /**< \brief USB Mass Storage raw SCSI port. */
}
