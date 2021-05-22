import {classOf, nameOf} from "@tsed/core";
import {$log} from "@tsed/logger";

export interface Closeable {
  close(): this;
}

/**
 *
 * @param {Closeable} c
 */
export function closeQuietly(c: Closeable) {
  try {
    c.close();
  } catch (er) {
    $log.warn(`Failed to close Closeable ${nameOf(classOf(c))}:`, er.message);
  }
}
