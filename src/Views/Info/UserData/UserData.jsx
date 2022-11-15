import React from "react";
import { RequireContext } from "../../../Context";
import "./UserData.scss";
import { useHistory } from "react-router-dom";
const UserData = (props) => {
  const [require, setRequire] = React.useContext(RequireContext); // Llamamos el contexto de require
  const history = useHistory();
  return (
    <div className="user-info-container">
      <div className="data">
        <h3 className="title">
          Confirme que todos{" "}
          <span className="text-bold ben-color"> los datos sean correctos</span>
        </h3>
        <div className="info-row">
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
      </div>

      <div className="buttons">
        <button onClick={() => history.goBack()}>Algo anda mal</button>
        <button className="green"> Confirmar</button>
      </div>
    </div>
  );
};
export default UserData;
