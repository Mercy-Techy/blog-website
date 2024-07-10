import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
