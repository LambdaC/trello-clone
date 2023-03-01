import { useRef } from "react";
import { useDrop } from "react-dnd";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";
import { addTask, moveList } from "./state/actions";
import { useAppState } from "./state/AppStateContext";
import { ColumnContainer, ColumnTitle } from "./style"
import { isHidden } from "./utils/isHidden";
import { useItemDrag } from "./utils/useItemDrag";

type ColumnProps = {
    text: string,
    id: string,
    isPreview?: boolean
}

// 跟上面一样的效果
// type ColumnProps = React.PropsWithChildren<{ text: string }>

export const Column = ({ text, id, isPreview }: ColumnProps) => {

    const { draggedItem, getTasksByListId, dispatch } = useAppState();

    const tasks = getTasksByListId(id);
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: "COLUMN",
        hover() {
            if (!draggedItem) {
                return
            }
            if (draggedItem.type === "COLUMN") {
                if (draggedItem.id === id) {
                    return
                }
            }
            dispatch(moveList(draggedItem.id, id))
        }
    });

    drop(ref); // drag的target在这个ref上时，就会调用hover函数

    const { drag } = useItemDrag({ type: "COLUMN", id, text });
    drag(ref); // 给ref加上个拖拽的监听，拖拽开始时调用item函数，拖拽结束时调用end函数

    return (
        <ColumnContainer isPreview={isPreview} ref={ref} isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}>
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