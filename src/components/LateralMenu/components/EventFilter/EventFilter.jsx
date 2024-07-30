//STORE
import { store } from "../../../../store/store";

const EventFilter = ({ handleFilterChange }) => {
  const { filterEvent } = store();

  return (
    <div>
      <div className="flex mt-5 ">
        <h2 className="font-bold text-lg text-center text-zinc-700">Turnos</h2>
      </div>
      <div className="mt-1 p-4 border-hidden rounded shadow-inset-custom bg-white ">
        <select
          onChange={(event) =>handleFilterChange(event)}
          className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
        >
          <option value="todos">Todos</option>
          <option value="disponible">Disponible</option>
          <option value="ocupado">Ocupado</option>
        </select>
      </div>
    </div>
  );
};

export default EventFilter;
