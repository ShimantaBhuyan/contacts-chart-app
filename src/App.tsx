import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const titleMap = [
  { path: "/chart-map", title: "Charts and Maps Page" },
  { path: "/contacts", title: "Contact Page" },
  { path: "/", title: "Contact & Chart-Maps App" },
];

export default function App() {
  const curLoc = useLocation();
  const [header, setHeader] = useState("");

  useEffect(() => {
    const curHeader =
      curLoc.pathname === "/"
        ? titleMap[2]
        : titleMap.find((item) => curLoc.pathname.includes(item.path));
    if (curHeader && curHeader.title) {
      setHeader(curHeader.title);
    }
  }, [curLoc]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-lg">
        <div className="px-3 py-3 lg:px-5">
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold">{header}</h1>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 shadow-2xl"
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
                  className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
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
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
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
        <Outlet />
      </div>
    </>
  );
}
