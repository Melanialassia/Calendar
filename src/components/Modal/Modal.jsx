const Modal = ({ show, onClose, children }) => {
  
    if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-transparent z-50">
      <div className=" relative mx-auto rounded-lg w-2/5 h-6/12 p-4 bg-white">
        <button onClick={onClose} className=" absolute right-10 cursor-pointer transition-all duration-300 rounded hover:bg-gray-200">
          <img src="/logo/cross.png" alt="cruz" className="w-6"/>
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
