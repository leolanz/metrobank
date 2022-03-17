import React from 'react';
import { toast } from 'react-toastify';

import CheckIcon from '@material-ui/icons/Check';
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
} from '@material-ui/core';

import { Button, Container } from '../../../Components';
import { Search, Footer, Loading } from '../../../Containers';
import { domainServer, domainPython } from '../../../Connection/Connection';
import { RequireContext } from '../../../Context';

import './activity.scss';

const Activity = (props) => {
  const [data, setData] = React.useState('');
  const [value, setValue] = React.useState('');
  const [require, setRequire] = React.useContext(RequireContext); // Llamamos el contexto de require
  const [option, setOption] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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
    fetch(`${domainServer}/api/request/save`, {
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
    const dat = { ...{}, ...require };
    dat.selfieCache = '';
    dat.documentCache = '';

    fetch('https://onboardingbnp.mpaycenter.com/onboarding/verification', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-Api-key': 'a30a003d-0ec5-45c3-a585-d05507a90eef',
      },
      method: 'POST',
      body: JSON.stringify(dat),
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

    fetch(`${domainPython}/ocr/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token 04daeb5ed0d8389931296639cd6949e3a57ec62d',
      },
      body: JSON.stringify({
        faceselfie: img,
        ocrident: 'myawsbucketface',
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
              require.placeOfBirth === res[0].Lugar_de_Nacimiento &&
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

  const validation = () => {
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
    } else if (require.email === '' || require.email === null) {
      toast.error('Se requiere email', {
        position: 'top-center',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        hideProgressBar: true,
        closeButton: false,
      });
    } else if (require.phone === '' || require.phone === null) {
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
      require.placeOfBirth === '' ||
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
      sendOCR(require.document);
    }
  };
  // const find = (word) => {
  //   setLoading(true);
  //   fetch(`${domainServer}/api/utils/economicActivity/`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       return response.text().then((text) => {
  //         throw new Error(text);
  //       });
  //     })
  //     .then((res) => {
  //       setLoading(false);

  //       setOption(res);
  //     })
  //     .catch((err) => {
  //       setLoading(false);

  //       setOption([]);
  //       console.log(err);
  //     });
  // };

  // React.useEffect(() => {
  //   find();
  // }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Container>
        <div className="activity-wrapper">
          <div className="row-activity">
            <h4 className="title">
              Seleccione su actividad económica{' '}
              <span className={props?.channel === 'BEN' ? 'ben-color text-bold' : 'text-blue'}>
                (Fuente de ingresos)
              </span>
            </h4>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Seleccione</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data}
                label="Age"
                onChange={(e) => {
                  setData(e.target.value);
                  setRequire((prevState) => {
                    return { ...prevState, activity: { id: e.target.value } };
                  });
                }}
              >
                <MenuItem value={100}>Ama de casa</MenuItem>
                <MenuItem value={101}>Asalariado Gubernamental</MenuItem>
                <MenuItem value={102}>Asalariado Privado</MenuItem>
                <MenuItem value={103}>Empleada Doméstica</MenuItem>
                <MenuItem value={104}>Empleo Informal</MenuItem>
                <MenuItem value={105}>Estudiantes</MenuItem>
                <MenuItem value={106}>Independiente</MenuItem>
                <MenuItem value={107}>Jubilados o Pensionados</MenuItem>
                <MenuItem value={108}>Técnicos</MenuItem>
                <MenuItem value={109}>Planes Sociales</MenuItem>
                <MenuItem value={110}>Emprendedores</MenuItem>
              </Select>
            </FormControl>
          </div>

          {props?.channel === 'BEN' ? (
            <div className="row-activity">
              <h4 className="title">
                ¿Es usted una persona políticamente expuesta{' '}
                <span className={props?.channel === 'BEN' ? 'ben-color text-bold' : 'text-blue'}>
                  (PEP)?
                </span>
              </h4>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Seleccione</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setRequire((prevState) => {
                      return { ...prevState, pep: e.target.value };
                    });
                  }}
                >
                  <MenuItem value="si">Sí</MenuItem>
                  <MenuItem value="familiar">Soy familiar de PEP</MenuItem>
                  <MenuItem value="cercano">Tengo cercana colaboración con PEP</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
            </div>
          ) : null}

          {props?.channel === 'BEN' ? (
            <Footer align="center">
              <Button
                ben
                full
                disabled={data === '' || value === ''}
                color="primary"
                onClick={() => {
                  validation();
                }}
              >
                Enviar solicitud
              </Button>
            </Footer>
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
                  disabled={data === ''}
                  full
                  icon={<CheckIcon />}
                  onClick={() => {
                    props.next();
                  }}
                >
                  Siguiente
                </Button>
              </div>
            </Footer>
          )}
        </div>
      </Container>
    </>
  );
};
export default Activity;
