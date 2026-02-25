import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { useUIStore, useAuthStore } from "./state/store";
import { setLanguage } from "./i18n";

// Screens
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import CreateProfile from "./screens/CreateProfile";
import Following from "./screens/Following";
import Search from "./screens/Search";
import Categories from "./screens/Categories";
import CategoryResults from "./screens/CategoryResults";
import LiveWatch from "./screens/LiveWatch";
import CreatorProfile from "./screens/CreatorProfile";
import MyProfile from "./screens/MyProfile";
import Wallet from "./screens/Wallet";
import Settings from "./screens/Settings";
import BlockedUsers from "./screens/BlockedUsers";

import "./App.css";

// Set Arabic as default language
setLanguage("ar");

function AppLayout({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useUIStore();
  return (
    <>
      <Navbar />
      <Sidebar />
      <main
        className="app-main"
        style={{
          marginRight: sidebarCollapsed
            ? "var(--sidebar-collapsed)"
            : "var(--sidebar-width)",
        }}
      >
        {children}
      </main>
    </>
  );
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function App() {
  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes (no sidebar/navbar) */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
        />
        <Route
          path="/create-profile"
          element={
            <AuthLayout>
              <CreateProfile />
            </AuthLayout>
          }
        />

        {/* Live Watch (custom layout — no sidebar, has navbar) */}
        <Route
          path="/live/:streamId"
          element={
            <>
              <Navbar />
              <main className="app-main app-main-full">
                <LiveWatch />
              </main>
            </>
          }
        />

        {/* App Routes (with navbar + sidebar) */}
        <Route
          path="/"
          element={
            <AppLayout>
              <Home />
            </AppLayout>
          }
        />
        <Route
          path="/following"
          element={
            <AppLayout>
              <Following />
            </AppLayout>
          }
        />
        <Route
          path="/search"
          element={
            <AppLayout>
              <Search />
            </AppLayout>
          }
        />
        <Route
          path="/categories"
          element={
            <AppLayout>
              <Categories />
            </AppLayout>
          }
        />
        <Route
          path="/category/:slug"
          element={
            <AppLayout>
              <CategoryResults />
            </AppLayout>
          }
        />
        <Route
          path="/creator/:userId"
          element={
            <AppLayout>
              <CreatorProfile />
            </AppLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <AppLayout>
              <MyProfile />
            </AppLayout>
          }
        />
        <Route
          path="/wallet"
          element={
            <AppLayout>
              <Wallet />
            </AppLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <AppLayout>
              <Settings />
            </AppLayout>
          }
        />
        <Route
          path="/settings/blocked"
          element={
            <AppLayout>
              <BlockedUsers />
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
