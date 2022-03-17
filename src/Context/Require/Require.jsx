import React from 'react';

export const RequireContext = React.createContext(); // primero creamos el contexto

export const RequireProvider = (props) => {
  // luego creamos el provider
  const [require, setRequire] = React.useState({
    channel: '',
    platform: '',
    name: '',
    lastName: '',
    identificationDocument: '',
    issued: '', // expedida
    expires: '', // expira
    dateOfBirth: '', // fecha de nacimiento
    nationality: '',
    placeOfBirth: '', // lugar de nacimiento
    gender: '', // genero
    address: '',
    phone: '',
    email: '',
    selfie: '', // Nombre de la imagen
    selfieCache: '', // almacenamos la imagen local para mostrar
    document: '', // Nombre de la imagen
    documentCache: '', // almacenamos la imagen local para mostrar
    pep: '',
    activity: '', // actividad economica
    requestImage: [], // arreglo para ids de imagenes

    requestId: '', // id enviado por mpay
    returnUrlCancel: '', // url de redireccion enviada por mpay si el usuario cancela
    returnFinish: 'https://www.google.com', // url de redireccion enviada por mpay para que el usuario finalice el proceso
  }); // definimos la variable que vamos a mantener y pasar a los componentes, en este caso quiero un JSON

  return (
    <RequireContext.Provider value={[require, setRequire]}>
      {/* aqui pasamos como valor el mismo arreglo de datos a mantener  
           ############################################################################
           # NOTA: este provider es el que va a envolver al padre de los componentes, #
           # El context es el que invocaremos como un 'State' de react                #
           ############################################################################ 
      */}
      {props.children}
    </RequireContext.Provider>
  );
};

// {
//   channel: 'BEN',
//   platform: 'Android',
//   name: 'Yasmileth Del Carmen',
//   lastName: 'Cedeno Alfaro',
//   identificationDocument: '6-704-1140',
//   issued: '25-OCT-2012',
//   expires: '25-OCT-2022',
//   dateOfBirth: '25-ENE-1980',
//   nationality: 'PANAMEÑA',
//   placeOfBirth: 'PANAMA',
//   gender: 'F',
//   address: '',
//   phone: '60001111',
//   email: '',
//   selfie: '1d71ae26-d4d5-4fa6-acdd-708879b8c4e7_Selfie_Yasmile_Alfaro_Iphone.jpeg',
//   selfieCache: '',
//   document: 'f6026919-d779-46bd-a72d-4a2b5bfcae89_Cedula_Yasmile_Alfaro_Iphone.jpeg',
//   documentCache: '',
//   pep: 'si',
//   activity: {
//     id: 1,
//     naics: 111110,
//     risk: 1,
//     description: 'Soybean Farming',
//     descriptionEs: 'Cultivo de soja',
//   },
//   requestImage: [
//     {
//       image: {
//         id: '1443',
//       },
//     },
//     {
//       image: {
//         id: '1444',
//       },
//     },
//     {
//       image: {
//         id: '1445',
//       },
//     },
//   ],
//   requestId: '2ca2a060-4173-413a-8595-4bd11e09e8ef',
//   returnUrlCancel: 'www.algunapaginademiapp.com',
//   returnFinish: 'https://www.google.com',
// }
