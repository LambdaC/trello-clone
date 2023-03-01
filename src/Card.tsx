import { useRef } from "react";
import { useAppState } from "./state/AppStateContext";
import { CardContainer } from "./style";
import { isHidden } from "./utils/isHidden";
import { useItemDrag } from "./utils/useItemDrag";
import { useItemDrop } from "./utils/useItemDrop";

type CardProps = {
    text: string
    id: string
    columnId: string
    isPreview?: boolean
}

export const Card = ({ text, id, columnId, isPreview }: CardProps) => {
    const { draggedItem } = useAppState();
    const ref = useRef<HTMLDivElement>(null)
    const { drop } = useItemDrop({ type: "CARD", columnId, id, text })
    drop(ref)

    const { drag } = useItemDrag({ type: "CARD", id, text, columnId })
    drag(ref) // 给ref加上个拖拽的监听，拖拽开始时调用item函数，拖拽结束时调用end函数

    return (
        <CardContainer ref={ref} isHidden={isHidden(draggedItem, "CARD", id, isPreview)}>{text}</CardContainer>
    );
}