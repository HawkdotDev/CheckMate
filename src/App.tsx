import  PlusCircle from "../src/assets/icons/pluscircle.svg";
import { TodoList } from "./components/TodoList";
import { ThemeToggle } from "./components/ThemeToggle";
import { useTodoLists } from "./hooks/useTodoLists";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme, toggleTheme } = useTheme();
  const {
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
  } = useTodoLists();

  const pinnedLists = lists.filter((list) => list.isPinned);
  const unpinnedLists = lists.filter((list) => !list.isPinned);

  return (
    <div
      className="min-h-screen transition-colors"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <header
        style={{ backgroundColor: theme.headerBg, color: theme.headerText }}
        className="sticky top-0 z-10 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Notes</h1>
            <div className="flex items-center gap-4">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <button
                onClick={createList}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <img src={PlusCircle} alt="Delete" width={16} height={16} className="shrink-0" />
                New List
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {pinnedLists.length > 0 && (
          <>
            <div>
              <h2 className="text-lg font-medium mb-4 opacity-75">Pinned</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pinnedLists.map((list) => (
                  <TodoList
                    key={list.id}
                    list={list}
                    onPin={togglePin}
                    onDelete={deleteList}
                    onAddTodo={addTodo}
                    onToggleTodo={toggleTodo}
                    onUpdateTodoText={updateTodoText}
                    onDeleteTodo={deleteTodo}
                    onReorderTodos={reorderTodos}
                    onUpdateTitle={updateListTitle}
                    onUpdateColor={updateListColor}
                    onUpdateTextColor={updateListTextColor}
                  />
                ))}
              </div>
            </div>
            <hr className="border-t border-gray-200 dark:border-gray-700" />
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unpinnedLists.map((list) => (
            <TodoList
              key={list.id}
              list={list}
              onPin={togglePin}
              onDelete={deleteList}
              onAddTodo={addTodo}
              onToggleTodo={toggleTodo}
              onUpdateTodoText={updateTodoText}
              onDeleteTodo={deleteTodo}
              onReorderTodos={reorderTodos}
              onUpdateTitle={updateListTitle}
              onUpdateColor={updateListColor}
              onUpdateTextColor={updateListTextColor}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
