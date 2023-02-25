import { AddNewItem } from "./AddNewItem";
import { ColumnContainer, ColumnTitle } from "./style"

type ColumnProps = {
    text: string,
    children?: React.ReactNode
}

// 跟上面一样的效果
// type ColumnProps = React.PropsWithChildren<{ text: string }>

export const Column = ({ text, children }: ColumnProps) => {
    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {children}
            <AddNewItem
                toggleButtonText="+ Add another task"
                onAdd={console.log}
                dark
            />
        </ColumnContainer>
    );
}