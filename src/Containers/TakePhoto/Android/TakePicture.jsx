import React from 'react';
/* eslint-disable */

import { toast } from 'react-toastify';
import FlipCameraIosOutlinedIcon from '@material-ui/icons/FlipCameraIosOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
// import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import './takePicture.scss';
import { Button } from '../../../Components';

import { RequireContext } from '../../../Context';

import Footer from '../../Footer/Footer';
import { CircularProgress } from '@material-ui/core';

const TakePicture = (props) => {
  const FACING_MODE_USER = 'user';
  const FACING_MODE_ENVIRONMENT = 'environment';

  const [front, setFront] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [picture, setPicture] = React.useState('');
  const [first, setFirst] = React.useState(false);
  const [successfulUpload, setSuccessfulUpload] = React.useState(false);
  const [camera, setCamera] = React.useState(FACING_MODE_USER);

  const videoRef = React.useRef(null);
  const numeroDeRederizaciones = React.useRef(0);

  const width = window.innerWidth < 700 ? window.innerWidth : 700;
  const height = width;

  const stop = new Promise((resolve) => {
    //esta funcion es para detener todas las pistas de la camara
    // let video = document.querySelector(`#${props.id}-show-video`);

    let video = videoRef.current;

    if (video?.srcObject?.getTracks()) {
      video?.srcObject?.getTracks()?.forEach((track, index, array) => {
        if (index === array.length - 1) {
          video.srcObject = null;
          resolve();
        }
        track?.stop();
      });
    } else {
      resolve();
    }
  });

  const customId = 'custom-id-error';
  const start = (mode) => {
    //funcion para iniciar la camara
    setLoading(true);

    navigator.mediaDevices
      ?.getUserMedia({
        audio: false,
        video: {
          width: { min: 480, ideal: 6324 }, // resolucuion ideal 2160x2160= 4.6MB
          height: { min: 480, ideal: 6324 }, // resolucion minina 480x480= 2.3MB
          facingMode: mode ? mode : camera,
        },
      })
      .then((stream) => {
        setLoading(false);
        // let video = document.querySelector(`#${props.id}-show-video`);
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.onloadedmetadata = (e) => {
            video.play();
          };
        }
      })
      .catch((err) => {
        setLoading(false);
        var error = err;
        if (err + '' === 'NotFoundError: Requested device not found') {
          error = 'No encontramos ningun dispositivo';
        }
        if (err + '' === 'NotReadableError: Could not start video source') {
          //hacemos una llamada recursiva para que levante la camara
          start();
          // toast.error('Otra aplicacion puede estar ocupando la camara', {
          //   toastId: customId,
          //   position: 'top-center',
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: 0,
          //   closeButton: false,
          // });
        }
        if (err + '' !== 'NotReadableError: Could not start video source') {
          //si es distinto al error entonces mostramos el mensaje
          toast.error(err + '', {
            toastId: customId,
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            closeButton: false,
          });
        }
      });
  };

  const takePhoto = () => {
    let canvas = document.querySelector('#canvas');
    // let video = document.querySelector(`#${props.id}-show-video`);
    let video = videoRef.current;

    const withCanvas = 600;
    canvas.width = withCanvas;
    canvas.height = withCanvas;

    canvas.getContext('2d').drawImage(video, 0, 0, withCanvas, withCanvas);
    var data = canvas.toDataURL('image/jpeg', 1.0);

    // var a = document.createElement("a"); //Create <a>
    // a.href = data; //Image Base64 Goes here
    // a.download = "Image"; //File name Here
    // a.click(); //Downloaded file

    stop.then(() => {
      setPicture(data);
      setFirst(true);
      props?.onChange(props?.onChange(data)); //devolvemos el objeto
    });
  };

  const changeCamera = () => {
    if (front) {
      stop?.then(() => {
        setFront(!front);
        setCamera('environment');
      });
    } else {
      stop?.then(() => {
        setFront(!front);
        setCamera('user');
      });
    }
  };

  const repeat = () => {
    props?.delete();
    setPicture('');
    setFirst(false);
    setSuccessfulUpload(false);
    start();
  };

  React.useEffect(() => {
    // si tenemos una imagen cargada entonces la colocamos
    if (props?.preview !== undefined && props?.preview !== null && props?.preview !== '') {
      setPicture(props?.preview);
      setFirst(true);
    }
  }, [props?.preview]);

  React.useEffect(() => {
    if (
      props?.successfulUpload !== null &&
      props?.successfulUpload !== '' &&
      props?.successfulUpload !== undefined
    ) {
      setSuccessfulUpload(props?.successfulUpload);
    }
  }, [props?.successfulUpload]);

  React.useEffect(() => {
    //si tenemos una imagen cargada entonces la colocamos

    if (props?.preview !== undefined && props?.preview !== null && props?.preview !== '') {
      setPicture(props?.preview);
    }
    if (props.active) {
      if (props?.facingMode) {
        setFront(props?.facingMode === 'user');
        setCamera(props?.facingMode);
      }
      numeroDeRederizaciones.current = numeroDeRederizaciones.current + 1;
      if (numeroDeRederizaciones.current === 1 && props?.facingMode) {
        start(props?.facingMode);
      } else {
        start();
      }
    }
  }, [camera, props.active]);

  const Video = () => {
    return (
      <>
        {picture !== '' ? (
          <>
            <div className="picture">
              <img
                src={picture}
                height={height}
                width={width}
                id={`${props.id}-photo`}
                alt="photo"
                className={`photo`}
              />
              <div className="ic-delete">
                <DeleteOutlineOutlinedIcon color="primary" onClick={repeat} />
              </div>
            </div>
          </>
        ) : (
          <div className={`camera-container ${picture !== '' ? 'hidden' : ''}`}>
            <video
              ref={videoRef}
              muted
              autoPlay
              id={`${props.id}-show-video`}
              className={`video ${front ? 'inverted' : ''}`}
            ></video>
            {!props?.facingMode ? (
              <div className="ic-camera change-camera" onClick={changeCamera}>
                <FlipCameraIosOutlinedIcon color="primary" />
              </div>
            ) : null}
          </div>
        )}
      </>
    );
  };

  const Loading = () => {
    return (
      <>
        <div className="loading-camera">
          <CircularProgress />
        </div>
      </>
    );
  };

  const FooterSiwtch = () => {
    if (props?.channel === 'BEN') {
      return (
        <Footer align={'center'} column>
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
              disabled={!successfulUpload}
              onClick={() => {
                props?.next();
                start();
              }}
              icon={<CheckOutlinedIcon />}
            >
              Siguiente
            </Button>
          </div>
        </Footer>
      );
    }
    return (
      <Footer align={window.innerWidth < 1200 ? 'right' : 'center'}>
        <div className="buttons-repeat">
          <Button
            color="tertiary"
            onClick={() => {
              window.history.back();
            }}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            onClick={() => {
              props?.next();
              start();
            }}
            disabled={!successfulUpload}
            icon={<CheckOutlinedIcon />}
          >
            Siguiente
          </Button>
        </div>
      </Footer>
    );
  };
  return (
    <>
      <div className="camera">
        {loading ? <Loading /> : <Video />}

        <div className="text-wrapper">
          <h4 className="title">
            {props?.title} <span className="text-blue">{props?.titleBlue}</span>
          </h4>
          <p className="content">{props?.contentText}</p>
        </div>

        {!first ? (
          <Footer align="center" contentAlign="center">
            {/* <Button className="btn-take" onClick={takePhoto}></Button> */}
            <Button className="btn-take-camera" onClick={takePhoto}>
              <CameraAltOutlinedIcon fontSize="large" />
            </Button>
          </Footer>
        ) : (
          <FooterSiwtch />
        )}
        <canvas id="canvas"></canvas>
      </div>
    </>
  );
};

export default TakePicture;
