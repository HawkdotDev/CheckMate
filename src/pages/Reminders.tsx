import PlusCircle from "../assets/icons/pluscircle.svg";
import { TodoList } from "../components/TodoList";
import { ThemeToggle } from "../components/ThemeToggle";
import { useTodoLists } from "../hooks/useTodoLists";
import { useTheme } from "../hooks/useTheme";
import Masonry from "react-masonry-css";
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
  rectSortingStrategy,
} from "@dnd-kit/sortable";

function Reminders() {
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
    reorderLists,
  } = useTodoLists();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = lists.findIndex((list) => list.id === active.id);
      const newIndex = lists.findIndex((list) => list.id === over.id);
      reorderLists(arrayMove(lists, oldIndex, newIndex));
    }
  };

  const pinnedLists = lists.filter((list) => list.isPinned);
  const unpinnedLists = lists.filter((list) => !list.isPinned);

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1,
  };

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
            <div className="sections">
              <a
                href="/"
                className="text-2xl font-bold cursor-pointer mr-4 md:mr-9"
              >
                Home
              </a>
              <a
                href="/notes"
                className="text-2xl font-bold cursor-pointer mr-4 md:mr-9"
              >
                Tasks
              </a>
              <a
                href="/reminders"
                className="text-2xl font-bold cursor-pointer mr-6"
              >
                Reminders
              </a>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <button
                onClick={createList}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <img
                  src={PlusCircle}
                  alt="Add"
                  width={16}
                  height={16}
                  className="shrink-0"
                />
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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={pinnedLists.map((list) => list.id)}
                  strategy={rectSortingStrategy}
                >
                  <Masonry
                    breakpointCols={breakpointColumns}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
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
                  </Masonry>
                </SortableContext>
              </DndContext>
            </div>
            <hr className="border-t border-gray-200 dark:border-gray-700" />
          </>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={unpinnedLists.map((list) => list.id)}
            strategy={rectSortingStrategy}
          >
            <Masonry
              breakpointCols={breakpointColumns}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
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
            </Masonry>
          </SortableContext>
        </DndContext>
      </main>
    </div>
  );
}

export default Reminders;
