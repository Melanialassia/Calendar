//HOOKS
import { useState } from "react";
//COMPONENTS
import MyCalendar from "./components/MyCalendar/MyCalendar";
import FormEvent from "./components/FormEvent/FormEvent";
import LateralMenu from "./components/LateralMenu/LateralMenu";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";
import { store } from "./store/store";

function App() {
  const { filterEvent, getEvents } = store();

  //manipulacion vistas
  const [dateSelected, setDateSelected] = useState();
  const [view, setView] = useState("month");
  // manipulacion de modal y valores
  const [initialValues, setInitialValues] = useState({});
  const [isEditting, setIsEditting] = useState(false);
  const [modal, setModal] = useState(false);

  const getRandomId = (num) => {
    //le creo un id random a evento
    return Math.floor(Math.random() * num);
  };

  const openCreateModal = ({ start, end }) => {
    const idResult = getRandomId(2000);

    const defaultValue = new Date(2021, 8, 16, 18, 30);

    const now = start || defaultValue;
    const hourEnd = end || new Date(now.getTime() + 30 * 60000);

    getEvents();
    setInitialValues({
      id: idResult,
      title: "",
      start: now,
      end: hourEnd,
    });
    setModal(true);
  };

  const openEditModal = (info) => {
    setInitialValues(info);
    getEvents();
    setIsEditting(true);
    setModal(true);
  };

  const closeModal = () => {
    setIsEditting(false);
    setModal(false);
  };

  //manipulacion de filtrados
  const handleFilterChange = (e) => {
    filterEvent(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar openCreateModal={openCreateModal} />
      <div className=" flex flex-col lg:flex-row mx-auto p-4 h-full w-full">
        <LateralMenu
          setDateSelected={setDateSelected}
          handleFilterChange={handleFilterChange}
        />
          <MyCalendar
            openCreateModal={openCreateModal}
            openEditModal={openEditModal}
            setDateSelected={setDateSelected}
            dateSelected={dateSelected}
            setView={setView}
            view={view}
          />
        <Modal show={modal} closeModal={closeModal}>
          <FormEvent
            setInitialValues={setInitialValues}
            setIsEditting={setIsEditting}
            initialValues={initialValues}
            isEditting={isEditting}
            closeModal={closeModal}
          />
        </Modal>
      </div>
    </div>
  );
}

export default App;
