import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-devops-bg">
      <Navbar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
