import React, { useState, useEffect, useCallback } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../../services/api";
import "./schedule.css";
import { useNavigate } from 'react-router-dom';
import BottomBar from '../../components/schedules/BottomBar';
import AllCards from '../../components/schedules/AllCards';


const Schedules = () => {
    const [schedulesData, setSchedules] = useState();

    const [topics] = useState([
        { id: 1, text: "Performance" },
        { id: 2, text: "FeedBack (Líder < -- > Liderado)" },
        { id: 3, text: "Desenvolvimento" },
        { id: 4, text: "Evolução Profissional" },
        { id: 5, text: "Clima e Relacionamento" },
        { id: 6, text: "Pessoal" },
    ]);
    const [topic, setTopic] = useState();

    const fetchSchedules = useCallback(async () => {
        try {
            const response = await api.get("/schedules");
            const schedules = response.data.schedules;
            setSchedules(schedules);
        } catch (e) {
            console.log(e);
        }
    }, [setSchedules]);

    
    useEffect(() => {
        fetchSchedules();
    }, [fetchSchedules]);


    return (
        <>
        {
            setTimeout(() => {
                return (
                    <>
                        <AllCards schedules={schedulesData}/>
                        <BottomBar />
                    </>
                )
            }, 500)
        }
        </>
    );

}

export default Schedules;
