// var ip="http://157.230.234.43"
// var ip="http://newtechapp.net"
// "start": "set HTTPS=true&&set SSL_CRT_FILE=cert.pem&&set SSL_KEY_FILE=key.pem&& react-scripts start",

const env = 'dev'; // flag para indicar el tipo de ambiente a donde se desplegara

const domainServer = 'https://newtechapp.net';
const domainPython = env === 'prod' ? 'https://newtechapp.net' : `https://newtech.com.pa`;
module.exports = {
  domainServer,
  domainPython,
};
