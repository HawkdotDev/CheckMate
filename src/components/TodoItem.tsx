import React, { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Todo } from "../types";

import CheckIcon from "../assets/icons/check.svg";
import TrashIcon from "../assets/icons/trash.svg";
import GripIcon from "../assets/icons/grip-vertical.svg";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onUpdateText: (text: string) => void;
  onDelete: () => void;
  backgroundColor: string;
  textColor: string;
  id: string;
}

export function TodoItem({
  todo,
  onToggle,
  onUpdateText,
  onDelete,
  backgroundColor,
  textColor,
  id,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(!todo.text);
  const [text, setText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    const trimmedText = text.trim();
    if (trimmedText) {
      onUpdateText(trimmedText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, color: textColor }}
      className="flex items-center gap-2 group bg-black/5 rounded-lg p-2"
    >
      <button
        className="touch-none px-1 opacity-50 hover:opacity-100 flex items-center justify-center"
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

      <div className="relative flex items-center justify-center w-5 h-5">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="w-5 h-5 border-2 rounded-full appearance-none cursor-pointer transition-all"
          style={{
            borderColor: textColor,
            backgroundColor: todo.completed ? textColor : "transparent",
          }}
        />
        {todo.completed && (
          <img
            src={CheckIcon}
            alt="Completed"
            width={15}
            height={15}
            className="absolute inset-0 m-auto pointer-events-none"
            style={{ color: backgroundColor }}
          />
        )}
      </div>

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0"
          style={{ color: textColor }}
          placeholder="Enter task..."
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className={`flex-1 cursor-text ${
            todo.completed ? "line-through opacity-50" : ""
          }`}
          style={{ color: textColor }}
        >
          {todo.text}
        </span>
      )}

      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 hover:bg-red-600/60 p-1 rounded-full transition-all flex items-center justify-center"
      >
        <img
          src={TrashIcon}
          alt="Delete"
          width={18}
          height={18}
          className="shrink-0"
        />
      </button>
    </div>
  );
}
