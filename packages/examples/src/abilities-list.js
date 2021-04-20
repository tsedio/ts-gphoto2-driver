const { AbilitiesList, PortInfoList, GPhoto2Driver, checkCode } = require('@tsed/gphoto2-driver');

const ref = require('ref');
const abilitiesList = new AbilitiesList();
const portList = new PortInfoList();

portList.load();
abilitiesList.load();

console.log('Nb Abilities =>', abilitiesList.size);

const list = abilitiesList.detect(portList);
const size = GPhoto2Driver.gp_list_count(list.pointer);

console.log('Camera list nb =>', size);

for (let i = 0; i < size; i++) {
  const name = ref.alloc('string');
  const value = ref.alloc('string');

  checkCode(GPhoto2Driver.gp_list_get_name(list.pointer, i, name));
  checkCode(GPhoto2Driver.gp_list_get_value(list.pointer, i, value));

  console.log('path=>', name.deref());
  console.log('value=>', value.deref());
}

abilitiesList.close();
portList.close();
