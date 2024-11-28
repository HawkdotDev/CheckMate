/* eslint-disable @typescript-eslint/no-explicit-any */
import Pin from "../assets/icons/pin.svg";
import PinOff from "../assets/icons/pin-off.svg";
import Trash2 from "../assets/icons/trash.svg";
import Plus from "../assets/icons/plus.svg";
import Palette from "../assets/icons/palette.svg";
import GripIcon from "../assets/icons/grip-vertical.svg";

import type { TodoList as TodoListType } from "../types";
import { TodoItem } from "./TodoItem";
import { ColorPicker } from "./ColorPicker";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

import { getComplementaryColor } from "../utils/colors";

interface TodoListProps {
  list: TodoListType;
  onPin: (id: string) => void;
  onDelete: (id: string) => void;
  onAddTodo: (listId: string) => void;
  onToggleTodo: (listId: string, todoId: string) => void;
  onUpdateTodoText: (listId: string, todoId: string, text: string) => void;
  onDeleteTodo: (listId: string, todoId: string) => void;
  onReorderTodos: (listId: string, todos: TodoListType["todos"]) => void;
  onUpdateTitle: (listId: string, title: string) => void;
  onUpdateColor: (listId: string, color: string) => void;
  onUpdateTextColor: (listId: string, color: string) => void;
}

export function TodoList({
  list,
  onPin,
  onDelete,
  onAddTodo,
  onToggleTodo,
  onUpdateTodoText,
  onDeleteTodo,
  onReorderTodos,
  onUpdateTitle,
  onUpdateColor,
  onUpdateTextColor,
}: TodoListProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const complementaryColor = getComplementaryColor(list.color);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = list.todos.findIndex((todo) => todo.id === active.id);
      const newIndex = list.todos.findIndex((todo) => todo.id === over.id);
      onReorderTodos(list.id, arrayMove(list.todos, oldIndex, newIndex));
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        backgroundColor: list.color,
        opacity: isDragging ? 0.5 : 1,
      }}
      className={`rounded-lg p-4 shadow-lg transition-all duration-200 hover:shadow-xl mb-4 ${
        list.isPinned ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          <button
            className="touch-none px-1 opacity-50 hover:opacity-100 flex items-center justify-center cursor-grab"
            {...attributes}
            {...listeners}
          >
            <img
              src={GripIcon}
              alt="Drag"
              width={20}
              height={20}
              className="shrink-0"
            />
          </button>
          <input
            type="text"
            value={list.title}
            onChange={(e) => onUpdateTitle(list.id, e.target.value)}
            className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-0 w-full"
            placeholder="List Title"
            style={{ color: complementaryColor }}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-1.5 rounded-full hover:bg-black/10 transition-colors flex items-center justify-center"
            style={{ color: list.textColor }}
          >
            <img src={Palette} alt="Palette" />
          </button>
          <button
            onClick={() => onPin(list.id)}
            className="p-1.5 rounded-full hover:bg-black/10 transition-colors flex items-center justify-center"
            style={{ color: list.textColor }}
          >
            {list.isPinned ? (
              <img src={PinOff} alt="Unpin" />
            ) : (
              <img src={Pin} alt="Pin" />
            )}
          </button>
          <button
            onClick={() => onDelete(list.id)}
            className="p-1.5 rounded-full hover:bg-red-500/60 transition-colors text-red-600 flex items-center justify-center"
          >
            <img src={Trash2} alt="Delete" />
          </button>
        </div>
      </div>

      {showColorPicker && (
        <div className="mb-3">
          <ColorPicker
            currentColor={list.color}
            currentTextColor={list.textColor}
            onColorChange={(color) => onUpdateColor(list.id, color)}
            onTextColorChange={(color) => onUpdateTextColor(list.id, color)}
          />
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={list.todos.map((todo) => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-2">
            {list.todos.map((todo) => (
              <li key={todo.id}>
                <TodoItem
                  id={todo.id}
                  todo={todo}
                  backgroundColor={list.color}
                  textColor={list.textColor}
                  onToggle={() => onToggleTodo(list.id, todo.id)}
                  onUpdateText={(text) =>
                    onUpdateTodoText(list.id, todo.id, text)
                  }
                  onDelete={() => onDeleteTodo(list.id, todo.id)}
                />
              </li>
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <button
        onClick={() => onAddTodo(list.id)}
        className="mt-3 flex items-center gap-1 text-sm hover:opacity-75 transition-opacity"
        style={{ color: list.textColor }}
      >
        <img src={Plus} alt="Add Task" className="w-4 h-4" />
        <span>Add Task</span>
      </button>
    </div>
  );
}