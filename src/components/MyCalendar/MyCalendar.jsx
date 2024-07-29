//HOOKS
import { useState, useEffect } from "react";
//LIBRARY
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es"); //traduccion al español
//STORE
import { store } from "../../store/store";
//STYLE
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./mycalendar.css";

const MyCalendar = ({
  openEditModal,
  openCreateModal,
  dateSelected,
  view,
  setView,
}) => {
  const { getEvents, events } = store();
  const localizer = dayjsLocalizer(dayjs);
  const [currentDate, setCurrentDate] = useState();

  useEffect(() => {
    getEvents();
    if (dateSelected) {
      setCurrentDate(new Date(dateSelected));
      setView("day");
    }
  }, [dateSelected]);

  //para poder agregarle estilos al calendario
  const eventPropGetter = (e) => {
    const style = {
      background: e.title === "DISPONIBLE" ? "#057A55" : "#6BBEE8",
      color: "white",
      border: "none",
    };

    return { style };
  };

  const handleEditEvent = (info) => {
    openEditModal(info);
  };

  const handleSelectSlot = ({ start, end }) => {
    if (view === "week" || view === "day") {
      openCreateModal({ start, end });
    }
  };

  const handleViewChange = (view) => {
    setView(view);
  };

  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  const defaultDate = !dateSelected ? new Date(2021, 8, 16) : currentDate;

  return (
    <div className="flex p-4 w-full h-full">
      <Calendar
        localizer={localizer}
        events={events}
        date={defaultDate}
        onNavigate={handleNavigate}
        view={view}
        style={{ height: 700, width: "95%", margin: "0 auto" }}
        eventPropGetter={eventPropGetter}
        onDoubleClickEvent={handleEditEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        className="custom"
        views={["month", "week", "day", "agenda"]}
        onView={handleViewChange}
        messages={{
          previous: (
            <img src="/logo/left.png" alt="izquierda" className="w-5 h-5" />
          ),
          next: <img src="/logo/right.png" alt="derecha" className="w-5 h-5" />,
          today: <p className="w-7 h-5">Hoy</p>,
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "No hay eventos",
          showMore: (total) => `+${total} más`,
        }}
      />
    </div>
  );
};

export default MyCalendar;
