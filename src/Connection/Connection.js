const env = 'qa';
//const env = "dev";
// const env = 'prod';
const mpay = 'https://walletws.banconal.com.pa:8443/bnpswitch2v3/onboarding/verification'
const prod = {
  REACT_DOMAIN_BACK: "https://newtechapp.net/api/request/bnp",
  mpay
};
const dev = {
  REACT_DOMAIN_BACK: "https://test.developerpa.com/api/request/bnp",
  mpay
};
const qa = {
  REACT_DOMAIN_BACK: "https://app.developerpa.com/api/request",
  // REACT_DOMAIN_BACK: "https://app.developerpa.com/api/request/bnp",
  mpay
};

let api = "";
if (env === "prod") api = prod;
if (env === "dev") api = dev;
if (env === "qa") api = qa;

module.exports = { api };

//https://newtechapp.net/
// servidor para QA https://app.developerpa.com

// /BEN/selfie?requestId=94b9e5ad-7c0d-4a07-97b1-a1aaadab172d&returnUrl=https://onboardingbnp.mpaycenter.com/onboarding/verification&phone=02504004&email=prueba666@gmail.com

/* const prod = {
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
  REACT_DOMAIN_BACK: 'https://app3.developerpa.com/request/bnp'
}; */

/* const api = env === 'prod' ? prod : dev; */
