import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";

import store from "./components/Contact/contact-slice";

import Root from "./routes/root";
import ErrorPage from "./error-page";
import Contacts from "./routes/contact";
import CreateContact from "./routes/create-contact";
import ContactDetails from "./routes/contact-details";
import EditContact from "./routes/edit-contact";
import ChartsMaps from "./routes/charts-maps";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/",
        element: <Contacts />,
      },
      {
        path: "contacts/:contactId",
        element: <ContactDetails />,
      },
      {
        path: "contacts/edit/:contactId",
        element: <EditContact />,
      },
      {
        path: "contacts/create",
        element: <CreateContact />,
      },
      {
        path: "charts-maps/",
        element: <ChartsMaps />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
