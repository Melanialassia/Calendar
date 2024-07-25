


const CreateEvent = () => {
  return (
    <div className="flex flex-col mx-auto justify-center items-center  w-full mt-6 bg-pink-100">
      <h1>Añade un nuevo paciente</h1>

      <input
        type="text"
        placeholder="Añade un título"
        className="mt-1 block w-4/5 p-2 border border-gray-300 rounded-md  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default CreateEvent;
