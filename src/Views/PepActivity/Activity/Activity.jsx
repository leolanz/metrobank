import React from "react";
import { toast } from "react-toastify";

import CheckIcon from "@material-ui/icons/Check";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
} from "@material-ui/core";

import { Button, Container } from "../../../Components";
import { Search, Footer, Loading } from "../../../Containers";
import { api } from "../../../Connection/Connection";
import { RequireContext } from "../../../Context";

import "./activity.scss";
import SelectInput from "../SelectInput/SelectInput";

const optionesPep = [
  { label: "Sí", value: "si", id: "si" },
  { label: "Soy familiar de PEP", value: "familiar", id: "family_pep" },
  {
    label: "Tengo cercana colaboración con PEP",
    value: "cercano",
    id: "near_pep",
  },
  { label: "No", value: "no", id: "no" },
];

const Activity = (props) => {
  const [data, setData] = React.useState("");
  const [value, setValue] = React.useState("");
  const [require, setRequire] = React.useContext(RequireContext); // Llamamos el contexto de require
  const [option, setOption] = React.useState([]);
  const [optionPEP, setOptionPEP] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const convertDate = (date) => {
    const arrDate = date.split("-");
    const [day, month, year] = arrDate;
    let dateResult = "";

    switch (month) {
      case "ENE":
        dateResult = `${year}-01-${day}`;
        break;
      case "FEB":
        dateResult = `${year}-02-${day}`;
        break;
      case "MAR":
        dateResult = `${year}-03-${day}`;
        break;
      case "ABR":
        dateResult = `${year}-04-${day}`;
        break;
      case "MAY":
        dateResult = `${year}-05-${day}`;
        break;
      case "JUN":
        dateResult = `${year}-06-${day}`;
        break;
      case "JUL":
        dateResult = `${year}-07-${day}`;
        break;
      case "AGO":
        dateResult = `${year}-08-${day}`;
        break;
      case "SEP":
        dateResult = `${year}-09-${day}`;
        break;
      case "OCT":
        dateResult = `${year}-10-${day}`;
        break;
      case "NOV":
        dateResult = `${year}-11-${day}`;
        break;
      case "DIC":
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

  const sendRequestDash = (codeMpay) => {
    const reqClone = { ...{}, ...require };

    reqClone.selfieCache = "";
    reqClone.documentCache = "";

    const issued = convertDate(reqClone.issued);
    const expires = convertDate(reqClone.expires);
    const dateOfBirth = convertDate(reqClone.dateOfBirth);

    reqClone.issued = new Date(issued);
    reqClone.expires = new Date(expires);
    reqClone.dateOfBirth = new Date(dateOfBirth);

    reqClone.bankResponse = codeMpay;

    fetch(`${api.domainServer}/api/request/save`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
        props.next();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(`error: ${err}`, {
          position: "top-center",
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
    dat.selfieCache = "";
    dat.documentCache = "";

    fetch(api.mpay, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-Api-key": "a30a003d-0ec5-45c3-a585-d05507a90eef",
      },
      method: "POST",
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
        if (res.code === 0) {
          // la respuesta de mpay fue exitosa
          setRequire((prevState) => {
            return {
              ...prevState,
              ...{ bankResponse: res.code, returnFinish: res.data.url },
            };
          });
        } else {
          toast.error(res.description, {
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            hideProgressBar: true,
            closeButton: false,
          });
        }
        sendRequestDash(res.code);
      })
      .catch((err) => {
        setLoading(false);
        const error = JSON.parse(err);
        sendRequestDash(error.code);

        toast.error(`error: ${error.description}`, {
          position: "top-center",
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
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token 04daeb5ed0d8389931296639cd6949e3a57ec62d",
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
          case "200_OK":
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
              if (require.aml) {
                sendRequestDash();
              } else {
                sendRequestMPAy();
              }
            } else {
              toast.error("Error con el documento de identidad", {
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                hideProgressBar: true,
                closeButton: false,
              });
            }
            break;
          case "400_invalid_image":
            toast.error("Imagen no valida para el proceso de OCR", {
              position: "top-center",
              autoClose: 3000,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              hideProgressBar: true,
              closeButton: false,
            });
            break;

          default: {
            toast.error("La imagen tiene baja calidad.", {
              position: "top-center",
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
    if (require.requestId === "" || require.requestId === null) {
      toast.error("RequestId es requerido", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        hideProgressBar: true,
        closeButton: false,
      });
    } else if (require.email === "" || require.email === null) {
      toast.error("Se requiere email", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        hideProgressBar: true,
        closeButton: false,
      });
    } else if (require.phone === "" || require.phone === null) {
      toast.error("Se requiere número telefónico", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        hideProgressBar: true,
        closeButton: false,
      });
    } else if (
      require.name === "" ||
      require.lastName === "" ||
      require.identificationDocument === "" ||
      require.issued === "" ||
      require.expires === "" ||
      require.dateOfBirth === "" ||
      require.nationality === "" ||
      require.placeBirth === "" ||
      require.gender === "" ||
      require.urlSelfie === "" ||
      require.urlIdentificationDocument === "" ||
      require.activity === ""
    ) {
      toast.error("Información incompleta", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        hideProgressBar: true,
        closeButton: false,
      });
    } else {
      sendOCR(require.urlIdentificationDocument);
    }
  };

  const economicActivity = () => {
    setLoading(true);
    fetch(`${api.domainServer}/api/utils/economicActivity/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
        setOption(res);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setOption([]);
        console.log(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    economicActivity();
  }, []);

  const handleChangeSelect = (value) => {
    setData(value);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="pepactivity-wrapper">
      <div className="div">
        <div className="row-activity">
          <h3 className="title">
            Seleccione su{" "}
            <span className="text-bold ben-color">
              {" "}
              actividad económica / Fuente de ingresos
            </span>
          </h3>
        </div>
        <div className="row-activity">
          <SelectInput
            options={option}
            handleChangeSelect={handleChangeSelect}
            selectedOption={data}
          />
        </div>
        <div className="row-activity">
          <h4 className="radioTitle">
            ¿Es usted una persona políticamente expuesta
            <span className={"ben-color text-bold"}> (PEP)?</span>
          </h4>
          {optionesPep.map((item, key) => {
            return (
              <div key={key} className="radioButton">
                <input
                  onChange={(e) => {
                    setValue(e.target.value);
                    setRequire((prevState) => {
                      return { ...prevState, pep: e.target.value };
                    });
                  }}
                  type="radio"
                  id={item.id}
                  name="pep"
                  value={item.value}
                />
                <span></span>
                <label for={item.id}>{item.label}</label>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        ben
        full
        /* disabled={data === "" || value === ""} */
        color="primary"
        onClick={() => {
          validation();
        }}
      >
        Enviar solicitud
      </Button>
    </div>
  );
};
export default Activity;
