//HOOKS
import { useEffect } from "react";
//LIBRARY
import {
  DatePicker,
  ConfigProvider,
  Space,
  Form,
  Input,
  Button,
  message,
} from "antd";
import { dayjsLocalizer } from "react-big-calendar";
import esES from "antd/es/locale/es_ES"; // Importa la configuración en español desde ant desing
import dayjs from "dayjs";
//STORE
import { store } from "../../store/store";

const FormEvent = ({ initialValues, setInitialValues }) => {
  const [form] = Form.useForm();
  const { addEvent } = store();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onChangeTitle = (e) => {
    setInitialValues({
      ...initialValues,
      title: e.target.value,
    });
  };

  const onChangeStart = (value) => {
    const result = new Date(value);
    setInitialValues({
      ...initialValues,
      start: result,
    });
  };

  const onChangeEnd = (value) => {
    const result = new Date(value);
    console.log(result);
    setInitialValues({
      ...initialValues,
      end: result,
    });
  };

  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";

  const handleSubmit = () => {
    if (initialValues) {
      const obj={
        id: initialValues.id,
        title:initialValues.title.toUpperCase(),
        start: initialValues.start,
        end: initialValues.end
      }
      addEvent(obj);
      message.success("Evento creado con éxito!");
      
    }
  };
  console.log("aca", initialValues);

  return (
    <div className=" max-w-screen-xl flex flex-col mx-auto mt-6 justify-center items-center ">
      <h2 className="text-2xl font-semibold mb-6 mt-2">
        {initialValues.title === ""
          ? "Añadir nuevo turno"
          : "Editar turno"}
      </h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
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
            value={initialValues ? initialValues.title : null}
            className="border border-gray-300 rounded-md focus:ring-0 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Ingresa un título"
            onChange={onChangeTitle}
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
                format="YYYY-MM-DD HH:mm"
                showTime
                value={dayjs(initialValues.start)}
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
                value={dayjs(initialValues.end)}
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
