import React, { memo, useRef, useEffect, useState } from "react";
import "./SelectInput.scss";
const SelectInput = memo(({ options, handleChangeSelect, selectedOption }) => {
  const modalRef = useRef(null);
  const [showOptions, setshowOptions] = useState(false);
  const onChange = (value) => {
    setshowOptions(false);

    handleChangeSelect(value);
  };

  const close = () => {
    setshowOptions(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        close();
      }
    }
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="select-input">
      <input
        onClick={() => setshowOptions(true)}
        placeholder="Seleccione Actividad Económica"
        readOnly
        defaultValue={selectedOption.name}
      />
      <svg
        onClick={() => setshowOptions(true)}
        width="10"
        height="5"
        viewBox="0 0 10 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0L5 5L10 0H0Z" fill="#364156" />
      </svg>

      <div
        ref={modalRef}
        className="optionList"
        data-variation={showOptions ? "show" : ""}
      >
        {options.map((econ, i) => {
          return (
            <div
              onClick={() => onChange(econ)}
              className="options"
              key={`econ-${i}`}
              data-variation={econ.id === selectedOption.id ? "selected" : ""}
            >
              {econ.name}
            </div>
          );
        })}
      </div>
    </div>
  );
});
SelectInput.displayName = "SelectInput";
export default SelectInput;
