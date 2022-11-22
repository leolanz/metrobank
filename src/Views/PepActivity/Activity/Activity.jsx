/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Suspense, lazy } from "react";
import { error } from "../../../Hooks/File/useToast";
import { Button } from "../../../Components";
import { useHistory } from "react-router-dom";
import { Loading } from "../../../Containers";
import { api } from "../../../Connection/Connection";
import "./activity.scss";
import SelectInput from "../SelectInput/SelectInput";
import axios from "axios";

const LoadingModal = lazy(
  async () => await import("../../../Components/LoadingModal/LoadingModal")
);
const Activity = (props) => {
  const [activity, setActivity] = React.useState("");
  const [pep, setPep] = React.useState("");
  const history = useHistory();
  const [option, setOption] = React.useState([]);
  const [optionsPep, setOptionsPep] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const trackInfo = history?.location?.state?.trackInfo;

  const [sentLoading, setSentLoading] = React.useState(false);

  const economicActivity = () => {
    setLoading(true);
    fetch(`${api.REACT_DOMAIN_BACK}/list/riskActivity`, {
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
        pepList();
      })
      .catch((err) => {
        setOption([]);
        console.log(err);
        setLoading(false);
      });
  };

  const pepList = () => {
    fetch(`${api.REACT_DOMAIN_BACK}/list/listPep`, {
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
        setOptionsPep(res);
        setLoading(false);
      })
      .catch((err) => {
        setOption([]);
        console.log(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    economicActivity();
  }, []);

  const sendActivity = async () => {
    setSentLoading(true);
    console.log("activity", trackInfo);
    const data = {
      requestNumber: trackInfo.requestNumber,
      idRiskActivity: activity.idActivity,
      idPep: pep.idPep,
      term_and_condition: 1,
    };
    axios({
      method: "post",
      url: `${api.REACT_DOMAIN_BACK}/lastStep`,
      data,
    })
      .then(function (response) {
        //handle success
        const trackInfo = response.data;
        setSentLoading(false);
        history.push({
          pathname: "/BEN/success",
          state: { trackInfo },
          search: `${history.location.search}&requestNumber=${trackInfo.requestNumber}`,
        });
      })
      .catch(function (Error) {
        //handle error
        setSentLoading(false);
        const data = Error.response.data;
        const result = Array.isArray(data);
        if (result) {
          error(data[0].coincidencia);
        } else {
          error(data.message);
        }
      });
  };

  const handleChangeSelect = (value) => {
    setActivity(value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="pepactivity-wrapper">
      <Suspense fallback={null}>{sentLoading && <LoadingModal />}</Suspense>
      <div className="div">
        <div className="row-activity">
          <h3 className="titleActivity">
            Seleccione su
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
            selectedOption={activity}
          />
        </div>
        <div className="row-activity">
          <h4 className="radioTitle">
            ¿Es usted una persona políticamente expuesta
            <span className={"ben-color text-bold"}> (PEP)?</span>
          </h4>
          {optionsPep.map((item, key) => {
            const description =
              item.description.charAt(0).toUpperCase() +
              item.description.slice(1).toLowerCase();
            return (
              <div
                onClick={() => setPep(item)}
                key={key}
                className="radioButton"
              >
                <input
                  type="radio"
                  id={item.idPep}
                  value={pep}
                  name="pep"
                  checked={pep.idPep === item.idPep}
                />
                <span></span>
                <label for={item.idPed}>{description}</label>
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
        onClick={sendActivity}
      >
        Enviar solicitud
      </Button>
    </div>
  );
};
export default Activity;
