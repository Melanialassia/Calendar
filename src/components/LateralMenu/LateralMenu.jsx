import { useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es"); //traduccion al español
//STYLE
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./lateralmenu.css";
import EventFilter from "./components/EventFilter/EventFilter";

const LateralMenu = () => {
  const localizer = dayjsLocalizer(dayjs);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className="flex flex-row p-4">
      <ul>
        <li>
          <Calendar
            localizer={localizer}
            startAccessor="start"
            style={{ height: 300, width: "100%" }}
            className="custom-calendar"
            views={["month"]}
            messages={{
              previous: "<",
              next: ">",
              today: "Hoy",
              agenda: "Agenda",
              date: "Fecha",
              time: "Hora",
              event: "Evento",
              noEventsInRange: "No hay eventos",
              showMore: (total) => `+${total} más`,
            }}
          />
        </li>
        <li>
          <EventFilter />
        </li>
      </ul>
    </aside>
  );
};

export default LateralMenu;
