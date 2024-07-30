import { useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es"); //traduccion al español
//STORE
import { store } from "../../store/store";
//STYLE
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./lateralmenu.css";
import EventFilter from "./components/EventFilter/EventFilter";

const LateralMenu = ({ setDateSelected, handleFilterChange }) => {
  const localizer = dayjsLocalizer(dayjs);
  const { getEvents, events } = store();

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const styleEvents = () => {
    const style = {
      boreder: "none",
      color: "transparent",
      borderRadius: "10%",
      marginTop: "7px",
      height: "5px",
      with: "5px",
    };

    return { style };
  };

  const handleDateSelected = (date) => {
    const newDate = date.start;
    setDateSelected(newDate);
  };

  return (
    <aside className="hidden lg:flex flex-row p-4">
        <ul className=" h-full w-full">
          <li>
            <Calendar
              localizer={localizer}
              startAccessor="start"
              events={events}
              defaultDate={new Date(2021, 8, 16)}
              onSelectEvent={handleDateSelected}
              onSelectSlot={handleDateSelected}
              selectable
              style={{ height: 300 }}
              eventPropGetter={styleEvents}
              className="custom-calendar"
              views={["month"]}
              messages={{
                previous: (
                  <img
                    src="/logo/left.png"
                    alt="izquierda"
                    className="w-5 h-5"
                  />
                ),
                next: (
                  <img
                    src="/logo/right.png"
                    alt="derecha"
                    className="w-5 h-5"
                  />
                ),
                today: <p className="w-7 h-5">Hoy</p>,
                agenda: "Agenda",
                date: "Fecha",
                time: "Hora",
                event: "Evento",
                noEventsInRange: "No hay eventos",
                showMore: (total) => `+${total}`,
              }}
            />
          </li>
          <li>
            <EventFilter handleFilterChange={handleFilterChange} />
          </li>
        </ul>
    </aside>
  );
};

export default LateralMenu;
