import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  const notify = () => {
    toast.success(
      <div className="text-toast">
        <strong>Success!</strong>
        <p> Detailed description and advice about successful copywriting.</p>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      }
    );

    toast.info(
      <div className="text-toast">
        <strong>Important info!</strong>
        <p> Detailed description and advice about successful copywriting.</p>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      }
    );

    toast.warn(
      <div className="text-toast">
        <strong>Warning!</strong>
        <p> Detailed description and advice about successful copywriting.</p>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        // icon: <img className="icon-custom" src={warning} />,
        autoClose: false,
      }
    );

    toast.error(
      <div className="text-toast">
        <strong>Error!</strong>
        <p> Detailed description and advice about successful copywriting.</p>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      }
    );

    toast.success(
      <div className="text-toast">
        <strong>Success!</strong>
        <p> Detailed description and advice about successful copywriting.</p>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
      }
    );

    toast.info(
      <div className="text-toast">
        <strong>Important info!</strong>
        <p> Detailed description and advice about successful copywriting.</p>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
      }
    );

    toast.warn(
      <div className="text-toast">
        <strong>Warning!</strong>
        <p> Detailed description and advice about successful copywriting.</p>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        // icon: <img className="icon-custom" src={warning} />,
        autoClose: false,
        closeButton: false,
      }
    );

    toast.error(
      <div className="text-toast">
        <strong>Error!</strong>
        <p> Detailed description and advice about successful copywriting.</p>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
      }
    );

    toast.error(
      <div className="text-toast-title-short">
        <strong>Error!</strong>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        className: "toast-short",
      }
    );

    toast.info(
      <div className="text-toast-title-short">
        <strong>Important Info!</strong>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        className: "toast-short",
      }
    );

    toast.warn(
      <div className="text-toast-warning-short">
        <strong>Warning!</strong>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        // icon: <img className="icon-custom-short" src={warning} />,
        autoClose: false,
        closeButton: false,
        className: "toast-short",
      }
    );

    toast.success(
      <div className="text-toast-title-short">
        <strong>Success!</strong>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        className: "toast-short",
      }
    );

    toast.error(
      <div className="text-toast-title-short">
        <strong>Error!</strong>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        className: "toast-short",
      }
    );

    toast.info(
      <div className="text-toast-title-short">
        <strong>Important Info!</strong>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        className: "toast-short",
      }
    );

    toast.warn(
      <div className="text-toast-warning-short">
        <strong>Warning!</strong>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        // icon: <img className="icon-custom-short" src={warning} />,
        autoClose: false,
        className: "toast-short",
      }
    );

    toast.success(
      <div className="text-toast-title-short">
        <strong>Success!</strong>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        className: "toast-short",
      }
    );
  };

  return (
    <div>
      <button
        style={{ opacity: "0", position: "absolute", zIndex: "-3" }}
        onClick={notify}
      ></button>
      <ToastContainer />
    </div>
  );
};
export default Toast;
