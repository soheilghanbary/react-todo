import { Toaster } from "sonner";
import { QueryProvider } from "./components/providers/query-provider";
import { ThemeProvider } from "./components/providers/theme-provider";
import { AddTask } from "./components/shared/add-task";
import { TaskList } from "./components/shared/task-list";
import { ToggleTheme } from "./components/shared/toggle-theme";

export default function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <Header />
        <section className="container mx-auto p-2">
          <TaskList />
        </section>
      </ThemeProvider>
      <Toaster richColors />
    </QueryProvider>
  );
}

const Header = () => {
  return (
    <header className="border-b">
      <nav className="container mx-auto flex items-center justify-between gap-4 p-2">
        <div className="flex items-center justify-center gap-4">
          <h3 className="text-lg font-extrabold">Taskino</h3>
        </div>
        <div className="flex-1"></div>
        <ToggleTheme />
        <AddTask />
      </nav>
    </header>
  )
};