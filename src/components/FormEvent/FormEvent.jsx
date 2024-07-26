//HOOKS
import { useEffect } from "react";
//LIBRARY
import { DatePicker, ConfigProvider, Space, Form, Input, Button } from "antd";
import esES from "antd/es/locale/es_ES"; // Importa la configuración en español desde ant desing
import dayjs from "dayjs";

const FormEvent = ({ initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      console.log("valores", initialValues);
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, []);

  // const onChangeDate = (date, dateString) => {
  //   console.log(date, dateString); //podemos ver la fehca
  // };

  // const onChangeHour = (time, timeString) => {
  //   console.log("entre", time.$d);
  //   console.log("onChange:", timeString); // mostramos la hora
  // };

  const onChangeStart = (_, dateStr) => {
    console.log("onChange:", dateStr);
    const result = new Date(dateStr);
    console.log("estoy aca", result);
  };

  const onChangeEnd = (_, dateStr) => {
    console.log("onChange:", dateStr);
    const result = new Date(dateStr);
    console.log("estoy aca", result);
  };

  return (
    <div className=" max-w-screen-xl flex flex-col mx-auto mt-6 justify-center items-center ">
      <h2 className="text-2xl font-semibold mb-6 mt-2">
        {Object.keys(initialValues).length === 0 ? "Añadir nuevo turno" : "Editar turno"}
      </h2>
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        style={{
          maxWidth: 400,
          width: "80%",
        }}
      >
        <Form.Item
          name="title"
          label="Nombre y Apellido"
          rules={[
            {
              required: true,
              message: "Por favor, ingresa un nombre!",
            },
          ]}
        >
          <Input
            className="border border-gray-300 rounded-md focus:ring-0 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Ingresa un título"
          />
        </Form.Item>

        <Form.Item
          name="start"
          label="Comienza"
          rules={[
            {
              required: true,
              message: "Por favor, selecciona una fecha!",
            },
          ]}
        >
          <ConfigProvider locale={esES}>
            <Space direction="vertical">
              <DatePicker
              format="DD-MM-YYYY HH:mm"
                showTime
                defaultValue={dayjs(initialValues.start)}
                onChange={onChangeStart}
              />
            </Space>
          </ConfigProvider>
        </Form.Item>

        <Form.Item
          name="end"
          label="Termina"
          rules={[
            {
              required: true,
              message: "Por favor, selecciona una fecha!",
            },
          ]}
        >
          <ConfigProvider locale={esES}>
            <Space direction="vertical">
              <DatePicker
              format="DD-MM-YYYY HH:mm"
                showTime
                defaultValue={dayjs(initialValues.end)}
                onChange={onChangeEnd}
              />
            </Space>
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

export default FormEvent;
