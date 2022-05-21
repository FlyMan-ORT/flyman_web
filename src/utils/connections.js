const connections = [
    'http://192.168.68.110:3000',
    'http://192.168.68.110:3000', 
    'http://192.168.68.110:3000', 
    'http://192.168.68.110:3000', 
    'http://192.168.0.8:3000', 
    'http://192.168.0.4:3000'
];

const getConnection = (index) => {
  return connections[index];
}

export const BASE_URL = getConnection(4);

