import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/Home"));
const TeacherDashboard = lazy(() => import("@/pages/TeacherDashboard"));
const StudentDetail = lazy(() => import("@/pages/StudentDetail"));
const StudentView = lazy(() => import("@/pages/StudentView"));
const QuizPage = lazy(() => import("@/pages/QuizPage"));

function PageLoader() {
  return (
    <div className="p-8 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
      <div className="grid grid-cols-3 gap-4 pt-4">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const teacherRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TeacherDashboard />
    </Suspense>
  ),
});

const teacherStudentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher/student/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <StudentDetail />
    </Suspense>
  ),
});

const studentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <StudentView />
    </Suspense>
  ),
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <QuizPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  teacherRoute,
  teacherStudentRoute,
  studentRoute,
  quizRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      retry: 2,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
