import { toast } from "react-toastify";
import "../../Components/Toast/toast.scss";

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
const error = (
  title = "",
  msg = "",
  short = false,
  config = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: true,
    closeButton: true,
  }
) => {
  config.className = short ? "toast-short" : "";

  toast.error(
    <div className="text-toast">
      <strong>{title}</strong>
      <p> {msg}</p>
    </div>,
    config
  );
};

export { info, success, warning, error };
