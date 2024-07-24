import { useState } from "react";

const EventFilter = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="flex justify-center mt-5  transition-all duration-300  hover:bg-gray-transparent">
      <button onClick={handleClose} className="flex  space-x-2 p-2 border-none h-full w-full">
          <p>Mi calendario</p>
          <img
            src={open ? "/logo/up.png" : "/logo/down.png"}
            alt="abrir"
            className="w-4"
          />
        </button>
      </div>
      {open && (
       <div className="mt-2 p-2 border rounded bg-gray-100">
       <ul>
         <li className="flex items-center">
           <input type="checkbox" id="mañana" className="mr-2" />
           <label htmlFor="mañana">Mañana</label>
         </li>
         <li className="flex items-center mt-1">
           <input type="checkbox" id="mediodia" className="mr-2" />
           <label htmlFor="mediodia">Mediodía</label>
         </li>
         <li className="flex items-center mt-1">
           <input type="checkbox" id="tarde" className="mr-2" />
           <label htmlFor="tarde">Tarde</label>
         </li>
       </ul>
     </div>
      )}
    </div>
  );
};

export default EventFilter;
