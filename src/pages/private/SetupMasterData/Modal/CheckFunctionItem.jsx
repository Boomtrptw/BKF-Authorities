import React, { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import clsx from "clsx";

const CheckFuncItem = React.memo(({ func, checkedFuncs, handleToggleFunc }) => {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen && hasAnyChildChecked(func)) {
      setIsOpen(true);
    }
  }, [checkedFuncs]);

  const hasAnyChildChecked = (f) => {
    if (!f.subFunction?.length) return false;
    return f.subFunction.some(
      (child) =>
        checkedFuncs[child.name] || hasAnyChildChecked(child)
    );
  };

  const toggleFuncOpen = () => {
    if (func.subFunction?.length > 0) setIsOpen(!isOpen);
  };

  return (
    <li className={clsx({ open: isOpen })}>
      <div className="d-flex align-items-center gap-5 mr-15">
        <input
          type="checkbox"
          checked={!!checkedFuncs[func.name]}
          onChange={() => handleToggleFunc(func)}
        />
        <div
          onClick={toggleFuncOpen}
          style={{ cursor: func.subFunction?.length > 0 ? "pointer" : "default" }}
        >
          {func.name}
        </div>
      </div>
      {func.subFunction?.length > 0 && (
        <IoMdArrowDropdown
          className="arrow-toggle"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      )}
      {isOpen && (
        <ul>
          {func.subFunction.map((subFunc, idx) => (
            <CheckFuncItem
              key={idx}
              func={subFunc}
              checkedFuncs={checkedFuncs}
              handleToggleFunc={handleToggleFunc}
            />
          ))}
        </ul>
      )}
    </li>
  );
});

export default CheckFuncItem;
