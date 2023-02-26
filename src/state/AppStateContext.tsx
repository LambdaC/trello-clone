import { createContext, Dispatch, FC, useContext, useReducer } from "react"
import { Action } from "./actions"
import { AppState, appStateReducer, List, Task } from "./appStateReducer"
import { useImmerReducer } from "use-immer"


const appData: AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold" }]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing" }]
        }
    ]
}

type AppStateContextProps = {
    lists: List[],
    getTasksByListId(id: string): Task[]
    dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

// 使用useImmerReducer替换useReducer,这样appStateReducer就可以直接修改原对象并触发渲染
export const AppStateProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, appData);

    const { lists } = state;

    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || []
    }

    return (
        <AppStateContext.Provider value={{ lists, getTasksByListId, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
    return useContext(AppStateContext);
}
