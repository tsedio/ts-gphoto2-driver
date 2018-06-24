import {
  GPAbilitiesListModuleDescription,
  GPCameraModuleDescription,
  GPContextModuleDescription,
  GPFileModuleDescription,
  GPListModuleDescription,
  GPPortInfoModuleDescription,
  GPWidgetModuleDescription,
  IGPAbilitiesListModule,
  IGPCameraModule,
  IGPContextModule,
  IGPFileModule,
  IGPListModule,
  IGPPortInfoModule,
  IGPWidgetModule
} from "./modules";

const ffi = require("ffi-napi");
/**
 *
 */
export type GPhoto2Driver = IGPContextModule &
  IGPListModule &
  IGPCameraModule &
  IGPWidgetModule &
  IGPFileModule &
  IGPAbilitiesListModule &
  IGPPortInfoModule;

// tslint:disable-next-line: variable-name
export const GPhoto2Driver = ffi.Library("libgphoto2", {
  // CONTEXT
  ...GPContextModuleDescription,

  // PORT INFO
  ...GPPortInfoModuleDescription,

  // LIST
  ...GPListModuleDescription,

  // ABILITIES
  ...GPAbilitiesListModuleDescription,

  // Camera
  ...GPCameraModuleDescription,

  // File
  ...GPFileModuleDescription,

  // Widget
  ...GPWidgetModuleDescription
});
