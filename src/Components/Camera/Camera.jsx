import React from 'react';
import { toast } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import FlipCameraIosOutlinedIcon from '@material-ui/icons/FlipCameraIosOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';

import Footer from '../../Containers/Footer/Footer';
import Button from '../Button/Button';
import './camera.scss';

const Waiting = () => {
  return (
    <div className="wainting">
      <CircularProgress />
    </div>
  );
};

const Camera = (props) => {
  const videoRef = React.useRef();
  const canvasRef = React.useRef();
  const [preview, setPreview] = React.useState('');
  const [wait, setWait] = React.useState(true);

  const start = () => {
    // funcion para iniciar la camara
    setWait(true);
    navigator.mediaDevices
      ?.getUserMedia({
        audio: false,
        video: {
          width: { min: 480, ideal: 2828 }, // resolucuion ideal 2160x2160= 4.6MB
          height: { min: 480, ideal: 2828 }, // resolucion minina 480x480= 2.3MB
          facingMode: props.facingMode,
        },
      })
      .then((stream) => {
        setWait(false);
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.onloadedmetadata = (e) => {
            video.play();
          };
        }
      })
      .catch((err) => {
        setWait(false);

        let error = err;
        if (`${err} ` === 'NotFoundError: Requested device not found') {
          error = 'No encontramos ningun dispositivo';
        }
        if (`${err} ` === 'NotReadableError: Could not start video source') {
          // hacemos una llamada recursiva para que levante la camara
          toast.error('Otra aplicacion puede estar ocupando la camara', {
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
        if (`${err} ` !== 'NotReadableError: Could not start video source') {
          // si es distinto al error entonces mostramos el mensaje
          toast.error(`${err} `, {
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
  const stop = new Promise((resolve) => {
    const video = videoRef.current;

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
  const takePhoto = () => {
    const withCanvas = window.innerWidth;
    canvasRef.current.width = withCanvas;
    canvasRef.current.height = withCanvas;

    const canvasContext = canvasRef.current.getContext('2d');

    if (props.facingMode === 'user') {
      // giramos horizontalmente la imagen
      canvasContext.translate(withCanvas, 0);
      canvasContext.scale(-1, 1);
    }

    canvasContext.drawImage(videoRef.current, 0, 0, withCanvas, withCanvas);
    const data = canvasRef.current.toDataURL('image/jpeg');

    stop.then(() => {
      setPreview(data);
      props.photo(data);
    });
  };
  const repeat = () => {
    setPreview('');
    start();
    props?.delete();
  };
  React.useEffect(() => {
    if (props.active) {
      start();
    } else {
      stop.then(() => {});
    }
  }, [props.active]);

  React.useEffect(() => {
    stop.then(() => {
      start();
    });
  }, []);

  const Show = () => {
    if (preview !== '')
      return (
        <>
          <div className="picture">
            <img
              src={preview}
              height={window.innerWidth}
              width={window.innerWidth}
              alt="photo"
              className="photo"
            />
            <div className="ic-delete">
              <DeleteOutlineOutlinedIcon color="primary" onClick={() => repeat()} />
            </div>
          </div>
        </>
      );
    if (wait) return <Waiting />;

    return (
      <>
        <div className="video-container">
          <video
            ref={videoRef}
            muted
            autoPlay
            className={`video ${props.facingMode === 'user' ? 'inverted' : ''}`}
          ></video>
        </div>
        {/* {!props?.facingMode ? (
              <div className="ic-camera change-camera" onClick={changeCamera}>
                <FlipCameraIosOutlinedIcon color="primary" />
              </div>
            ) : null} */}
      </>
    );
  };

  return (
    <>
      <div className="camera-container">
        <Show />
        <div>{props.children}</div>
        {preview === '' ? (
          <Footer align="center" contentAlign="center">
            <Button className="btn-take-camera" onClick={takePhoto}>
              <CameraAltOutlinedIcon fontSize="large" />
            </Button>
          </Footer>
        ) : null}
      </div>
      <canvas ref={canvasRef} className="canvas"></canvas>
    </>
  );
};
export default Camera;
