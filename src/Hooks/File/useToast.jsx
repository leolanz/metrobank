import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import warningIc from "../assets/icon/warning-icon.svg";
// import errorI from "../assets/icon/error-light.svg";

const info = (
  title = "",
  msg = "",
  short = false,
  config = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: false,
    closeButton: false,
  }
) => {
  config.className = short ? "toast-short" : "";

  toast.info(
    <div className="text-toast">
      <strong>{title}</strong>
      <p> {msg}</p>
    </div>,
    config
  );
};

const success = (
  title = "",
  msg = "",
  short = false,
  config = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: true,
    closeButton: false,
  }
) => {
  config.className = short ? "toast-short" : "";

  toast.success(
    <div className="text-toast">
      <strong>{title}</strong>
      <p> {msg}</p>
    </div>,
    config
  );
};

const warning = (
  title = "",
  msg = "",
  short = false,
  config = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: true,
    closeButton: false,
  }
) => {
  config.className = short ? "toast-short" : "";
  // config.icon= <img className="icon-custom" src={errorI} />;

  toast.warn(
    <div className="text-toast">
      <strong>{title}</strong>
      <p>{msg}</p>
    </div>,
    config
  );
};
/* const error = (
  err = "",
  msg = "",
  short = false,
  config = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: true,
    closeButton: true,
  }
) => {
  console.log(err);
  const Error = err?.response?.data?.message;
  const Error2 = err?.response?.data?.error;
  const Error3 = err?.message;
  const Error4 = err?.response?.data[0]?.coincidencia;
  const Error5 = err?.response?.data?.message;

  const title = Error5 ?? Error4 ?? Error3 ?? Error2 ?? Error;
  config.className = short ? "toast-short" : "";
  toast.error(
    <div
      style={{ display: "flex", alignItems: "center", gap: "10px" }}
      className="text-toast"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z"
          fill="#DA1414"
        />
      </svg>
      <strong>{title}</strong>
      <p> {msg}</p>
    </div>,
    config
  );
}; */

const error = (err) => {
  const Error = err?.response?.data?.message;
  const Error2 = err?.response?.data?.error;
  const Error3 = err?.message;
  const Error4 = err?.response?.data[0]?.coincidencia;
  const Error5 = err?.response?.data?.message;
  const title = Error5 ?? Error4 ?? Error3 ?? Error2 ?? Error;
  toast.error(title, {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export { info, success, warning, error };
