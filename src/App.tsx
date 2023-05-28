import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const titleMap = [
  { path: "/charts-maps", title: "Charts and Maps Page" },
  { path: "/contacts", title: "Contact Page" },
  { path: "/", title: "Contact & Chart-Maps App" },
];

export default function App() {
  const curLoc = useLocation();
  const [header, setHeader] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const curHeader =
      curLoc.pathname === "/"
        ? titleMap[2]
        : titleMap.find((item) => curLoc.pathname.startsWith(item.path));
    if (curHeader && curHeader.title) {
      setHeader(curHeader.title);
    }
  }, [curLoc]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full h-fit border-b border-gray-200 shadow-lg bg-[teal]">
        <div className="flex justify-center items-center px-3 py-3 lg:px-5">
          <h1 className="text-xl font-bold text-gray-50 self-center">
            {header}
          </h1>
          <button
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 text-gray-50 transition duration-75 group-hover:text-gray-200 fixed top-4 left-6 sm:hidden"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
            </svg>
          </button>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-400 ${
          showSidebar && "translate-x-0"
        } sm:translate-x-0 shadow-2xl`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/contacts"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200"
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-200"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"></path>
                </svg>
                <span className="ml-3">Contact</span>
              </Link>
            </li>
            <li>
              <Link
                to="/charts-maps"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31l-56,56V200H224A8,8,0,0,1,232,208Z"></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Charts and Maps
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div
        id="detail"
        className="p-4 sm:ml-64 mt-14 pt-10 flex flex-col justify-center items-center"
      >
        {curLoc.pathname === "/" ? (
          <h1 className="text-3xl">Go to page from the sidebar</h1>
        ) : (
          <Outlet />
        )}
      </div>

      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
          position: "bottom-center",
        }}
      />
    </>
  );
}
