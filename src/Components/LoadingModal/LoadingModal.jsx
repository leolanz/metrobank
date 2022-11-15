import React, { memo } from "react";
import Lottie from "react-lottie";
import animationData from "../../Assets/lottie/finalLoader.json";
import "./LoadingModal.scss";
const LoadingModal = memo(() => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="LoadingModal">
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
});
LoadingModal.displayName = "LoadingModal";
export default LoadingModal;
