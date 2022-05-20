import React from 'react';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
import { toast } from 'react-toastify';

import { Button, Container } from '../../../Components';
import Footer from '../../Footer/Footer';
import PlaceHolder from '../../../Assets/placeholder-selfie.svg';
import { RequireContext } from '../../../Context';
import './takePhotoIOs.scss';

import { api } from '../../../Connection/Connection';

const TakePhoto = (props) => {
  const [require] = React.useContext(RequireContext); // Llamamos el contexto de require

  const [first, setFirst] = React.useState(false);
  const [imgResponsive, setImgResponsive] = React.useState(
    props?.placeHolderImg ? props?.placeHolderImg : PlaceHolder
  );
  const [picture, setPicture] = React.useState('');
  const [successfulUpload, setSuccessfulUpload] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);

  const imgRef = React.useRef(props.id);

  const previewFile = () => {
    const file = imgRef.current.files[0];

    if (file) {
      setFirst(true); // ocultamos el boton de siguiente
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        // devolvemos el archivo
        // props.onChange(reader.result); // convertimos el archivo a base 64 y lo devolvemos
        props.onChange(file);
        setPicture(URL.createObjectURL(file));
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

      // if (!toast.isActive('successToastID')) {
      //   toast.success('Muy bien, continua al siguiente paso', {
      //     position: 'top-center',
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: false,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     toastId: 'successToastID',
      //   });
      // }
    } else {
      props.repeat(); // disparamos el evento para reiniciar 'el ultimo paso'
      setFirst(false); // ocultamos el boton de siguiente
      setImgResponsive(props?.placeHolderImg ? props?.placeHolderImg : PlaceHolder);
      localStorage.setItem(`photo-${props.id}`, '');
    }
  };

  const reset = () => {
    setPicture('');
    setImgResponsive(props?.placeHolderImg ? props?.placeHolderImg : PlaceHolder);
    setFirst(false);
    setSuccessfulUpload(false);
    props.delete(); // disparamos el evento para reiniciar 'el ultimo paso'
    imgRef.current?.click();
  };

  const validate = async () => {
    const payload = {
      phone: require.phone,
      channel: require.channel,
      email: require.email,
    };
    const endpoint = `${api.domainServer}/api/request/validate`;
    const config = {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(endpoint, config);
      const res = await response.json();
      console.log(res);
      if (res === true) {
        setRegistered(true);
        toast.error(`Detectamos que ya posee una cuenta`, {
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
      }
    } catch (err) {
      console.log('ERROR');
      console.log(err);
    }
  };

  const FooterShwitch = () => {
    if (!first) {
      return (
        <Footer contentAlign="center" align={window.innerWidth < 1200 ? 'center' : 'right'} column>
          <Button
            id={`${props.id}-takePhoto`}
            full
            disabled={registered}
            ben={props?.channel === 'BEN'}
            color="primary"
            as="label"
            htmlFor={props.id}
            icon={<PhotoCameraOutlinedIcon />}
          >
            {props.TextButtonTake}
          </Button>
        </Footer>
      );
    }

    if (props?.channel === 'BEN') {
      return (
        <Footer align="center" column>
          <Button
            id={`${props.id}-repetir`}
            ben
            full
            color="tertiary"
            onClick={() => {
              reset();
            }}
            htmlFor={props.id}
            icon={<LoopOutlinedIcon />}
          >
            <span className="text-repeat">Repetir foto</span>
          </Button>
          <Button
            ben
            full
            color="primary"
            disabled={!successfulUpload}
            onClick={() => {
              props?.next();
            }}
            icon={<CheckOutlinedIcon />}
          >
            Siguiente
          </Button>
        </Footer>
      );
    }

    return (
      <Footer align="right">
        <Button
          color="primary"
          disabled={!successfulUpload}
          onClick={() => {
            props?.next();
          }}
          icon={<CheckOutlinedIcon />}
        >
          Siguiente
        </Button>
      </Footer>
    );
  };

  React.useEffect(() => {
    validate();
  }, []);
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
    if (require.document === '::REPETIR::' && props.id === 'Document') {
      const repeat = document.querySelector(`#${props.id}-repetir`);
      repeat?.click();
    }
  }, [require.document]);

  React.useEffect(() => {
    if (require.document === '::REPETIR::' && props.id === 'Document' && !first) {
      const take = document.querySelector(`#${props.id}-takePhoto`);
      take?.click();
    }
  }, [first]);

  return (
    <Container>
      <div className="container-camera">
        <input
          id={props.id}
          ref={imgRef}
          type="file"
          className="photo-file"
          accept="image/*"
          capture="user"
          onChange={() => {
            previewFile();
          }}
        ></input>

        {/* Vista responsive */}

        {picture !== '' ? (
          <div className="preview-container-rs">
            {/* <div
              className={`ic-delete-take ${picture === '' ? 'hidden' : ''}`}
              onClick={() => {
                reset();
              }}
            >
              <img src={Repeat} alt="repeat-photo" />
              <span className="text-repeat">Repetir Foto</span>
            </div> */}

            <img
              id={`${props.id}-show-image-rs`}
              className="show-image-rs"
              src={picture === '' ? imgResponsive : picture}
              alt=""
            />
          </div>
        ) : (
          <div className="preview-container-rs">
            <img
              id={`${props.id}-show-image-rs`}
              className="image-default"
              src={imgResponsive}
              alt=""
            />
          </div>
        )}

        {successfulUpload ? (
          <div className="text-wrapper">
            <h4 className="title">
              <span className="ben-color text-bold">¡Captura exitosa!</span>
            </h4>
          </div>
        ) : (
          <div className="text-wrapper">
            <h4 className="title">
              {props?.title} <span className="text-blue">{props?.titleBlue}</span>
            </h4>
            <p className="content">{props?.contentText}</p>
          </div>
        )}

        <FooterShwitch />
      </div>
    </Container>
  );
};
export default TakePhoto;
