import { create } from "zustand";
import axios from "axios";


export const store = create((set, get) => ({
  events: [],

  getEvents: async () => {
    try {
      const storedEvent = JSON.parse(localStorage.getItem("event"));

      if (!storedEvent) {
        const { data } = await axios(
          "https://my-json-server.typicode.com/juanpernu/bilog-fe-challenge/schedule"
        );

        const getRandomId = (num) => {
          //le creo un id random a evento
          return Math.floor(Math.random() * num);
        };

        const formatEvent = data.map((e) => {
          const fecha = e.fecha.slice(0, 10);
          const start = new Date(`${fecha}T${e.hora}:00`);

          const end = new Date(start.getTime() + 30 * 60000); // a la hora del inicio  se le suma 30 minutos para asi generar la hora final
          const idRandom = getRandomId(1000);

          const result = {
            id: idRandom,
            title: e.ape_nom === null ? "DISPONIBLE" : e.ape_nom,
            start: start,
            end: end,
          };

          return result;
        });

        localStorage.setItem("event", JSON.stringify(formatEvent));

        set((state) => ({
          ...state,
          events: formatEvent,
        }));
      } else {
        const result = storedEvent.map((e) => ({
          id: e.id,
          title: e.title,
          start: new Date(e.start),
          end: new Date(e.end),
        }));

        set({
          events: result,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  addEvent: (event) => {
    set((state) => {
      const addEvent = [...state.events, event];

      localStorage.setItem("event", JSON.stringify(addEvent));

      return {
        ...state,
        events: addEvent,
      };
    });
  },

  updateEvents: (event) => {
    set((state) => {
      const filterEvent = state.events.filter((e) => e.id != event.id);

      const newListEvents = [...filterEvent, event];
      localStorage.setItem("event", JSON.stringify(newListEvents));

      return {
        ...state,
        events: newListEvents,
      };
    });
  },

  removeEvent: (event) => {
    set((state) => {
      const deleteEvent = state.events.filter((e) => e.id !== event.id);

      localStorage.setItem("event", JSON.stringify(deleteEvent));

      return {
        ...state,
        events: deleteEvent,
      };
    });
  },

  filterEvent: (value) => {
    set((state) => {
      const eventsState = JSON.parse(localStorage.getItem("event"));
      const eventsList = eventsState.map((e) => ({
        id: e.id,
        title: e.title,
        start: new Date(e.start),
        end: new Date(e.end),
      }));

      if (value === "disponible") {
        const result = eventsList.filter((e) => e.title === "DISPONIBLE");
        return {
          ...state,
          events: result,
        };
      } else if (value === "ocupado") {
        const result = eventsList.filter((e) => e.title != "DISPONIBLE");
        return {
          ...state,
          events: result,
        };
      } else if (value === "todos") {
        return {
          ...state,
          events: eventsList,
        };
      }
    });
  },
}));
