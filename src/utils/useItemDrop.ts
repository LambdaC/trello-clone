import { useDrop } from "react-dnd";
import { DragItem } from "../DragItem";
import { moveCard, moveList } from "../state/actions";
import { useAppState } from "../state/AppStateContext";


export const useItemDrop = (targetItem: DragItem) => {
    const { draggedItem, dispatch } = useAppState()
    const acceptType = targetItem.type === "COLUMN" ? ["COLUMN", "CARD"] : targetItem.type
    const [, drop] = useDrop({
        accept: acceptType,
        hover() {
            if (!draggedItem) {
                return
            }
            if (draggedItem.type === targetItem.type) {
                if (draggedItem.id === targetItem.id) {
                    return
                }
            }

            if (draggedItem.type === "COLUMN") { // 拖拽对象是列表
                dispatch(moveList(draggedItem.id, targetItem.id))
            } else { // 拖拽对象是卡片
                if (targetItem.type === "CARD") {
                    dispatch(moveCard(draggedItem.id, targetItem.id, draggedItem.columnId, targetItem.columnId))
                } else {
                    // 拖拽对象在同一个列表内不需要处理
                    if (draggedItem.columnId === targetItem.id) {
                        return
                    }
                    dispatch(moveCard(draggedItem.id, null, draggedItem.columnId, targetItem.id))
                }
            }
        }
    });

    return { drop }
}