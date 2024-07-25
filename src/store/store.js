import { create } from "zustand";
import axios from "axios";
import dayjs from "dayjs";

export const store = create((set, get) => ({
  events: [],

  getEvents: async () => {
    try {
      const { data } = await axios(
        "https://my-json-server.typicode.com/juanpernu/bilog-fe-challenge/schedule"
      );
      const formatEvent = data.map((e) => {
        const fecha = e.fecha.slice(0, 10);
        const start = new Date(`${fecha}T${e.hora}:00`);

        const end = new Date(start.getTime() + 30 * 60000); // lo uqe hicimos es a la hora del inicio sumarle 30 minutos para asi generar la hora final

        return {
          id: e.id_agenda,
          title: e.id_agenda === -1 ? "Disponible" : e.ape_nom,
          start: start,
          end: end,
        };
      });

      set((state) => ({
        ...state,
        events: formatEvent,
      }));
    } catch (error) {
      console.log("error", error);
    }
  },
}));
