import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = (message, type) => {
  switch (type) {
    case 1:
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss:false,
        draggable: true,
        progress: undefined,
      });
      break;
    case 2:
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss:false,
        draggable: true,
        progress: undefined,
      });
      break;
    default:
      break;
  }
};
export default Toast;
