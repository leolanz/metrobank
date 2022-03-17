import React from 'react';

import { toast } from 'react-toastify';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import VideocamOffOutlinedIcon from '@material-ui/icons/VideocamOffOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Button } from '../../../Components';
import Footer from '../../Footer/Footer';
import AddImg from '../../../Assets/add-image.svg';

import './takePhotoDesktop.scss';

const customId = 'custom-id-error-desktop';

const width = 600;
const height = 600;

const TakePhotoDesktop = (props) => {
  const [picture, setPicture] = React.useState('');
  const [notFoundDevice, setNotFoundDevice] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const uploadFile = () => {
    const file = document.querySelector(`#${props.id}-file-upload`).files[0];
    if (file) {
      setPicture(URL.createObjectURL(file));
      setNotFoundDevice(false);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        props.onChange(reader.result); // convertimos el archivo a base 64 y lo devolvemos
        setPicture(URL.createObjectURL(file));
        setNotFoundDevice(false);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

      if (!toast.isActive('successToastID')) {
        // toast.success('Muy bien, continua al siguiente paso', {
        //   position: 'top-center',
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: false,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   toastId: 'successToastID',
        // });
      }
    } else {
      props.repeat(); // disparamos el evento para reiniciar 'el ultimo paso'
      setNotFoundDevice(false);
      setPicture('');
    }
  };

  const start = (mode) => {
    // funcion para iniciar la camara
    setLoading(true);

    navigator.mediaDevices
      ?.getUserMedia({
        audio: false,
        video: { width: 300, height: 300, facingMode: 'user' },
      })
      .then((stream) => {
        setLoading(false);

        const video = document.querySelector(`#${props.id}-show-video`);
        if (video) {
          video.srcObject = stream;
          video.onloadedmetadata = (e) => {
            video.play();
          };
        }
      })
      .catch((err) => {
        setLoading(false);
        let error = err;
        if (`${err}` === 'NotFoundError: Requested device not found') {
          error = 'No encontramos ningun dispositivo';

          setNotFoundDevice(true);
        }

        if (`${err}` === 'NotReadableError: Could not start video source') {
          // hacemos una llamada recursiva para que levante la camara

          setNotFoundDevice(true);
        }
        if (`${err}` !== 'NotReadableError: Could not start video source') {
          // si es distinto al error entonces mostramos el mensaje
          // toast.error(`${error} `, {
          //   toastId: customId,
          //   position: 'top-center',
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: false,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: 0,
          // });
        }
      });
  };
  const stop = new Promise((resolve, reject) => {
    // esta funcion es para detener todas las pistas de la camara
    const video = document.querySelector(`#${props.id}-show-video`);
    if (video?.srcObject?.getTracks()) {
      video?.srcObject?.getTracks()?.forEach((track, index, array) => {
        if (index === array.length - 1) {
          resolve();
        }
        track?.stop();
      });
    } else {
      resolve();
    }
  });
  const takePhoto = () => {
    const canvas = document.querySelector('#canvas');
    const video = document.querySelector(`#${props.id}-show-video`);

    canvas.width = width;
    canvas.height = height;

    canvas.getContext('2d').translate(width, 0);
    canvas.getContext('2d').scale(-1, 1);
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    const data = canvas.toDataURL('image/png');
    stop.then(() => {
      setPicture(data);
      // setFirst(true);
      props?.onChange(props?.onChange(data)); // devolvemos el objeto
      // toast.success(props?.messageSuccess ? props?.messageSuccess : 'Excelente trabajo!', {
      //   position: 'top-center',
      //   autoClose: 3000,
      //   closeOnClick: false,
      //   pauseOnHover: true,
      //   draggable: true,
      //   hideProgressBar: true,
      //   closeButton: false,
      // });
    });
  };
  const repeat = () => {
    props?.repeat();
    setPicture('');
    start();
  };

  React.useEffect(() => {
    if (props?.active) {
      start();
    }
  }, [props.active]);

  const Content = () => {
    if (picture) {
      return (
        <>
          <img
            src={picture}
            height={height}
            width={width}
            id={`${props.id}-photo`}
            className="photo"
            alt="photo"
          />
        </>
      );
    }
    if (notFoundDevice) {
      return (
        <>
          <div className="notDevices-wrapper">
            <div className="ic-notDevices">
              <VideocamOffOutlinedIcon />
            </div>
            <div className="text-notDevices">
              <p>
                Conecte un dispositivo o verifique que su cámara web no esté siendo utilizada por
                otra aplicación.
              </p>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <video
          height={height}
          width={width}
          muted
          autoPlay
          id={`${props.id}-show-video`}
          className={`video inverted ${picture !== '' ? 'hidden' : ''}`}
        ></video>
      </>
    );
  };

  return (
    <>
      <div className="container-camera">
        <canvas id="canvas"></canvas>

        <div className="preview-container-desk">
          <input
            type="file"
            id={`${props.id}-file-upload`}
            className="input-file-hidden"
            accept="image/*"
            onChange={(e) => {
              uploadFile();
            }}
          />
          <h3>{`${props?.title} ${props?.titleBlue}`}</h3>

          <div className={`camera-container ${notFoundDevice && picture === '' ? 'dashed' : ''}`}>
            {loading ? <CircularProgress /> : <Content />}
          </div>

          <Footer align="space-around" contentAlign={window.innerWidth < 1200 ? 'right' : 'center'}>
            <div className="footer-left">
              <div className="btn-oval">
                <InfoOutlinedIcon />
              </div>
              {/* <label htmlFor={`${props.id}-file-upload`}>
                <div className="btn-oval">
                  <CloudUploadOutlinedIcon />
                </div>
              </label> */}
            </div>
            <div className="footer-center">
              {picture ? (
                <Button
                  className="btn-take-camera"
                  onClick={() => {
                    repeat();
                  }}
                >
                  <DeleteOutlineOutlinedIcon fontSize="large" />
                </Button>
              ) : (
                <Button
                  className={`btn-take-camera ${notFoundDevice || loading ? 'disabled' : ''}`}
                  onClick={() => {
                    if (!notFoundDevice && !loading) {
                      // si hay dispositivo de camara conectado podemos llamar a la accion
                      takePhoto();
                    }
                  }}
                >
                  <CameraAltOutlinedIcon fontSize="large" />
                </Button>
              )}
            </div>
            <div className="footer-right">
              <Button color="tertiary" onClick={() => props.next()} icon={<CloseOutlinedIcon />}>
                Cancelar
              </Button>
              <Button
                color="primary"
                disabled={picture === ''}
                onClick={() => props.next()}
                icon={<CheckOutlinedIcon />}
              >
                Siguiente
              </Button>
            </div>
          </Footer>
        </div>
      </div>
    </>
  );
};
export default TakePhotoDesktop;
