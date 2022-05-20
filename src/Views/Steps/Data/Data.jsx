import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { toast } from 'react-toastify';

import { Input, Button } from '../../../Components';
import { Footer, Loading } from '../../../Containers';
import { RequireContext } from '../../../Context';
import { api } from '../../../Connection/Connection';
import './data.scss';

const Data = (props) => {
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [focus, setFocus] = React.useState(false);
  const [, setErrorPhone] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorAddress, setErrorAddress] = React.useState('');
  const [require, setRequire] = React.useContext(RequireContext); // Llamamos el contexto de require
  const [loading, setLoading] = React.useState(false);
  const [phone] = React.useState(require.phone);

  const convertDate = (date) => {
    const arrDate = date.split('-');
    const [day, month, year] = arrDate;
    let dateResult = '';

    switch (month) {
      case 'ENE':
        dateResult = `${year}-01-${day}`;
        break;
      case 'FEB':
        dateResult = `${year}-02-${day}`;
        break;
      case 'MAR':
        dateResult = `${year}-03-${day}`;
        break;
      case 'ABR':
        dateResult = `${year}-04-${day}`;
        break;
      case 'MAY':
        dateResult = `${year}-05-${day}`;
        break;
      case 'JUN':
        dateResult = `${year}-06-${day}`;
        break;
      case 'JUL':
        dateResult = `${year}-07-${day}`;
        break;
      case 'AGO':
        dateResult = `${year}-08-${day}`;
        break;
      case 'SEP':
        dateResult = `${year}-09-${day}`;
        break;
      case 'OCT':
        dateResult = `${year}-10-${day}`;
        break;
      case 'NOV':
        dateResult = `${year}-11-${day}`;
        break;
      case 'DIC':
        dateResult = `${year}-12-${day}`;
        break;
      default:
        dateResult = `${year}-01-${day}`;
        // dateResult = false;
        // toast.error(`Error fecha no valida ${date}`, {
        //   position: 'top-center',
        //   autoClose: 3000,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   hideProgressBar: true,
        //   closeButton: false,
        // });
        break;
    }
    return dateResult;
  };

  const sendRequestDash = () => {
    const reqClone = { ...{}, ...require };

    reqClone.selfieCache = '';
    reqClone.documentCache = '';

    const issued = convertDate(reqClone.issued);
    const expires = convertDate(reqClone.expires);
    const dateOfBirth = convertDate(reqClone.dateOfBirth);

    reqClone.issued = new Date(issued);
    reqClone.expires = new Date(expires);
    reqClone.dateOfBirth = new Date(dateOfBirth);
    fetch(`${api.domainServer}/api/request/save`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqClone),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((text) => {
          throw text;
        });
      })
      .then((res) => {
        setLoading(false);
        // props?.next();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(`error: ${err}`, {
          position: 'top-center',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  };

  const sendRequestMPAy = () => {
    setLoading(true);
    const data = { ...{}, ...require };
    data.selfieCache = '';
    data.documentCache = '';
    data.email = email;
    // convirtiendo fechas!
    // data.issued = convertDateMpay(data.issued);
    // data.expires = convertDateMpay(data.expires);
    // data.dateOfBirth = convertDateMpay(data.dateOfBirth);

    fetch(`${api.mpay}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-Api-key': 'a30a003d-0ec5-45c3-a585-d05507a90eef',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((text) => {
          throw text;
        });
      })
      .then((res) => {
        sendRequestDash();

        if (res.code === 0) {
          setRequire((prevState) => {
            return { ...prevState, ...{ bankResponse: res.code, returnFinish: res.data.url } };
          });
          props?.next();
        } else {
          toast.error(res.description, {
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
        const error = JSON.parse(err);
        sendRequestDash();

        toast.error(`error: ${error.description}`, {
          position: 'top-center',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          hideProgressBar: true,
          closeButton: false,
        });
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
        ocrident: 'buckface',
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
            if (
              require.identificationDocument === res[0].Numero_de_Documento &&
              require.issued === res[0].Expedicion &&
              require.expires === res[0].Expira &&
              require.name === res[0].Nombres &&
              require.lastName === res[0].Apellidos &&
              require.dateOfBirth === res[0].Fecha_de_Nacimiento &&
              require.nationality === res[0].Nacionalidad &&
              require.placeBirth === res[0].Lugar_de_Nacimiento &&
              require.gender === res[0].Genero
            ) {
              sendRequestMPAy();
            } else {
              toast.error('Error con el documento de identidad', {
                position: 'top-center',
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                hideProgressBar: true,
                closeButton: false,
              });
            }
            break;
          case '400_invalid_image':
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
  const validateEmail = (test) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(test).toLowerCase());
  };
  const validation = () => {
    const tlf = require.phone !== '' ? require.phone : phone;
    if (!validateEmail(email)) {
      setErrorEmail('Correo no válido');
    } else if (tlf === '' || !tlf) {
      setErrorPhone('Este campo es requerido');
    } else if (tlf.length < 7) {
      setErrorPhone('Este campo debe contener 7 caracteres');
    } else if (tlf === '' && props?.channel !== 'BEN') {
      setErrorAddress('Este campo es requerido');
    } else {
      setErrorPhone('');
      setErrorAddress('');
      setErrorEmail('');
      setRequire((prevState) => {
        return { ...prevState, ...{ phone, email, address } };
      });

      if (require.requestId === '' || require.requestId === null) {
        toast.error('RequestId es requerido', {
          position: 'top-center',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          hideProgressBar: true,
          closeButton: false,
        });
      } else if (require.email === '') {
        toast.error('Se requiere email', {
          position: 'top-center',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          hideProgressBar: true,
          closeButton: false,
        });
      } else if (require.phone === '') {
        toast.error('Se requiere número telefónico', {
          position: 'top-center',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          hideProgressBar: true,
          closeButton: false,
        });
      } else if (
        require.name === '' ||
        require.lastName === '' ||
        require.identificationDocument === '' ||
        require.issued === '' ||
        require.expires === '' ||
        require.dateOfBirth === '' ||
        require.nationality === '' ||
        require.placeBirth === '' ||
        require.gender === '' ||
        require.selfie === '' ||
        require.document === '' ||
        require.activity === '' ||
        require.requestImage.length === 0
      ) {
        toast.error('Información incompleta', {
          position: 'top-center',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          hideProgressBar: true,
          closeButton: false,
        });
      } else {
        sendOCR();
      }
    }
  };
  if (loading) {
    return <Loading></Loading>;
  }

  const Flag = () => {
    return (
      <svg
        width="26"
        height="20"
        viewBox="0 0 26 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.5517 20H0.448296C0.200738 20 0 19.7643 0 19.4737V0.526339C0 0.235684 0.200738 0 0.448296 0H25.5517C25.7993 0 26 0.235684 26 0.526339V19.4737C25.9999 19.7644 25.7992 20 25.5517 20Z"
          fill="#F5F5F5"
        />
        <path
          d="M13 10H25.5517C25.7993 10 26 9.76432 26 9.47366V0.526337C26 0.235683 25.7993 0 25.5517 0H13.4483C13.2007 0 13 0.235683 13 0.526337V10Z"
          fill="#FF4B55"
        />
        <path
          d="M0.448295 20H12.5517C12.7993 20 13 19.7643 13 19.4737V10H0.448295C0.200737 10 0 10.2357 0 10.5263V19.4737C0 19.7644 0.200737 20 0.448295 20Z"
          fill="#4173CD"
        />
        <path
          d="M6.67262 3.46086L7.1 4.77513L8.45078 4.78586C8.62567 4.78721 8.69818 5.01617 8.55747 5.12268L7.47085 5.94565L7.87827 7.26658C7.93098 7.43762 7.74116 7.57903 7.59887 7.47476L6.49997 6.66919L5.40101 7.47481C5.25872 7.57913 5.0689 7.43762 5.12161 7.26663L5.52903 5.9457L4.44241 5.12273C4.3017 5.01617 4.37422 4.78726 4.54911 4.78591L5.89989 4.77518L6.32726 3.46091C6.38261 3.29071 6.61732 3.29071 6.67262 3.46086Z"
          fill="#4173CD"
        />
        <path
          d="M19.6726 12.8095L20.1 14.1238L21.4508 14.1345C21.6257 14.1358 21.6982 14.3648 21.5575 14.4713L20.4708 15.2943L20.8783 16.6152C20.931 16.7863 20.7412 16.9277 20.5989 16.8234L19.5 16.0178L18.401 16.8234C18.2587 16.9278 18.0689 16.7863 18.1216 16.6153L18.529 15.2943L17.4424 14.4714C17.3017 14.3648 17.3742 14.1359 17.5491 14.1345L18.8999 14.1238L19.3273 12.8095C19.3826 12.6393 19.6173 12.6393 19.6726 12.8095Z"
          fill="#FF4B55"
        />
      </svg>
    );
  };
  return (
    <>
      <div className="data-wrapper">
        <div className="data-content">
          {props?.channel === 'BEN' ? (
            <h3 className="title">
              <span className="text-bold">Escriba su</span>
              <span className="text-bold ben-color"> correo electrónico.</span>
            </h3>
          ) : (
            <h3 className="title">
              Para finalizar. <span>Escribe tu teléfono y correo electrónico</span>
            </h3>
          )}
          <Input
            label="Email"
            error={errorEmail}
            iconLeft={
              <div className="ic-email">
                <EmailOutlinedIcon />
              </div>
            }
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!validateEmail(e.target.value)) {
                setErrorEmail('Correo no válido');
              } else {
                setErrorEmail('');
              }
            }}
            type="email"
            placeholder="ejemplo@dominio.com"
          />
          <div className="telf">
            <p>Teléfono</p>
            <div className="phone">
              <Flag />
              <span className="number">{`+507 ${require.phone}`}</span>
            </div>
          </div>

          {props?.channel !== 'BEN' ? (
            <Input
              error={errorAddress}
              onClick={() => {
                console.log('');
              }}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              type="textarea"
              placeholder="Dirección"
            />
          ) : null}
        </div>
      </div>
      {props?.channel === 'BEN' ? (
        <div className={focus ? 'foo' : ''}>
          <Footer align="center" column>
            <Button
              ben
              disabled={errorEmail !== '' || email === ''}
              full
              color="primary"
              onClick={() => {
                validation();
              }}
            >
              Enviar solicitud
            </Button>
          </Footer>
        </div>
      ) : (
        <Footer
          column={window.innerWidth < 1200}
          align={window.innerWidth < 1200 ? 'left' : 'center'}
        >
          <div className="buttons">
            <Button
              full
              color="tertiary"
              onClick={() => {
                if (window.confirm('¿Seguro que desea abandonar el proceso?')) {
                  window.location.href = require.returnUrlCancel;
                }
              }}
            >
              Cancelar
            </Button>
            <Button
              color="primary"
              disabled={phone === '' || email === '' || address === '' || errorEmail !== ''}
              full
              icon={<CheckIcon />}
              onClick={() => {
                validation();
              }}
            >
              Solicitar apertura de cuenta
            </Button>
          </div>
        </Footer>
      )}
    </>
  );
};
export default Data;
