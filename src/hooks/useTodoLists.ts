import { useState, useEffect } from 'react';
import type { TodoList, Todo } from '../types';
import { DEFAULT_COLORS, DEFAULT_TEXT_COLORS } from '../utils/colors';

const STORAGE_KEY = 'todo-lists';

export function useTodoLists() {
  const [lists, setLists] = useState<TodoList[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  }, [lists]);

  const createList = () => {
    const newList: TodoList = {
      id: crypto.randomUUID(),
      title: '',
      isPinned: false,
      color: DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)],
      textColor: DEFAULT_TEXT_COLORS[0],
      todos: [],
      createdAt: new Date(),
    };
    setLists((prev) => [...prev, newList]);
  };

  const togglePin = (listId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, isPinned: !list.isPinned } : list
      )
    );
  };

  const deleteList = (listId: string) => {
    setLists((prev) => prev.filter((list) => list.id !== listId));
  };

  const addTodo = (listId: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: '',
      completed: false,
    };
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, todos: [...list.todos, newTodo] }
          : list
      )
    );
  };

  const toggleTodo = (listId: string, todoId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === todoId
                  ? { ...todo, completed: !todo.completed }
                  : todo
              ),
            }
          : list
      )
    );
  };

  const updateTodoText = (listId: string, todoId: string, text: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === todoId ? { ...todo, text } : todo
              ),
            }
          : list
      )
    );
  };

  const deleteTodo = (listId: string, todoId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              todos: list.todos.filter((todo) => todo.id !== todoId),
            }
          : list
      )
    );
  };

  const reorderTodos = (listId: string, newTodos: Todo[]) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, todos: newTodos } : list
      )
    );
  };

  const updateListTitle = (listId: string, title: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, title } : list
      )
    );
  };

  const updateListColor = (listId: string, color: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, color } : list
      )
    );
  };

  const updateListTextColor = (listId: string, textColor: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, textColor } : list
      )
    );
  };
  
  const reorderLists = (newLists: TodoList[]) => {
    // Preserve pinned/unpinned sections while reordering within each section
    const pinnedLists = newLists.filter(list => list.isPinned);
    const unpinnedLists = newLists.filter(list => !list.isPinned);
    
    // Combine the lists maintaining the pinned ones at the top
    setLists([...pinnedLists, ...unpinnedLists]);
  };

  return {
    lists,
    createList,
    togglePin,
    deleteList,
    addTodo,
    toggleTodo,
    updateTodoText,
    deleteTodo,
    reorderTodos,
    updateListTitle,
    updateListColor,
    updateListTextColor,
    reorderLists
  };
}