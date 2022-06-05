const connections = {
  genteNormal: 'http://192.168.68.110:3000',
  fermin: 'http://192.168.0.8:3000',
  eze: 'http://192.168.0.4:3000',
  fer: 'http://192.168.68.54:3000',
  leo: 'http://192.168.0.140:3000'

}


const getConnection = (nombre) => {
  return connections[`${nombre}`];
}

export const BASE_URL = getConnection('eze');
