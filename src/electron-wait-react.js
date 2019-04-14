// https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c

const net = require('net');
const { exec } = require('child_process');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
  client.end();
  if(!startedElectron) {
    console.log('starting electron');
    startedElectron = true;
    exec('npm run electron');
  }
});

tryConnection();

client.on('error', (error) => {
  setTimeout(tryConnection, 1000);
});
