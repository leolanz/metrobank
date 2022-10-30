import React from "react";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import { Button, Modal } from "../../../Components";
import { Footer } from "../../../Containers";
import { RequireContext } from "../../../Context";
import "./UserData.scss";

const UserData = (props) => {
  const [modal, setModal] = React.useState(false);
  const [require, setRequire] = React.useContext(RequireContext); // Llamamos el contexto de require

  return (
    <>
      <div className="user-info-container">
        <Modal
          show={modal}
          title="Editar"
          close={() => {
            setModal(false);
          }}
        >
          {window.innerWidth < 1200 ? (
            <>
              <div className="edit-row">
                <p className="title">¿Qué deseas corregir?</p>
              </div>
              <div className="edit-row">
                <div className="content">
                  <p>Selfie</p>
                  <img
                    src={require.selfieCache}
                    alt=""
                    className="img-preview"
                  />
                </div>
                <div className="content-button">
                  <div
                    className={
                      props?.channel === "BEN"
                        ? "text-edit ben-color"
                        : "text-edit"
                    }
                    onClick={() => {
                      setModal(false);
                      props?.goTo(0);
                    }}
                  >
                    <p>Editar</p>
                  </div>
                </div>
              </div>
              <div className="edit-row">
                <div className="content">
                  <p>Documento de identidad</p>
                  <img
                    src={require.documentCache}
                    alt=""
                    className="img-preview"
                  />
                </div>
                <div className="content-button">
                  <div
                    className={
                      props?.channel === "BEN"
                        ? "text-edit ben-color"
                        : "text-edit"
                    }
                    onClick={() => {
                      setModal(false);
                      props?.goTo(1);
                    }}
                  >
                    <p>Editar</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="edit-wrapper">
                <div className="edit-col">
                  <div className="content">
                    <p>01. Selfie Upload</p>
                    <div className="img-wrapper">
                      <img
                        src={require.selfie}
                        alt=""
                        className="img-preview"
                      />
                      <span
                        className="text-edit"
                        onClick={() => {
                          setModal(false);

                          props?.goTo(0);
                        }}
                      >
                        Editar
                      </span>
                    </div>
                  </div>
                  <div className="separate"></div>
                  <div className="content">
                    <p>02. Cédula de identidad</p>
                    <div className="img-wrapper">
                      <img
                        src={require.document}
                        alt=""
                        className="img-preview"
                      />
                      <span
                        className="text-edit"
                        onClick={() => {
                          setModal(false);

                          props?.goTo(1);
                        }}
                      >
                        Editar
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* <div className="edit-row">
            <div className="text">02. Documento de identidad</div>
            <div className="image">
              <img src={require.document} alt="" className="img-preview" />

              <div
                className="btn-edit"
                onClick={() => {
                  alert('Edit 2');
                }}
              >
                <p>Editar</p>
              </div>
            </div>
          </div> */}
        </Modal>

        {props?.channel === "BEN" ? (
          <h3 className="title">
            Confirme que todos{" "}
            <span className="text-bold ben-color">
              {" "}
              los datos sean correctos
            </span>
            .
          </h3>
        ) : (
          <h3 className="title">
            Confirma que todos tus datos sean correctos.
          </h3>
        )}

        {props?.channel === "BEN" ? (
          <div className="editar-ben">
            {props?.channel !== "BEN" && (
              <div className="editar-ben-content">
                <Button
                  ben
                  color="tertiary"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  <EditOutlinedIcon />
                  Editar
                </Button>
              </div>
            )}
          </div>
        ) : null}
        <div className="info-row">
          <div className="info-col">
            <Button
              color="tertiary"
              onClick={() => {
                setModal(true);
              }}
            >
              <EditOutlinedIcon />
            </Button>
          </div>
          <div className="info-col">
            <div className="label">
              <p>ID Documento</p>
              <p className="data">{require.identificationDocument}</p>
            </div>
            <div className="label">
              <p>Expedida</p>
              <p className="data">{require.issued}</p>
            </div>
            <div className="label">
              <p>Expira</p>
              <p className="data">{require.expires}</p>
            </div>
            <div className="label">
              <p>Nombres</p>
              <p className="data">{require.name}</p>
            </div>
            <div className="label">
              <p>Apellidos</p>
              <p className="data">{require.lastName}</p>
            </div>
          </div>
          <div className="info-col">
            <div className="label">
              <p>F. Nacimiento</p>
              <p className="data">{require.dateOfBirth}</p>
            </div>
            <div className="label">
              <p>Nacionalidad</p>
              <p className="data">{require.nationality}</p>
            </div>
            <div className="label">
              <p>Lugar de Nac.</p>
              <p className="data">{require.placeBirth}</p>
            </div>
            <div className="label">
              <p>Sexo</p>
              <p className="data">{require.gender}</p>
            </div>
          </div>
        </div>

        <Footer align="center" column>
          <Button
            ben
            full
            color="primary"
            onClick={() => {
              props?.next();
            }}
            icon={<CheckOutlinedIcon />}
          >
            Confirmar
          </Button>
          <Button
            full
            ben
            color="tertiary"
            onClick={() => {
              console.log("click");
            }}
          >
            Cancelar
          </Button>
        </Footer>
      </div>
    </>
  );
};
export default UserData;
