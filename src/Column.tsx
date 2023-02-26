import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";
import { addTask } from "./state/actions";
import { useAppState } from "./state/AppStateContext";
import { ColumnContainer, ColumnTitle } from "./style"

type ColumnProps = {
    text: string,
    id: string
}

// 跟上面一样的效果
// type ColumnProps = React.PropsWithChildren<{ text: string }>

export const Column = ({ text, id }: ColumnProps) => {

    const { getTasksByListId, dispatch } = useAppState();

    const tasks = getTasksByListId(id);

    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {tasks.map(task => (
                <Card text={task.text} key={task.id} id={task.id} />
            ))}
            <AddNewItem
                toggleButtonText="+ Add another task"
                onAdd={text => dispatch(addTask(text, id))}
                dark
            />
        </ColumnContainer>
    );
}