import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import Goals from "./pages/Goals";
import Calendar from "./pages/Calendar";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/layout/Sidebar";
import { TaskProvider } from "./contexts/TaskContext";
import { GoalProvider } from "./contexts/GoalContext";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./integrations/supabase/client";
import Landing from "./pages/Landing";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="focus-theme">
        <TaskProvider>
          <GoalProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="flex h-screen w-full overflow-hidden bg-background dark:bg-gray-950">
                {session ? (
                  <>
                    <Sidebar />
                    <div className="flex-1 overflow-auto">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/goals" element={<Goals />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/insights" element={<Insights />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </>
                ) : (
                  <Routes>
                    <Route path="/*" element={<Landing />} />
                  </Routes>
                )}
              </div>
            </BrowserRouter>
          </GoalProvider>
        </TaskProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
