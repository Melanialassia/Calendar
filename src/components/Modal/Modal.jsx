const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 mx-auto h-full w-full flex justify-center items-center bg-gray-transparent z-50">
      <div className=" relative rounded-lg w-96 h-96 p-4 bg-white">
        <button
          onClick={onClose}
          className=" absolute p-2.5 right-3 rounded-lg transition-all duration-300 hover:bg-gray-100"
        >
          <img src="/logo/cross.png" alt="cruz" className="w-7 transition-transform duration-300 hover:animate-rotate-scale" />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
