/* eslint-disable */

import React from 'react';
import { isIOS, isDesktop } from 'react-device-detect';

import { NewcameraBen, NewcameraSelfie, Loading } from '../../../Containers';
import TakePhotoIOS from '../../../Containers/TakePhoto/IOs/TakePhotoIOs';
import { RequireContext } from '../../../Context';
import placeHolder from '../../../Assets/placeholder-selfie.svg';
import placeHolderBen from '../../../Assets/selfie-placeholder-V3.svg';
import useToBase64 from '../../../Hooks/File/useTo';
import { toast } from 'react-toastify';
import { api } from '../../../Connection/Connection';

const Selfie = (props) => {
  const [require, setRequire] = React.useContext(RequireContext); // Llamamos el contexto de require
  const [successfulUpload, setSuccessfulUpload] = React.useState(false); // Llamamos el contexto de require
  const [loading, setLoading] = React.useState(false);
  const [convert] = useToBase64();

  const uploadPhoto = async (img) => {
    // props.onChange(file);

    const formData = new FormData();
    formData.append('upload', img);
    setLoading(true);
    const endpoint = `${api.domainServer}/api/file/upload/`;
    const config = {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    };

    try {
      const response = await fetch(endpoint, config);
      const res = await response.json();
      setSuccessfulUpload(true);
      setLoading(false);
      setRequire((prevState) => {
        return { ...prevState, urlSelfie: res.image };
      });
    } catch (err) {
      setSuccessfulUpload(false);
      setLoading(false);
      toast.error(`Ocurrio un error ${err}`, {
        toastId: 'custom-id-error',
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        closeButton: false,
      });

      console.log(err);
    }
  };

  React.useEffect(() => {
    // Con esta funcion capturamos la plataforma donde se esta consumiendo
    if (navigator.userAgent.indexOf('iPhone') > -1) {
      setRequire((prevState) => {
        return { ...prevState, platform: 'iPhone' };
      });
    } else if (navigator.userAgent.indexOf('Android') > -1) {
      setRequire((prevState) => {
        return { ...prevState, platform: 'Android' };
      });
    } else if (navigator.userAgent.indexOf('iPad') > -1) {
      setRequire((prevState) => {
        return { ...prevState, platform: 'iPad' };
      });
    } else if (navigator.userAgent.indexOf('Mac') > -1) {
      setRequire((prevState) => {
        return { ...prevState, platform: 'Mac' };
      });
    } else if (navigator.userAgent.indexOf('Windows') > -1) {
      setRequire((prevState) => {
        return { ...prevState, platform: 'Windows' };
      });
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (props?.channel === 'BEN') {
    // Si Viene de BEN entra por aqui y preguntamos si viene por IOS
    return (
      <>
        <TakePhotoIOS
          successfulUpload={successfulUpload}
          channel={props?.channel}
          active={props.active}
          preview={require.selfieCache}
          id="selfie"
          title="¡Capture una selfie,"
          titleBlue={<span className="ben-color text-bold">mire de frente a la cámara!</span>}
          contentText="Ubíquese en un lugar con buena luz y no use mascarillas, gafas o gorras."
          onChange={(img) => {
            if (img !== undefined && img !== '' && img !== null) {
              uploadPhoto(img);
              convert(img)
                .then((res) => {
                  setRequire((prevState) => {
                    return { ...prevState, selfieCache: res };
                  });
                })
                .catch((err) => {
                  toast.error(`Ocurrio un error ${err}`, {
                    toastId: 'custom-id-error',
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 0,
                    closeButton: false,
                  });
                });
            }
          }} // guardamos la imagen en el objeto require
          delete={() => props.delete()}
          next={() => {
            props.next();
          }}
          back={() => props.back()}
          TextButtonTake="Tomar selfie"
          placeHolderImg={placeHolderBen}
          onCancel={() => {
            window.location.href = require.returnUrlCancel;
          }}
        />
      </>
    );
  }
  if (isIOS) {
    // Si viene IOs android mostramos esto
    return (
      <>
        <TakePhotoIOS
          successfulUpload={successfulUpload}
          active={props.active}
          preview={require.selfieCache}
          id="selfie"
          title="Tómate una"
          titleBlue="foto tipo Selfie"
          contentText="No uses gafas, cachuchas o mucho maquillaje para un mejor reconocimiento facial."
          onChange={(img) => {
            if (img !== undefined && img !== '' && img !== null) {
              uploadPhoto(img);
              convert(img)
                .then((res) => {
                  setRequire((prevState) => {
                    return { ...prevState, selfieCache: res };
                  });
                })
                .catch((err) => {
                  toast.error(`Ocurrio un error ${err}`, {
                    toastId: 'custom-id-error',
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 0,
                    closeButton: false,
                  });
                });
            }
          }} // guardamos la imagen en el objeto require
          delete={() => props.delete()}
          next={() => {
            props.next();
          }}
          back={() => props.back()}
          TextButtonTake="Tomar foto tipo selfie"
          placeHolderImg={placeHolder}
        />
      </>
    );
  }
  return (
    //este es el android que no viene de BEN
    <>
      <NewcameraSelfie
        delete={() => props?.delete()}
        next={() => {
          props.next();
        }}
      />
    </>
  );
};
export default Selfie;
