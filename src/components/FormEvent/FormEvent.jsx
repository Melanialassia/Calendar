//HOOKS
import { useEffect } from "react";
//LIBRARY
import {
  ConfigProvider,
  DatePicker,
  message,
  Button,
  Space,
  Input,
  Form,
  Modal,
} from "antd";
import esES from "antd/es/locale/es_ES"; // Importa la configuración en español desde ant desing
import dayjs from "dayjs";
//STORE
import { store } from "../../store/store";

const FormEvent = ({
  initialValues,
  setInitialValues,
  isEditting,
  setIsEditting,
}) => {
  const { addEvent, updateEvents, removeEvent } = store();
  const [modal, contextHolder] = Modal.useModal();
  const [form] = Form.useForm();

  //mensaje modal de confirmacion
  const config = {
    title: "¿Esta seguro de borrar el evento?",
  };

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

  const handleDeleteEvent = async () => {
    const confirmed = await modal.confirm(config);

    if (confirmed) {
      removeEvent(initialValues);
      message.success("Evento eliminado con éxito!");
    }
  };

  const handleSubmit = () => {
    if (initialValues) {
      const event = {
        id: initialValues.id,
        title: initialValues.title.toUpperCase(),
        start: initialValues.start,
        end: initialValues.end,
      };

      if (isEditting) {
        //editar evento
        updateEvents(event);
        message.success("Evento editado con éxito!");
        form.resetFields();
        
      } else {
        //crear evento
        addEvent(event);
        message.success("Evento creado con éxito!");
        form.resetFields();
    
      }
    }
  };
  console.log("aca", initialValues);

  return (
    <div className=" max-w-screen-xl flex flex-col mx-auto mt-6 justify-center items-center ">
      <h2 className="text-2xl font-semibold mb-6 mt-2">
        {isEditting === false ? "Añadir nuevo turno" : "Editar turno"}
      </h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
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
            value={initialValues.title}
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
                format="DD-MM-YYYY HH:mm"
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

      {isEditting && (
        <Button
          htmlType="submit"
          onClick={handleDeleteEvent}
          style={{
            border: "none",
          }}
        >
          <img
            src="/logo/delete.png"
            alt="add logo"
            className="w-7 transition-transform duration-300 hover:animate-rotate-scale"
          />
        </Button>
      )}
      {contextHolder}
    </div>
  );
};

export default FormEvent;
