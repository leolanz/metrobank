import React from 'react';
import { useHistory } from 'react-router-dom';

import './landing.scss';
import VideocamIcon from '@material-ui/icons/Videocam';
import CheckIcon from '@material-ui/icons/Check';

import { Button, Container } from '../../Components';
import { Header, Footer } from '../../Containers';
import Logo from '../../Assets/logo-ben.svg';
import { RequireContext } from '../../Context';

const Landing = (props) => {
  const [require, setRequire] = React.useContext(RequireContext); // Llamamos el contexto de require
  const history = useHistory();

  React.useEffect(() => {
    if (props?.channel === 'BEN') {
      setRequire((prevState) => {
        return {
          ...prevState,
          ...{
            channel: 'BEN',
          },
        };
      });
    }
  }, []);
  return (
    <>
      <Header
        leftTitle="Regresar"
        channel={props?.channel}
        back={() => {
          console.log('aqui');
          history.goBack();
        }}
      />
      <Container>
        <div className="landing-rs">
          <div className="content">
            <img src={Logo} alt="informacion" className="imagen-info" />

            {props?.channel === 'BEN' ? (
              <div className="text">
                <p className="text-center-ben">
                  Para abrir una cuenta en la billetera BEN,
                  <span className="color-ben"> necesitará su cédula.</span>
                </p>
                {/* <p className="text-center text-light">
                  Es muy facil. En 3 simples pasos podras abrir una cuenta siendo nacional o
                  extranjero.
                </p> */}
              </div>
            ) : (
              <div className="text">
                <h3 className="text-center">
                  Para abrir una cuenta nueva, necesitaras tu cedula de identidad laminada
                </h3>
                <p className="text-center text-light">
                  Es muy facil. En 3 simples pasos podras abrir una cuenta siendo nacional o
                  extranjero.
                </p>
              </div>
            )}
          </div>

          <Footer align={props?.channel === 'BEN' ? 'center' : 'right'}>
            {props?.channel === 'BEN' ? (
              <Button
                color="primary"
                href={props?.channel ? '/BEN/selfie' : '/selfie'}
                onClick={() => {}}
                full
                ben
                icon={<CheckIcon />}
              >
                Comenzar
              </Button>
            ) : (
              <>
                <Button color="tertiary">Cancelar</Button>

                <Button
                  color="primary"
                  href={props?.channel ? `/BEN/selfie?hola=21` : '/selfie'}
                  onClick={() => {}}
                >
                  Ok, entendido
                </Button>
              </>
            )}
          </Footer>
        </div>
      </Container>
      <div className="landing-desk">
        <h4 className="title">
          Banco Nacional de Panamá, necesita permisos en tu navegador. Presiona para que puedas usar
          la cámara.
        </h4>
        <p className="text">
          Las fotos únicamente serán utilizadas para realizar el proceso Onboarding y solicitar la
          apertura de una cuenta.
        </p>
        <Button color="primary" href="/selfie" icon={<VideocamIcon />}>
          Usar mi Cámara
        </Button>
      </div>
    </>
  );
};

export default Landing;
