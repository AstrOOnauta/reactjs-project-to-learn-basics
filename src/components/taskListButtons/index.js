import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
`
const CompleteButton = styled.button`
    background-color: #303030;
    color: #fff;
    padding: .4rem .5rem;
    border: none;
    cursor: pointer;
    &:focus{
        outline: none;
    }
`

const NoCompleteButton = styled.button`
    background-color: #303030;
    color: #fff;
    padding: .4rem .63rem;
    border: none;
    cursor: pointer;
    &:focus{
        outline: none;
    }
`

const EditButton = styled.button`
    background-color: #303030;
    color: #fff;
    padding: .4rem .45rem;
    border: none;
    cursor: pointer;
    &:focus{
        outline: none;
    }
`

const DeleteButton = styled.button`
    background-color: #fbb034;
    color: #303030;
    padding: .4rem .6rem;
    border: none;
    cursor: pointer;
    box-shadow: 0px 0px 1px 1px #303030;
    &:focus{
        outline: none;
    }
`

export default function TaskListButtons(props){
    return(
        <Container>
            {props.task.isDone ? (
                <NoCompleteButton onClick={() => props.doneTask(props.index)}>
                        <i className="fas fa-times"></i>
                </NoCompleteButton>
            ) : (
                <CompleteButton onClick={() => props.doneTask(props.index)}>
                        <i className="fas fa-check"></i>
                </CompleteButton>
            )}
            <EditButton onClick={()=>props.editTask(props.index)}>
                <i className="fas fa-pen"></i>
            </EditButton>
            <DeleteButton onClick={() => props.removeTask(props.index)}>
                    <i className="fas fa-trash"></i>
            </DeleteButton>
        </Container>
    )
}