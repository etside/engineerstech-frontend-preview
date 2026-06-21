import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWidgets from "./FloatingWidgets";
import AnnouncementBar from "./AnnouncementBar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  );
};

export default Layout;
