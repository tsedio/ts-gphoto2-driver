const { PortInfoList } = require('@typedproject/gphoto2-driver');

const portList = new PortInfoList();

portList.load();

console.log('Nb port =>', portList.size);

portList.toArray().forEach((port, index) => {
  console.log(`[Port.${index}] name =>`, port.name);
  console.log(`[Port.${index}] path =>`, port.path);
});

portList.close();
