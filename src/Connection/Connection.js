const env = 'dev';

const prod = {
  domainServer: 'https://newtechapp.net',
  domainPython: 'https://newtechapp.net',
  bucket: 'onboarding-repo',
  mpay: 'https://walletws.banconal.com.pa:8443/bnpswitch2v3/onboarding/verification',
};
const dev = {
  domainServer: 'https://app.developerpa.com', // https://app.developerpa.co estos dos dominios apuntan a la misma BD
  domainPython: 'https://app.developerpa.com',
  bucket: 'onboarding-repo',
  mpay: 'https://onboardingbnp.mpaycenter.com/onboarding/verification',
};

// servidor para QA https://app.developerpa.com
const api = env === 'dev' ? dev : dev;

module.exports = { api };
