import {
  DatePicker,
  ConfigProvider,
  TimePicker,
  Form,
  Input,
  Button,
} from "antd";
import esES from "antd/es/locale/es_ES"; // Importa la configuración en español desde ant desing


const CreateEvent = () => {
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString); //podemos ver la fehca
  };

  const onChangeHour = (time, timeString) => {
    console.log("onChange:", timeString); // mostramos la hora
  };

  return (
    <div className=" max-w-screen-xl flex flex-col mx-auto justify-center items-center  w-4/5  mt-6">
      <h2 className="text-2xl font-semibold mb-6 mt-2">Añade un nuevo turno</h2>
      <Form
        layout="vertical"
        style={{
          maxWidth: 400,
          width: "80%",
        }}
      >
        <Form.Item
          name="Title"
          rules={[
            {
              required: true,
              message: "Por favor, ingresa un título!",
            },
          ]}
        >
          <Input
            className="p-3 border border-gray-300 rounded-md focus:ring-0 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="Ingresa un título"
          />
        </Form.Item>

        <Form.Item
          name="DatePicker"
          rules={[
            {
              required: true,
              message: "Por favor, selecciona una fecha!",
            },
          ]}
        >
          <DatePicker
            className="w-full p-3"
            onChange={onChangeDate}
            locale={esES}
          />
        </Form.Item>

        <Form.Item
          name="HourPicker"
          rules={[
            {
              required: true,
              message: "Por favor, selecciona una hora!",
            },
          ]}
        >
          <ConfigProvider locale={esES}>
            <TimePicker
              format="HH:mm"
              onChange={onChangeHour}
              className="w-full p-3"
            />
          </ConfigProvider>
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateEvent;
