import { useDragLayer } from "react-dnd";
import { Column } from "./Column";
import { useAppState } from "./state/AppStateContext"
import { CustomDragLayerContainer, DragPreviewWrapper } from "./style";

export const CustomDragLayer = () => {
    const { draggedItem } = useAppState();
    // 使用useDragLayer会把默认的拖拽效果隐藏掉
    const { currentOffset } = useDragLayer((monitor) => ({
        currentOffset: monitor.getSourceClientOffset()
    }))
    // const currentOffset = { x: 0, y: 0 };

    return draggedItem && currentOffset ? (
        <CustomDragLayerContainer>
            <DragPreviewWrapper position={currentOffset}>
                <Column id={draggedItem.id} text={draggedItem.text} isPreview />
            </DragPreviewWrapper>
        </CustomDragLayerContainer>
    ) : null;
}