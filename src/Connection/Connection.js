const env = 'dev';

const prod = {
  domainServer: 'https://newtechapp.net',
  domainPython: 'https://newtechapp.net',
  bucket: 'buckface',
  mpay: 'https://walletws.banconal.com.pa:8443/bnpswitch2v3/onboarding/verification',//desarrollo
};
const dev = {
  domainServer: 'https://newtech.com.pa', // https://app.developerpa.co estos dos dominios apuntan a la misma BD
  domainPython: `https://app.developerpa.com`,
  bucket: 'myawsbucketface',
  mpay: 'https://walletws.banconal.com.pa:8443/bnpswitch2v3/onboarding/verification',
};

// servidor para QA https://app.developerpa.com
const api = env === 'prod' ? prod : dev;

module.exports = { api };


//https://newtechapp.net/


// /BEN/selfie?requestId=e729cc41-500e-41a2-8750-53b445801a94&returnUrl=https://onboardingbnp.mpaycenter.com/onboarding/verification&phone=61503002