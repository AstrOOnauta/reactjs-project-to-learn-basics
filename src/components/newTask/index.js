import styled, { keyframes } from "styled-components"

const show = keyframes `
    from {opacity: 0}
    to {opacity: 1}
`

const Form = styled.form`
    margin: 3vh 0 0 0;
    box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.5);
    animation: ${show} 1s;
`

const Input = styled.input`
    padding: 0;
    margin: 0;
    border: none;
    width: 85%;
    height: 6vh;
    text-align: center;
    border-radius: .4rem 0 0 .4rem;
    font-size: large;
    box-shadow: 0px 0px 1px 1px #fff;
    
    &:focus{
        background-color: rgba(255, 255, 255, .8);
        outline: none;
        transition: .5s;
    }
    @media(min-width: 700px) {
        font-size: xx-large;
    }
    @media(min-width: 1100px) {
        width: 96%;
        font-size: large;
    }
`

const Button = styled.button`
    padding: 0;
    margin: 0;
    background-color: #303030;
    color: #fff;
    border: none;
    width: 15%;
    height: 6vh;
    border-radius: 0 .4rem .4rem 0;
    font-size: large;
    cursor: pointer;
    box-shadow: 0px 0px 1px 1px #fff;

    &:focus{
        outline: none;
    }

    @media (min-width: 1100px){
        width: 4%;
    }
    `

export default function NewTask(props){

    /*Arrow function below capture the changes in input value and
    transform in an object that will push in hook JSON "task"
    for update this hook state in each input cahnge*/
    const handleInputTask = (event) => {
        const inputTask = {
            title: event.target.value,
            isDone: false,
            isEdit: false
        }

        props.setTask(inputTask)
    }

    /*Arrow function below add the task captured for handleInputTask
        in moment in which the submit button is clicked and
        update this task in hook taskList*/
    const addTask = (event) => {
        event.preventDefault()
        //conditional for no add in blank input in task
        if (!props.task.title) {
            alert("Não é possível adicionar uma tarefa vazia! Tente Novamente");
            return;
        }
        props.setTaskList([...props.taskList, props.task])
        //reset input field when the submit button is clicked
        props.setTask({
            title: "",
            isDone: false,
            isEdit: false
        })
    }

    return(
        <Form>
            <Input
                type="text"
                placeholder="Adicione uma tarefa..."
                value={props.task.title}
                onChange={handleInputTask}
            />
            <Button
                type="submit"
                onClick={addTask}>
                    <i className="fas fa-plus"></i>
            </Button>
        </Form>
    )
}