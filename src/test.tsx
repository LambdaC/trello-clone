import { stat } from "fs";
import React, { useReducer } from "react";

type CounterState = { count: number }

// const foo:React.FC = ()=>{}

export class Counter extends React.Component<{}, { count: number }> {
    hi() {
        this.setState({ count: 1 });
    }
}

type State = {
    count: number
}

type Action = {
    type: "increment"
} | {
    type: "decrement"
}

export const Counter2 = () => {
    const counterReducer = (state: State, action: Action) => {
        switch (action.type) {
            case "increment":
                return { count: state.count + 1 }
            case "decrement":
                return { count: state.count - 1 }
            default:
                throw new Error()
        }
    }

    const [state, dispatch] = useReducer(counterReducer, { count: 0 });

    return (
        <>
            <p>count:{state.count}</p>
            <button onClick={() => { dispatch({ type: "decrement" }) }}>-</button>
            <button onClick={() => { dispatch({ type: "increment" }) }}>+</button>
        </>
    );
}