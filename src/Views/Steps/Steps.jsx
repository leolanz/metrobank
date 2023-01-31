import React from "react";

import { Stepper, Step, StepLabel } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import { Button, ProgressBar } from "../../Components";
import { Header, Sidebar } from "../../Containers";
import Selfie from "./Selfie/Selfie";
import Document from "./Document/Document";
import Info from "./Info/Info";
import Activity from "./Activity/Activity";
import Data from "./Data/Data";
import Finish from "./Finish/Finish";
import { RequireContext } from "../../Context";

import "./steps.scss";

const Steps = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [lastStep, setLastStep] = React.useState(0);
  const [, setRequire] = React.useContext(RequireContext); // Llamamos el contexto de require

  const steps = ["Confirmación de datos", "Actividad Económica"];
  const stepsBen = [
    "Confirmación de datos",
    "Información adicional",
    "¡Registro completado!",
  ];
  const stepsDesk = [
    "Confirmar Datos",
    "Actividad Económica",
    "Datos personales",
    "Confirmación",
  ];

  const { search } = useLocation();
  const query = new URLSearchParams(search);

  React.useEffect(() => {
    if (props?.channel === "BEN") {
      // revisamos sessionStorage para saber si hay variables almacenadas
      let data = sessionStorage.getItem("data");
      if (data) {
        data = JSON.parse(data);

        if (data.phone !== null) {
          setRequire((prevState) => {
            return {
              ...prevState,
              ...{
                requestId: data.requestId,
                returnUrlCancel: data.returnUrl,
                phone: data.phone,
                email: data.email,
              },
            };
          });
        } else {
          setRequire((prevState) => {
            const obj = {
              requestId: query.get("requestId"),
              returnUrl: query.get("returnUrl"),
              phone: query.get("phone"),
              email: query.get("email"),
            };

            sessionStorage.setItem("data", JSON.stringify(obj));

            return {
              ...prevState,
              ...obj,
            };
          });
        }
      } else {
        setRequire((prevState) => {
          const obj = {
            requestId: query.get("requestId"),
            returnUrl: query.get("returnUrl"),
            phone: query.get("phone"),
            email: query.get("email"),
          };

          sessionStorage.setItem("data", JSON.stringify(obj));

          return {
            ...prevState,
            ...obj,
          };
        });
      }
    }
  }, []);

  const handleNext = () => {
    if (activeStep === lastStep) {
      // si el paso activo es igual al ultimo paso (mayor) entonces avanzamos y sumamos los pasos
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setLastStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // si el paso activo es menor que el ultimo paso entonces solo avanzamos.
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const goToBack = (number) => {
    setActiveStep(number);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else {
      window.history.back();
    }
  };

  const goToStep = (step) => {
    if (step <= lastStep) {
      setActiveStep(step);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  React.useEffect(() => {
    if (props?.channel === "BEN") {
      setRequire((prevState) => {
        return { ...prevState, channel: "BEN" };
      });
    }
  }, []);

  return (
    <>
      {/* <Sidebar>
        <Stepper activeStep={activeStep} orientation="vertical">
          {window.innerWidth < 1200
            ? steps?.map((label, i) => (
                <Step key={label}>
                  <StepLabel onClick={() => goToStep(i)}>{label}</StepLabel>
                </Step>
              ))
            : stepsDesk.map((label, i) => (
                <Step key={label}>
                  <StepLabel onClick={() => goToStep(i)}>{label}</StepLabel>
                </Step>
              ))}
        </Stepper>
      </Sidebar> */}
      <Header
        title={
          props?.channel === "BEN" ? stepsBen[activeStep] : steps[activeStep]
        }
        channel={props?.channel}
        back={handleBack}
      />
      <div className="stepper-box">
        <div
          className={`numbers-container ${
            props?.channel === "BEN" ? "ben" : ""
          }`}
        >
          <ProgressBar items={stepsDesk.length} cont={lastStep + 2} />
        </div>

        {activeStep === steps.length ? (
          <div>
            <Finish
              channel={props?.channel}
              next={handleNext}
              back={handleBack}
            />
          </div>
        ) : (
          <div>
            {/* <div hidden={!(activeStep === 0)}>
              <Selfie
                channel={props?.channel}
                active={activeStep === 0}
                next={handleNext}
                back={handleBack}
                delete={() => setLastStep(0)}
              />
            </div>
            <div hidden={!(activeStep === 1)}>
              <Document
                channel={props?.channel}
                active={activeStep === 1}
                next={handleNext}
                back={handleBack}
                delete={() => setLastStep(1)}
              />
            </div> */}
            <div hidden={!(activeStep === 2)}>
              <Info
                channel={"BEN"}
                active={activeStep === 2}
                next={handleNext}
                back={handleBack}
                goTo={(step) => goToBack(step)}
              />
            </div>
            <div hidden={!(activeStep === 3)}>
              <Activity
                channel={props?.channel}
                next={handleNext}
                back={handleBack}
              />
            </div>
            {/* <div hidden={!(activeStep === 4)}>
              <Data channel={props?.channel} next={handleNext} back={handleBack} />
            </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default Steps;
