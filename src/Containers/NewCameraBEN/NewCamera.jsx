import React from 'react';
import { toast } from 'react-toastify';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import Footer from '../Footer/Footer';
import Button from '../../Components/Button/Button';
import Camera from '../../Components/Camera/Camera';
import { domainServer } from '../../Connection/Connection';
import './newcamera.scss';
import Loading from '../Loading/Loading';
import { RequireContext } from '../../Context/Require/Require';

const Newcamera = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [require, setRequire] = React.useContext(RequireContext); // Llamamos el contexto de require
  const [image, setImage] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const uploadPhoto = (img) => {
    let endpoint = `${domainServer}/api/aws/upload/`;
    let config = {};

    setLoading(true);

    if (typeof img === 'string') {
      // si la imagen es base64 cambiamos el endpoint
      endpoint = `${domainServer}/api/aws/upload/image`;
      config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ upload: img }),
      };
    } else {
      const formData = new FormData();
      formData.append('upload', img);
      config = {
        method: 'POST',
        body: formData,
      };
    }

    fetch(endpoint, config)
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
        setSuccess(true);

        setRequire((prevState) => {
          return { ...prevState, selfie: res.image };
        });

        const aux = require.requestImage;
        aux.push({ image: { id: res.id } });

        setRequire((prevState) => {
          return { ...prevState, requestImage: aux };
        });

        toast.success('Excelente trabajo!', {
          position: 'top-center',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          hideProgressBar: true,
          closeButton: false,
        });
      })
      .catch((err) => {
        setSuccess(false);
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
      });
  };
  return (
    <>
      {loading ? <Loading /> : null}
      <Camera
        facingMode="user"
        delete={() => props?.delete()}
        photo={(img) => {
          setImage(img);
          uploadPhoto(img);
        }}
      >
        <div className="content">
          <p className="title">
            ¡Capture una selfie
            <span className="ben-color text-bold"> mire de frente a la cámara!</span>
          </p>
          <div className="text">
            Para mejorar el reconomiento facial, ubíquese en un lugar con buena luz y no cubra su
            rostro.
          </div>
        </div>

        {image !== '' ? (
          <Footer align="center" column>
            <div className="buttons-repeat ">
              <Button
                ben
                full
                color="tertiary"
                onClick={() => {
                  window.history.back();
                }}
              >
                Cancelar
              </Button>
              <Button
                ben
                full
                color="primary"
                disabled={!success}
                onClick={() => {
                  props?.next();
                }}
                icon={<CheckOutlinedIcon />}
              >
                Siguiente
              </Button>
            </div>
          </Footer>
        ) : null}
      </Camera>
    </>
  );
};
export default Newcamera;
