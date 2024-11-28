export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoList {
  id: string;
  title: string;
  isPinned: boolean;
  color: string;
  textColor: string;
  todos: Todo[];
  createdAt: Date;
}

export interface Theme {
  isDark: boolean;
  background: string;
  text: string;
  headerBg: string;
  headerText: string;
}