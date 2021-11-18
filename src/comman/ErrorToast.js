import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// toast.configure();
async function ErrorToast(errormessage) {
  console.log("In error toast", errormessage);
  toast.error(errormessage, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export default ErrorToast;
