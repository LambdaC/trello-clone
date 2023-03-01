import { nanoid } from "nanoid";
import { DragItem } from "../DragItem";
import { findItemIndexById, moveItem } from "../utils/arrayUtils";
import { Action } from "./actions";

export type Task = {
    id: string
    text: string
}

export type List = {
    id: string
    text: string
    tasks: Task[]
}

export type AppState = {
    lists: List[]
    draggedItem: DragItem | null
}

// 如果return state的话，react会判断前后的state对象是一致的，所以就不会更新了。
// 所以不能在原对象中修改，然后再返回原对象，不然修改的后数据是不会重新渲染的
// 使用useImmerReducer之后，传进来的state就可以直接修改并触发渲染了而不需要返回一个新的对象
// 甚至如果只修改原对象都不需要返回原对象
export const appStateReducer = (state: AppState, action: Action): AppState | void => {
    // console.log("appStateReducer");
    switch (action.type) {
        case "ADD_LIST":
            return {
                ...state,
                lists: [
                    ...state.lists,
                    { id: nanoid(), text: action.payload, tasks: [] }
                ]
            }
        case "ADD_TASK":
            const { text, listId } = action.payload
            const targetListIndex = findItemIndexById(state.lists, listId)
            state.lists[targetListIndex].tasks.push({
                id: nanoid(),
                text
            })
            // return state;
            return;
        case "MOVE_LIST":
            const { draggedId, hoverId } = action.payload
            const dragIndex = findItemIndexById(state.lists, draggedId)
            const hoverIndex = findItemIndexById(state.lists, hoverId)
            state.lists = moveItem(state.lists, dragIndex, hoverIndex)
            break;
        case "SET_DRAGGED_ITEM":
            state.draggedItem = action.payload
            break;
        case "MOVE_CARD":
            const { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId } = action.payload
            const sourceColumnIndex = findItemIndexById(state.lists, sourceColumnId)
            const draggedItemIndex = findItemIndexById(state.lists[sourceColumnIndex].tasks, draggedItemId)
            const targetColumnIndex = findItemIndexById(state.lists, targetColumnId)
            const hoveredItemIndex = hoveredItemId ? findItemIndexById(state.lists[targetColumnIndex].tasks, hoveredItemId) : 0

            const card = state.lists[sourceColumnIndex].tasks[draggedItemIndex]
            state.lists[sourceColumnIndex].tasks.splice(draggedItemIndex, 1)
            state.lists[targetColumnIndex].tasks.splice(hoveredItemIndex, 0, card)
            // todo 需要改变state.draggedItem的数据，不然再移动到别的地方时，数据就出问题了。
            if (state.draggedItem?.type === "CARD") {
                state.draggedItem.columnId = targetColumnId
            }
            // state.lists[sourceColumnIndex].tasks = removeItemAtIndex(state.lists[sourceColumnIndex].tasks, draggedItemIndex)
            // state.lists[targetColumnIndex].tasks = insertItemAtIndex(state.lists[targetColumnIndex].tasks, card, hoveredItemIndex)
            break;
        default:
            return state
    }
}