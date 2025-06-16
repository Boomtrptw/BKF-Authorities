import { useState, createContext, useContext } from "react";
import Swal from "sweetalert2";

const appContext = createContext();

export const AppProvider = ({ children }) => {

  const [isTwoFactorRegister, setIsTwoFactorRegister] = useState(false);
  const [isTwoFactorVerify, setIsTwoFactorVerify] = useState(false);

  const [showSidebarMenu, setShowSidebarMenu] = useState(false);
  const [showLayoutBackdrop, setShowLayoutBackdrop] = useState(false);

  const showAlertConfirm = (title, text, callback) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn-alert btn-success",
        cancelButton: "btn-alert btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  };
  
  const showAlertAfterConfirm = (title, text, callback) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn-alert btn-success",
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: title,
      text: text,
      icon: "success",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  };

  const showAlertError = (icon) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn-alert btn-warning",
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Something went wrong",
      icon: icon,
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: "OK",
    });
  };
  
  const showAlertWarning = (icon, text) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn-alert btn-warning",
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Something went wrong!",
      text: text,
      icon: icon,
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: "OK",
    });
  };

  return (
    <appContext.Provider value={{ 
      showSidebarMenu, 
      setShowSidebarMenu, 
      showLayoutBackdrop, 
      setShowLayoutBackdrop, 
      showAlertConfirm, 
      showAlertAfterConfirm, 
      showAlertError, 
      showAlertWarning, 
      isTwoFactorRegister, 
      setIsTwoFactorRegister,
      isTwoFactorVerify, 
      setIsTwoFactorVerify
    }}>
      {children}
    </appContext.Provider>
  );

};

export const useGlobalContext = () => {
  return useContext(appContext);
};
