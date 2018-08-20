import {ICloseable} from "../interfaces";

const garbage = new Map<ICloseable, ICloseable>();

export function addInstance(item: ICloseable) {
  garbage.set(item, item);
}

export function removeInstance(item: ICloseable) {
  if (garbage.has(item)) {
    garbage.delete(item);
  }
}

export function closeAll() {
  if (garbage.size) {
    if (process.env.NODE_ENV !== "production") {
      console.debug("Close " + garbage.size + " references unclosed");
    }
    garbage.forEach((item: ICloseable) => {
      item.close();
    });
  }
}

// do something when app is closing
process.on("exit", closeAll);

// catches ctrl+c event
process.on("SIGINT", closeAll);

// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", closeAll);
process.on("SIGUSR2", closeAll);
