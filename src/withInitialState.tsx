import { ComponentType, useEffect, useState } from "react"
import { load } from "./api"
import { AppState } from "./state/appStateReducer"

type InjectedProps = {
    initialState: AppState
}

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>

export function withInitialState<TProps>(WrappeComponent: ComponentType<PropsWithoutInjected<TProps> & InjectedProps>) {
    return (props: PropsWithoutInjected<TProps>) => {
        const [initialState, setInitialState] = useState<AppState>({
            lists: [],
            draggedItem: null
        })

        const [isLoading, setIsLoading] = useState(true)
        const [error, setError] = useState<Error | undefined>()

        useEffect(() => {
            const fetchInitialState = async () => {
                try {
                    const data = await load()
                    setIsLoading(false)
                    setInitialState(data)
                } catch (e) {
                    setError(e as Error)
                }
            }
            fetchInitialState()
        }, [])

        if (isLoading) {
            return <div>Loading</div>
        }

        if (error) {
            return <div>{error.message}</div>
        }

        return <WrappeComponent {...props} initialState={initialState} />
    }
}