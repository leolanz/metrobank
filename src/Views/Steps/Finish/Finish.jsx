import React from 'react';

import { Button } from '../../../Components';
import { Footer } from '../../../Containers';

import FinishBenCheckImg from '../../../Assets/finish-check-ben.svg';
import FinishBenPerson from '../../../Assets/finish-ben.svg';

import './finish.scss';
import { RequireContext } from '../../../Context';

const Finish = (props) => {
  const [show, setShow] = React.useState(false);
  const [require] = React.useContext(RequireContext); // Llamamos el contexto de require

  const FinishBen = () => {
    const Finish1 = () => {
      return (
        <>
          <div className="finish-wrapper">
            <div className="content">
              <div className="img-box">
                <img
                  className="image-finish"
                  src={FinishBenPerson}
                  alt="finish-ben"
                  align="center"
                />
              </div>

              <h3 className="title text-bold ">
                ¡{require.name}, hemos validado su identidad
                <p className="ben-color"> correctamente!</p>
              </h3>

              <p className="paragraph">
                Recibirá un mensaje de texto en su celular con un código de verificación y podrá
                configurar su PIN.
              </p>
            </div>
            <Footer align="center" column>
              <div className="buttons-repeat ben">
                <a
                  className="btn-primary full ben"
                  href={`${require.returnFinish}?requestId=${require.requestId}`}
                >
                  Siguiente
                </a>
              </div>
            </Footer>
          </div>
        </>
      );
    };

    const Finish2 = () => {
      return (
        <>
          <div className="finish-wrapper">
            <div className="content">
              <div className="img-box">
                <img
                  className="image-finish"
                  src={FinishBenCheckImg}
                  alt="finish-ben"
                  align="center"
                />
              </div>

              <h3 className="title blue">¡Hemos recibido su solicitud!</h3>

              <p>
                Nuestra Área de Atención al cliente estará evaluando su solicitud y próximamente
                será contactado.{' '}
              </p>
            </div>
            <Footer align="center" column>
              <div className="buttons-repeat ben">
                <a
                  className="btn-primary full ben"
                  href={`${require.returnFinish}?requestId=${require.requestId}`}
                >
                  Finalizar
                </a>
              </div>
            </Footer>
          </div>
        </>
      );
    };
    return <Finish1 />;
  };

  const FinishOther = () => {
    return (
      <>
        <div className="finish-wrapper">
          {!show ? (
            <div className="content">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="64" height="64" rx="32" fill="#7CB342" />
                <path d="M16 33L26.6667 44L48 22" stroke="white" strokeWidth="2" />
              </svg>

              <h3 className="title">Tu proceso ha sido realizado exitosamente!</h3>

              <p>Aquí va un texto que esta por definirse</p>
            </div>
          ) : (
            <div className="content">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="64" height="64" rx="32" fill="#006EF8" />
                <path d="M16 33L26.6667 44L48 22" stroke="white" strokeWidth="2" />
              </svg>

              <h3 className="title">Muchas gracias!</h3>

              <p>
                Has culminado el proceso de solicitud. Nuestra área de atención al cliente estará
                evaluando y próximamente serás contactado.
              </p>
            </div>
          )}
          <Footer align="center">
            <Button
              onClick={() => {
                setShow(!show);
              }}
            >
              Finalizar
            </Button>
          </Footer>
        </div>
      </>
    );
  };
  return <>{props?.channel === 'BEN' ? <FinishBen /> : <FinishOther />}</>;
};
export default Finish;
