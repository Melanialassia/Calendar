import { useState } from "react";

const EventFilter = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="flex mt-5 transition-all duration-300 rounded hover:bg-gray-100">
      <button onClick={handleClose} className="flex justify-between items-center space-x-2 p-2 border-none h-full w-full">
          <p className="font-bold text-lg text-center text-zinc-700">Mi calendario</p>
          <img
            src={open ? "/logo/up.png" : "/logo/down.png"}
            alt="abrir"
            className="w-4"
          />
        </button>
      </div>
      {open && (
       <div className="mt-1 p-4 border-hidden rounded shadow-inset-custom bg-white ">
       <ul className="flex flex-col justify-center items-start">
         <li className="mt-1">
           <input type="checkbox" id="mañana" className="mr-4 text-blue-600 border-2 border-blue-600 focus:ring-blue-600" />
           <label htmlFor="mañana" className="text-zinc-700">Mañana</label>
         </li>
         <li className=" mt-1">
           <input type="checkbox" id="mediodia" className="mr-4 text-green-600 border-2 border-green-600 focus:ring-green-600 " />
           <label htmlFor="mediodia" className="text-zinc-700">Mediodía</label>
         </li>
         <li className=" mt-1">
           <input type="checkbox" id="tarde" className="mr-4 text-orange-600 border-2 border-orange-600 focus:ring-orange-600" />
           <label htmlFor="tarde" className="text-zinc-700">Tarde</label>
         </li>
       </ul>
     </div>
      )}
    </div>
  );
};

export default EventFilter;
