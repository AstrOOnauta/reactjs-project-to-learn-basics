import { useState } from "react"
import styled, { keyframes } from "styled-components"

import TaskListButtons from "../taskListButtons"

const show = keyframes `
    from {opacity: 0}
    to {opacity: 1}
`

const Table = styled.table`
    width: 100%;
    background-color: #fbb034;
    color: #303030;
    border-collapse: collapse;
    box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.5);
    text-align: center;
    animation: ${show} .4s;
`

const Td = styled.td`
    font-size: large;
    height: 6vh;
    border: 1px solid #303030;
    word-break: break-all;
    animation: ${show} .8s;
    &:nth-child(1){
        width: 10%;
    }
    &:nth-child(2){
        width: 50%;
        padding: .2rem .6rem;
    }
    &:nth-child(3){
        width: 40%;
    }
    @media(min-width: 700px) {
        font-size: xx-large;
        &:nth-child(1){
            width: 10%;
        }
        &:nth-child(2){
            width: 75%;
        }
        &:nth-child(3){
            width: 15%;
        } 
    }
    @media(min-width: 1100px) {
        font-size: large;
        &:nth-child(1){
            width: 5%;
        }
        &:nth-child(2){
            width: 80%;
        }
        &:nth-child(3){
            width: 15%;
        } 
    }
`


const ModalEdit = styled.div`
    display: none;
    position: relative;
    align-items: center;
    width: 80%;
    height: 76vh;
    margin: auto;
    animation: ${show} .8s;
`

const ModalForm = styled.form`
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
`

const ModalInput = styled.input`
    font-size: large;
    padding: 0;
    margin: 1rem 0;
    width: 100%;
    height: 6vh;
    border: none;
    border-radius: .4rem;
    text-align: center;
    box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.5);
    &:focus{
        transition: .5s;
        background-color: rgba(255, 255, 255, .8);
        outline: none;
    }
`

const ModalButton = styled.button`
    padding: 0;
    margin: 0;
    background-color: #fbb034;
    color: #303030;
    font-size: large;
    width: 100%;
    height: 6vh;
    border: none;
    border-radius: .4rem;
    box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.5);
    cursor: pointer;
`

const AstrOOnauta = styled.p`
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 0;
    color: white;
`

export default function TaskList(props){
    const [editableTask, setEditableTask] = useState("")
    const [indexTask, setIndexTask] = useState(-1)


    /*This function below is activated when check button is clicked...
        it switch the task attribute "isDone" in true and false
        and update the setState in hook taskList*/
    function doneTask(index){
        const newTaskList = [...props.taskList]
        newTaskList[index].isDone = !newTaskList[index].isDone
        props.setTaskList(newTaskList)
    }

    function editTask(index){
        props.taskList[index].isEdit = !props.taskList[index].isEdit
        if(props.taskList[index].isEdit){
            document.getElementById("table").style.display = "none"
            document.getElementById("edit").style.display = "flex"
            setEditableTask(props.taskList[index].title)
            setIndexTask(index)
        }
    }

    function updateTask(e){
        e.preventDefault()
        const newTaskList = [...props.taskList]
        newTaskList[indexTask] = {
            title: document.getElementById("inputEdit").value,
            isDone: false,
            isEdit: false
        }
        
        props.setTaskList(newTaskList)

        document.getElementById("table").style.display = "table"
        document.getElementById("edit").style.display = "none"

    }

    /*This function below is activated when close button is clicked...
        it remove the only item with specificity index from hook taskList
        and update the setState this hook */
    function removeTask(index){
        const newTaskList = [...props.taskList]
        newTaskList.splice(index, 1)
        props.setTaskList(newTaskList)
    }

    return(
        <>
            <Table id="table">
                <tbody>
                    {props.taskList.map((task, index) => {    //Arrow function for to load the tasks added in session
                        return(
                            task.isDone ?   //Ternary operator to show the complete task or not when click en check button
                            (<tr           //if check button is true... the task gain yellow background color
                                style={{color: "white"}}
                                key={index}
                                >
                                <Td>
                                    {index+1}
                                </Td>
                                <Td>
                                    Tarefa Completa!
                                </Td>
                                <Td>
                                    <TaskListButtons index={index} task={task} doneTask={doneTask} editTask={editTask} removeTask={removeTask} />
                                </Td>
                            </tr> )    :    //if check button is false... the task gain standard background color
                            (<tr
                                key={index}
                                >
                                <Td>
                                    {index+1}
                                </Td>
                                <Td>
                                {task.title}
                                </Td>
                                <Td>
                                    <TaskListButtons index={index} task={task} doneTask={doneTask} editTask={editTask} removeTask={removeTask} />
                                </Td>
                            </tr>)
                        )
                    })}
                </tbody>
            </Table>
            <ModalEdit id="edit">
                <ModalForm>
                    <h3 style={{textAlign: "center"}}>Tarefa {indexTask + 1}</h3>
                    <ModalInput id="inputEdit" value={editableTask} onChange={(e)=>setEditableTask(e.target.value)} autoComplete="off"/>
                    <ModalButton onClick={updateTask}>Editar</ModalButton>
                </ModalForm>
                <AstrOOnauta>Desenvolvido por
                    <a style={{textDecoration: "none", color: "#fbb034"}} href="https://github.com/AstrOOnauta" target="_blank" rel="noreferrer"> AstrOOnauta</a>
                </AstrOOnauta>
            </ModalEdit>
        </>
    )
}
