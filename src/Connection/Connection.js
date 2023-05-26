const env = 'dev';

const prod = {
  domainServer: 'https://newtechapp.net',
  domainPython: 'https://newtechapp.net',
  bucket: 'bucket-getapp-t',
  mpay: 'https://walletws.banconal.com.pa:8443/bnpswitch2v3/onboarding/verification',
};
const dev = {
  domainServer: 'https://app.developerpa.com', // https://app.developerpa.co estos dos dominios apuntan a la misma BD
  domainPython: 'https://app.developerpa.com',
  bucket: 'bucket-getapp-t',
  mpay: 'https://onboardingbnp.mpaycenter.com/onboarding/verification',
};

// servidor para QA https://app.developerpa.com
const api = env === 'dev' ? dev : dev;

module.exports = { api };
