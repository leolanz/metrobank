import React from 'react';

import { isIOS, isDesktop } from 'react-device-detect';
import { toast } from 'react-toastify';
import { TakePhoto, Loading } from '../../../Containers';
import { RequireContext } from '../../../Context';
import useToBase64 from '../../../Hooks/File/useToBase64';
import TakePhotoIOS from '../../../Containers/TakePhoto/IOs/TakePhotoIOs';
import TakePicture from '../../../Containers/TakePhoto/Android/TakePicture';

import PlaceHolder from '../../../Assets/placeholder-document-v3.svg';
import { api } from '../../../Connection/Connection';

const Document = (props) => {
  const [require, setRequire] = React.useContext(RequireContext); // Llamamos el contexto de require
  const [loading, setLoading] = React.useState(false); // Llamamos el contexto de require
  const [successfulUpload, setSuccessfulUpload] = React.useState(false); // Llamamos el contexto de require
  const [convert] = useToBase64();

  const face = (img1, img2) => {
    setLoading(true);

    fetch(`${api.domainPython}/face/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token 04daeb5ed0d8389931296639cd6949e3a57ec62d',
      },
      body: JSON.stringify({
        faceselfie: img1,
        ocrident: img2,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((text) => {
          throw new Error(text);
        });
      })
      .then((res) => {
        setLoading(false);

        if (res[0].cod === '200_OK') {
          setSuccessfulUpload(true);

          // toast.success('Coincide el rostro', {
          //   position: 'top-center',
          //   autoClose: 3000,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   hideProgressBar: true,
          //   closeButton: false,
          // });
        } else {
          setSuccessfulUpload(false);

          toast.error('No coincide el rostro', {
            position: 'top-center',
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            hideProgressBar: true,
            closeButton: false,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const list = (name, img) => {
    setLoading(true);

    fetch(`${api.domainPython}/lists/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token 04daeb5ed0d8389931296639cd6949e3a57ec62d',
      },
      body: JSON.stringify({
        string_income: name,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((text) => {
          throw new Error(text);
        });
      })
      .then((res) => {
        setLoading(false);

        if (res !== '200_OK_no results found') {
          // esto quiere decir que la lista retorno coincidencia
          setRequire((prevState) => {
            return {
              ...prevState,
              ...{
                aml: true,
                responseAml: JSON.stringify(res),
              },
            };
          });
        }
        face(require.urlSelfie, img); // hacemos la comparacion de rostros
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const sendOCR = (img) => {
    setLoading(true);

    fetch(`${api.domainPython}/ocr/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token 04daeb5ed0d8389931296639cd6949e3a57ec62d',
      },
      body: JSON.stringify({
        faceselfie: img,
        ocrident: api.bucket,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((text) => {
          throw new Error(text);
        });
      })
      .then((res) => {
        setLoading(false);

        switch (res[0].cod) {
          case '200_OK':
            {
              const name = `${res[0].Nombres} ${res[0].Apellidos}`;
              list(name, img);

              setRequire((prevState) => {
                return {
                  ...prevState,
                  ...{
                    identificationDocument: res[0].Numero_de_Documento,
                    issued: res[0].Expedicion,
                    expires: res[0].Expira,
                    name: res[0].Nombres,
                    lastName: res[0].Apellidos,
                    dateOfBirth: res[0].Fecha_de_Nacimiento,
                    nationality: res[0].Nacionalidad,
                    placeBirth: res[0].Lugar_de_Nacimiento,
                    gender: res[0].Genero,
                  },
                };
              });
            }
            break;
          case '400_invalid_image':
            setRequire((prevState) => {
              return {
                ...prevState,
                ...{
                  identificationDocument: '',
                  issued: '',
                  expires: '',
                  name: '',
                  lastName: '',
                  dateOfBirth: '',
                  nationality: '',
                  placeBirth: '',
                  gender: '',
                },
              };
            });

            toast.error('Imagen no valida para el proceso de OCR', {
              position: 'top-center',
              autoClose: 3000,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              hideProgressBar: true,
              closeButton: false,
            });
            break;

          default: {
            setRequire((prevState) => {
              return { ...prevState, documentCache: res.imgName };
            });

            toast.error('La imagen tiene baja calidad.', {
              position: 'top-center',
              autoClose: 3000,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              hideProgressBar: true,
              closeButton: false,
            });
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

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
        return { ...prevState, urlIdentificationDocument: res.image };
      });
      sendOCR(res.image);
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

  if (loading) {
    return <Loading />;
  }

  if (props?.channel === 'BEN') {
    return (
      <>
        <TakePhotoIOS
          repeatDocumet={props.repeatDocumet}
          successfulUpload={successfulUpload}
          channel={props?.channel}
          active={props.active}
          preview={require.documentCache}
          id="Document"
          title="¡Capture una"
          titleBlue={<span className="ben-color text-bold">foto de su cédula!</span>}
          contentText="El documento debe estar centrado en la pantalla y no debe tener sombras ni reflejos."
          messageSuccess="Documento cargado exitosamente!"
          placeHolderImg={PlaceHolder}
          onChange={(img) => {
            if (img !== undefined && img !== '' && img !== null) {
              uploadPhoto(img);
              convert(img)
                .then((res) => {
                  setRequire((prevState) => {
                    return { ...prevState, documentCache: res };
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
          }}
          TextButtonTake="Tomar foto"
          delete={() => props.delete()}
          next={() => props.next()}
          back={() => props.back()}
          onCancel={() => {
            window.location.href = require.returnUrlCancel;
          }}
        />
      </>
    );
  }
  if (isIOS) {
    // si no viene de BEN y es Iphone
    return (
      <>
        <TakePhotoIOS
          onCancel={() => {
            window.location.href = require.returnUrlCancel;
          }}
          successfulUpload={successfulUpload}
          preview={require.documentCache}
          channel={props?.channel}
          active={props.active}
          id="Document"
          title="Tómale una"
          titleBlue="foto a tu cédula"
          contentText="Procura que tenga la mejor nitidéz para que el proceso de escaneo sea exitoso."
          messageSuccess="Documento cargado exitosamente!"
          placeHolderImg={PlaceHolder}
          onChange={(img) => {
            if (img !== undefined && img !== '' && img !== null) {
              uploadPhoto(img);
              convert(img)
                .then((res) => {
                  setRequire((prevState) => {
                    return { ...prevState, documentCache: res };
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
          }}
          TextButtonTake="Tomar foto"
          delete={() => props.delete()}
          next={() => {
            props.next();
            console.log(require);
          }}
          back={() => props.back()}
        />
      </>
    );
  }

  return (
    <>
      <TakePicture
        successfulUpload={successfulUpload}
        facingMode="environment"
        preview={require.documentCache}
        channel={props?.channel}
        active={props.active}
        id="Document"
        title="Tómale una"
        titleBlue="foto a tu cédula"
        contentText="Procura que tenga la mejor nitidéz para que el proceso de escaneo sea exitoso."
        messageSuccess="Documento cargado exitosamente!"
        placeHolderImg={PlaceHolder}
        onChange={(img) => {
          if (img !== undefined && img !== '' && img !== null) {
            uploadPhoto(img);
            setRequire((prevState) => {
              return { ...prevState, documentCache: img };
            });
          }
        }}
        TextButtonTake="Tomar foto"
        delete={() => props.delete()}
        next={() => {
          props.next();
          console.log(require);
        }}
        back={() => props.back()}
      />
    </>
  );
};
export default Document;
