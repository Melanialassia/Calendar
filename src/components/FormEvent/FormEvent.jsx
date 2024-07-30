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
  closeModal,
}) => {
  const { addEvent, updateEvents, removeEvent } = store();
  const [modal, contextHolder] = Modal.useModal();
  const [form] = Form.useForm();

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
    const result = value ? new Date(value) : null;

    if (initialValues.end && result > new Date(initialValues.end)) {
      const hourEnd=  new Date(result.getTime() + 30 * 60000)
      setInitialValues({
        ...initialValues,
        start: result,
        end: hourEnd,
      });
      message.open({
        type: "warning",
        content:
          "La fecha de inicio no puede ser posterior a la de finalización!.",
        duration: 4,
      });
    } else {
      setInitialValues({
        ...initialValues,
        start: result,
      });
    }
  };

  const onChangeEnd = (value) => {
    const result = value ? new Date(value) : null;

    if (initialValues.start && result < new Date(initialValues.start)) {
      setInitialValues({
        ...initialValues,
        start: result,
        end: initialValues.start,
      });

      message.open({
        type: "warning",
        content:
          "La fecha de finalización no puede ser anterior a la de inicio!.",
        duration: 4,
      });
    } else {
      setInitialValues({
        ...initialValues,
        end: result,
      });
    }
  };

  //mensaje modal de confirmacion
  const config = {
    title: "¿Esta seguro de borrar el evento?",
  };


  const handleDeleteEvent = async () => {
    const confirmed = await modal.confirm(config);

    if (confirmed) {
      removeEvent(initialValues);
      message.success("Evento eliminado con éxito!");
      closeModal();
    }
  };

  const handleSubmit = () => {
    const event = {
      id: initialValues.id,
      title:
        initialValues.title === ""
          ? "DISPONIBLE"
          : initialValues.title.toUpperCase(),
      start: initialValues.start,
      end: initialValues.end,
    };

    if (isEditting) {
      //editar evento
      updateEvents(event);
      message.success("Evento editado con éxito!");
    } else {
      //crear evento
      addEvent(event);
      message.success("Evento creado con éxito!");
    }
    form.resetFields();
    closeModal();
  };

  console.log("resultado", initialValues);

  return (
    <div className=" max-w-screen-xl flex flex-col mx-auto mt-6 justify-center items-center ">
      <h2 className="text-2xl font-roboto font-semibold mb-6 mt-2 text-zinc-600">
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
          className="text-zinc-600 font-roboto font-medium"
          rules={[
            {
              required: !isEditting,
              message: "Por favor, ingresa un nombre!",
            },
            {
              min: 4,
              message: "El nombre debe tener al menos 4 caracteres!",
            },
            {
              max: 20,
              message: "El nombre no puede tener más de 20 caracteres!",
            },
            {
              pattern: /^[a-zA-Z\s]*$/,
              message: "El nombre solo puede contener letras y espacios!",
            },
          ]}
        >
          <Input
            value={initialValues.title}
            className="w-full border border-gray-300 rounded-md focus:ring-0  focus:ring-blue-500 focus:border-blue-500 "
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
            <Space direction="vertical" className="w-full">
              <DatePicker
                className="w-full text-zinc-600 font-roboto font-medium"
                format="DD-MM-YYYY HH:mm"
                showTime
                value={initialValues.start ? dayjs(initialValues.start) : null}
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
            <Space direction="vertical" className="w-full">
              <DatePicker
                className="w-full text-zinc-600 font-roboto font-medium"
                format="DD-MM-YYYY HH:mm"
                showTime
                value={initialValues.end ? dayjs(initialValues.end) : null}
                onChange={onChangeEnd}
              />
            </Space>
          </ConfigProvider>
        </Form.Item>

        <Form.Item className="flex justify-end">
          <div className="flex space-x-3">
            {isEditting && (
              <Button
                type="button"
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
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </div>
        </Form.Item>
      </Form>
      {contextHolder}
    </div>
  );
};

export default FormEvent;
