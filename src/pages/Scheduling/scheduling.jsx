import React, { useCallback, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./schedule.css";

const Scheduling = () => {
  const { id } = useParams();
  const [date, setDate] = useState(new Date().toISOString().split(".")[0]);
  const [message, setMessage] = useState("");
  const [option, setOption] = useState();
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState();
  const [topics, setTopics] = useState([]);
  const [selTopics, setSelTopics] = useState([]);
  const [link, setLink] = useState("");
  const [isAlertError, setIsAlertError] = useState(false);
  const [isAlertSuccess, setIsAlertSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get("/users");
      const users = response.data.users;
      setEmployees(users);
      setEmployee(users[0]);
    } catch (e) {
      console.log(e);
    }
  }, [setEmployees]);

  const fetchTopics = useCallback(async () => {
    try {
      const response = await api.get("/topics");
      setTopics(response.data);
    } catch (e) {
      console.log(e);
    }
  }, [setTopics]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  const handleTopics = (topic) => {
    const isChecked = topic.target.checked;
    const selectedTopic = topic.target.value;

    if (isChecked) {
      setSelTopics((old) => [...old, selectedTopic]);
    } else {
      if (selTopics.length > 0) {
        const old = [...selTopics];
        const index = old.indexOf(selectedTopic);
        old.splice(index, 1);
        setSelTopics([...old]);
      }
    }
  };

  const fetchScheduling = async () => {
    const isValid =
      date && option && employee && selTopics.length > 0 && message;
    setIsAlertError(!isValid);

    if (!isValid) {
      const altMessage = !date
        ? "A data é obrigatória."
        : !option
        ? "Selecione uma opção (One on One / Feedback)."
        : !employee
        ? "Selecione um colaborador."
        : !selTopics || selTopics.length === 0
        ? "Selecione ao menos um tópico."
        : !message || message.length === 0
        ? "Escreva a mensagem"
        : "";

      setAlertMessage(altMessage);
      setTimeout(() => {
        document.querySelector("#btnsActions").scrollIntoView();
      }, 100);
      return;
    }

    const time = date.split("T")[1];
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];
    const strTime = hours + ":" + minutes;

    const data = {
      type_schedule: option,
      date: date.split("T")[0],
      hour: strTime,
      state: "pending",
      topics: selTopics,
      description: message,
      link,
      person: employee._id,
    };

    try {
      setIsAlertError(false);
      const response = await api.post("/schedules", data);

      if (response.data.message) {
        setAlertMessage(response.data.message);
        setIsAlertError(true);
      } else {
        setIsAlertSuccess(true);

        setTimeout(() => {
          setIsAlertSuccess(false);
          window.history.back();
        }, 3000);

        setTimeout(() => {
          document.querySelector("#btnsActions").scrollIntoView();
        }, 100);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const fetchCancel = () => {
    window.history.back();
  };

  return (
    <div className="container card mt-3">
      <h2 className="mt-3 text-center">Ahfeed</h2>
      <h4 className="text-center">Cerimônias inteligentes</h4>
      <div className="col mb-3 mt-3">
        <input
          type="datetime-local"
          id="datetime"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="col mb-3">
        <input
          className="me-2"
          type="radio"
          id="oneOnOne"
          name="option"
          value="oneOnOne"
          onChange={(evt) => setOption(evt.target.value)}
        />
        <label className="me-4" htmlFor="oneByOne">
          One on One
        </label>

        <input
          className="me-2"
          type="radio"
          id="feedback"
          name="option"
          value="feedback"
          onChange={(evt) => setOption(evt.target.value)}
        />
        <label htmlFor="feedback">Feedback</label>
      </div>

      {employees && (
        <div>
          <p>Funcionário</p>
          <Form.Control
            as="select"
            onChange={(evt) => setEmployee(evt.target.value)}
          >
            {employees.map((e) => (
              <option key={e._id} value={e._id}>
                {e.name}
              </option>
            ))}
          </Form.Control>
        </div>
      )}

      <div className="mb-3">
        <p>Topicos</p>
        {topics &&
          topics.map((t) => (
            <span key={t.id}>
              <input
                className="me-2"
                type="checkbox"
                id={t.id}
                name={t.id}
                value={t.text}
                onChange={(evt) => handleTopics(evt)}
              />
              <label className="me-4" htmlFor={t.id}>
                {t.text}
              </label>
            </span>
          ))}
      </div>

      <div className="mb-3">
        <Form.Label>Link da Reunião</Form.Label>
        <Form.Control
          type="text"
          onChange={(evt) => setLink(evt.target.value.trim())}
        ></Form.Control>
      </div>

      <div className="mb-3">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Mensagem</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(evt) =>
              setMessage(evt.target.value.replace(/\s{2,}/g, ""))
            }
          />
        </Form.Group>
      </div>

      {isAlertError && (
        <Alert className="mt-3" key={"alertScheduling"} variant="danger">
          {alertMessage}
        </Alert>
      )}

      {isAlertSuccess && (
        <Alert className="mt-3" key={"alertScheduling"} variant="success">
          Agendamento realizado com sucesso!
        </Alert>
      )}

      <div className="mb-3" id="btnsActions">
        <Button
          size="sm"
          variant="outline-primary"
          className="me-1"
          onClick={fetchScheduling}
        >
          Agendar
        </Button>
        <Button
          size="sm"
          variant="outline-danger"
          className="me-1"
          onClick={fetchCancel}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default Scheduling;
