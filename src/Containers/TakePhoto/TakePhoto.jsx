import React from 'react';
import { isIOS, isDesktop } from 'react-device-detect';

import TakePhotoDesktop from './Desktop/TakePhotoDesktop';
import TakePicture from './Android/TakePicture';
import TakePhotoIOS from './IOs/TakePhotoIOs';
import './takePhoto.scss';

const TakePhoto = (props) => {
  return (
    <>
      {isDesktop ? (
        // si el dispositivo es desktop mostramos este componente independientemente sea IOS, Windows o Linux
        <TakePhotoDesktop
          active={props.active}
          id={props?.id}
          title={props?.title}
          titleBlue={props?.titleBlue}
          contentText={props?.contentText}
          messageSuccess={props.messageSuccess}
          onChange={(data) => props.onChange(data)}
          file={(img) => {
            props?.file(img);
          }}
          next={() => props.next()}
          repeat={() => props.delete()}
        />
      ) : (
        <>
          {isIOS ? (
            // si el dispositivo es IOS mostramos este componente (aqui estamos hablando de versiones tablet y mobile)
            <>
              <TakePhotoIOS
                successfulUpload={props?.successfulUpload}
                preview={props?.preview}
                channel={props?.channel}
                placeHolderImg={props?.placeHolderImg}
                TextButtonTake={props?.TextButtonTake}
                active={props.active}
                id={props?.id}
                title={props?.title}
                titleBlue={props?.titleBlue}
                contentText={props?.contentText}
                messageSuccess={props.messageSuccess}
                onChange={(data) => props.onChange(data)}
                file={(img) => {
                  props?.file(img);
                }}
                next={() => props.next()}
                repeat={() => props.delete()}
              />
            </>
          ) : (
            // sino el dispositivo es Android

            <>
              <TakePicture
                facingMode={props?.facingMode}
                preview={props?.preview}
                channel={props?.channel}
                active={props.active}
                id={props?.id}
                title={props?.title}
                titleBlue={props?.titleBlue}
                contentText={props?.contentText}
                messageSuccess={props.messageSuccess}
                onChange={(data) => props.onChange(data)}
                file={(img) => {
                  props?.file(img);
                }}
                next={() => props.next()}
                repeat={() => props.delete()}
                successfulUpload={props?.successfulUpload}
              />
            </>
          )}
        </>
      )}
    </>
  );
};
export default TakePhoto;
