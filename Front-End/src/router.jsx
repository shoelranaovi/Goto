import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomeLayout from "./Page/Home/HomeLayout";



export const route = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        children: [],
      },

    ],
  },
  // {
  //   path: "*",
  //   element: <GlobalRestaurant404Page />,
  // },
]);
