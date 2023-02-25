import React from "react";

type CounterState = { count: number }

// const foo:React.FC = ()=>{}

export class Counter extends React.Component<{}, { count: number }> {


    hi() {
        this.setState({ count: 1 });
    }
}