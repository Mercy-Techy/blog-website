import { NavLink } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";

const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setOpen] = useState(false);

  const Content = ({ className, onClickFn }) => {
    return (
      <ul className={className} onClick={onClickFn}>
        <li>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "font-bold" : ""} hover:font-bold`
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "font-bold" : ""} hover:font-bold`
                }
                to="/signup"
              >
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "font-bold" : ""} hover:font-bold`
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "font-bold" : ""} hover:font-bold`
                }
                to="/about"
              >
                About Me
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "font-bold" : ""} hover:font-bold`
                }
                to="/blogs"
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "font-bold" : ""} hover:font-bold`
                }
                to="/logout"
              >
                Log Out
              </NavLink>
            </li>
          </>
        )}
      </ul>
    );
  };
  return (
    <header className="p-6">
      <nav className="mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold italic">Daily Reflections</div>
        <Content className="hidden md:flex space-x-16 text-sm" />
        <div className="md:hidden">
          <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
        </div>
        {isOpen && (
          <>
            <Content
              onClickFn={() => setOpen(false)}
              className={`z-40 md:hidden flex flex-col justify-between fixed left-0 px-6 shadow-4xl right-0 top-20 pt-0 bg-stone-50 text-lg transition-transform ease-in-out delay-700 ${
                isOpen ? "translate-y-0" : "-translate-y-full"
              }`}
            />
            <div
              className={`fixed inset-x-0 top-24 bottom-0 bg-black opacity-50 z-20 transition-opacity ease-in-out delay-700 ${
                isOpen ? "opacity-50" : "opacity-0"
              }`}
            ></div>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
