import { createContext, Dispatch, useContext, useEffect } from "react"
import { useImmerReducer } from "use-immer"
import { save } from "../api"
import { DragItem } from "../DragItem"
import { withInitialState } from "../withInitialState"
import { Action } from "./actions"
import { AppState, appStateReducer, List, Task } from "./appStateReducer"

type AppStateContextProps = {
    draggedItem: DragItem | null
    lists: List[]
    getTasksByListId(id: string): Task[]
    dispatch: Dispatch<Action>
}

type AppStateProviderProps = {
    children: React.ReactNode
    initialState: AppState
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

// 使用useImmerReducer替换useReducer,这样appStateReducer就可以直接修改原对象并触发渲染
export const AppStateProvider = withInitialState<AppStateProviderProps>(({ children, initialState }) => {
    // console.log("AppStateProvider")
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);

    const { lists, draggedItem } = state;

    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || []
    }

    useEffect(() => {
        save(state)
    }, [state])

    return (
        <AppStateContext.Provider value={{ lists, getTasksByListId, dispatch, draggedItem }}>
            {children}
        </AppStateContext.Provider>
    )
})

export const useAppState = () => {
    return useContext(AppStateContext);
}
