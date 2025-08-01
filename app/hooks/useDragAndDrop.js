"use client";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  CARD: "card",
  PALETTE_FIELD: "PALETTE_FIELD",
};

export const useFieldDragAndDrop = (field, index, reorderFields) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      reorderFields(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id: field.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return { ref, handlerId, isDragging };
};

export const usePaletteDrag = (type, label, defaultProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type, // This 'type' already comes as "PALETTE_FIELD" from DraggableField
    item: { label, defaultProps }, // Removed 'type' from here as it's already the drag type
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return { drag, isDragging };
};

export const useFormCanvasDrop = (addField) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.PALETTE_FIELD,
    drop: (item, monitor) => {
      addField({
        id: `field-${Date.now()}`,
        ...item.defaultProps,
      });
      return { name: "Form Canvas" };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return { drop, isOver, canDrop };
};
