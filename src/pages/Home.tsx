import { Link } from 'react-router-dom';
import { useTodoLists } from '../hooks/useTodoLists';
import { useTheme } from '../hooks/useTheme';
// import { Clock, ListTodo, ArrowRight } from 'lucide-react';

function HomePage() {
  const { theme } = useTheme();
  const { lists } = useTodoLists();

  // Get all incomplete todos across all lists
  const incompleteTodos = lists.flatMap(list => 
    list.todos
      .filter(todo => !todo.completed)
      .map(todo => ({
        ...todo,
        listTitle: list.title,
        listColor: list.color,
        listTextColor: list.textColor
      }))
  );

  const pendingLists = lists.filter(list => 
    list.todos.some(todo => !todo.completed)
  );

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
          <h1 className="text-2xl font-bold">Overview</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/tasks"
            className="p-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {/* <ListTodo size={24} /> */}
              <span className="text-lg font-medium">Manage Tasks</span>
            </div>
            {/* <ArrowRight size={20} /> */}
          </Link>
          
          <Link 
            to="/reminders"
            className="p-4 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {/* <Clock size={24} /> */}
              <span className="text-lg font-medium">Manage Reminders</span>
            </div>
            {/* <ArrowRight size={20} /> */}
          </Link>
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Pending Tasks</h2>
            <Link 
              to="/tasks" 
              className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
            >
              View All 
              {/* <ArrowRight size={16} /> */}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {incompleteTodos.length === 0 ? (
              <p className="text-gray-500 italic">No pending tasks</p>
            ) : (
              incompleteTodos.slice(0, 5).map(todo => (
                <div
                  key={todo.id}
                  className="p-3 rounded-lg"
                  style={{ 
                    backgroundColor: todo.listColor,
                    color: todo.listTextColor 
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 flex-shrink-0"
                         style={{ borderColor: todo.listTextColor }} />
                    <div>
                      <p className="font-medium">{todo.text}</p>
                      <p className="text-sm opacity-75">From: {todo.listTitle}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Lists with Pending Tasks</h2>
            <Link 
              to="/tasks" 
              className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
            >
              View All 
              {/* <ArrowRight size={16} /> */}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingLists.length === 0 ? (
              <p className="text-gray-500 italic">No lists with pending tasks</p>
            ) : (
              pendingLists.slice(0, 6).map(list => {
                const pendingCount = list.todos.filter(todo => !todo.completed).length;
                return (
                  <div
                    key={list.id}
                    className="p-4 rounded-lg"
                    style={{ 
                      backgroundColor: list.color,
                      color: list.textColor 
                    }}
                  >
                    <h3 className="font-semibold text-lg mb-1">{list.title}</h3>
                    <p className="opacity-75">{pendingCount} pending {pendingCount === 1 ? 'task' : 'tasks'}</p>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;