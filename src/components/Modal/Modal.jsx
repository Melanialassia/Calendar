
const Modal = ({ show, closeModal, children }) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 h-full w-full flex justify-center items-center bg-gray-transparent z-50">
      <div className=" relative rounded-lg w-400 max-w-lg mt-14 p-4 bg-white">
        <button
          onClick={closeModal}
          className=" absolute p-2.5 right-3 rounded-lg transition-all duration-300 hover:bg-gray-100"
        >
          <img src="/logo/cross.png" alt="cerrar" className="w-7 transition-transform duration-300 hover:animate-rotate-scale" />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
