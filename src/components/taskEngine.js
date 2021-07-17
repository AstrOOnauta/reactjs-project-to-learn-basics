import {useState} from "react"
import "../App.css"

export default function TaskEngine(){
    
    //Hooks
    const [task, setTask] = useState({
        title: "",
        isDone: false
    })

    const [taskList, setTaskList] = useState([])
    
    //Arrow function for to load the tasks added in session
    const showTasks = taskList.map((task, index) => {
        return(
            task.isDone ?   //Ternary operator to show the complete task or not when click en check button
            (<div           //if check button is true... the task gain yellow background color
                style={{backgroundColor: "rgb(255,221,0)"}}
                className={"newTask"}
                key={index}
                >
                <div>
                    {index+1} | Tarefa Completa!
                </div>
                <div>
                    <button
                        style={{cursor: "pointer"}}
                        onClick={() => doneTask(index, task)}>
                            ✓
                    </button>
                    <button
                        style={{cursor: "pointer"}}
                        onClick={() => removeTask(index)}>
                            ✕
                    </button>
                </div>
            </div> )    :    //if check button is false... the task gain standard background color
            (<div
                style={{backgroundColor: "rgba(0,0,0,0.8)", color: "white"}}
                className={"newTask"}
                key={index}
                >
                <div>
                    {index+1} | {task.title}
                </div>
                <div>
                    <button
                        style={{cursor: "pointer"}}
                        onClick={() => doneTask(index)}>
                            ✓
                    </button>
                    <button
                        style={{cursor: "pointer"}}
                        onClick={() => removeTask(index)}>
                            ✕
                    </button>
                </div>
            </div>)
        )
    })

    /*This function below is activated when check button is clicked...
        it switch the task attribute "isDone" in true and false
        and update the setState in hook taskList*/
    function doneTask(index){
        const newTaskList = [...taskList]
        newTaskList[index].isDone = !newTaskList[index].isDone
        setTaskList(newTaskList)
    }

    /*This function below is activated when close button is clicked...
        it remove the only item with specificity index from hook taskList
        and update the setState this hook */
    function removeTask(index){
        const newTaskList = [...taskList]
        newTaskList.splice(index, 1)
        setTaskList(newTaskList)
    }

    /*Arrow function below capture the changes in input value and
        transform in an object that will push in hook JSON "task"
        for update this hook state in each input cahnge*/
    const handleInputTask = (event) => {
        const inputTask = {
            title: event.target.value,
            isDone: false
        }

        setTask(inputTask)
    }

    /*Arrow function below add the task captured for handleInputTask
        in moment in which the submit button is clicked and
        update this task in hook taskList*/
    const addTask = (event) => {
        event.preventDefault()
        //conditional for no add in blank input in task
        if (!task.title) {
            alert("Não épossível adicionar uma tarefa vazia! Tente Novamente");
            return;
        }
        setTaskList([...taskList, task])
        //reset input field when the submit button is clicked
        setTask({
            title: "",
            isDone: false
        })
    }

    //View JSX
    return(
        <div className="container">
            <h1>Lista de Tarefas</h1>
            <hr /><br />
            <input 
                className="containerFormInput"
                type="text"
                placeholder="Adicione uma tarefa..."
                value={task.title}
                onChange={handleInputTask}
            />
            <button
                type="submit"
                className="containerFormButton"
                onClick={addTask}>
                    Adicionar
            </button>
            <br />
            <h3>Tarefas: {taskList.length}</h3>
            <hr />
            {showTasks}
        </div>
    )
}