import {useEffect, useState} from "react"
import styled from "styled-components"

import NewTask from "../newTask"
import TaskList from "../taskList"

const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 90%;
    margin: auto;
`

const Tasks = styled.div`
    height: 78vh;
    border-radius: .8rem;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        width: 0;
    }
`

const TaskCount = styled.h2`
    padding: 4vh 0 2vh 0;
    margin: 0;
    text-align: center;
    @media(min-width: 700px) {
        font-size: xx-large;
    }
    @media(min-width: 1100px) {
        font-size: large;
    }
`


export default function Home(){
    
    //Hooks

    const [task, setTask] = useState({
        title: "",
        isDone: false,
        isEdit: false,
    })

    const [taskList, setTaskList] = useState([])

    useEffect(()=>{
        const json = localStorage.getItem("tasks");
        const loadedTasks = JSON.parse(json);
        if (loadedTasks) {
            setTaskList(loadedTasks);
        }
    }, [])

    useEffect(() => {
        const json = JSON.stringify(taskList);
        localStorage.setItem("tasks", json);
      }, [taskList]);

    //View JSX
    return(
        <Main>
            <TaskCount>Tarefas: {taskList.length}</TaskCount>
            <Tasks>
                <TaskList task={task} taskList={taskList} setTaskList={setTaskList} />
            </Tasks>
            <NewTask task={task} taskList={taskList} setTask={setTask} setTaskList={setTaskList} />
        </Main>
    )
}