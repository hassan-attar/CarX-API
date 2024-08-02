import { useLayoutEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import CarsListPage from "./pages/CarsList";
import CarPage from "./pages/Car";

import { authInterceptor } from "./store/auth-actions";
import { useAuthSelector } from "./store/hooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cars", element: <CarsListPage /> },
      { path: "cars/:carId", element: <CarPage /> },
    ],
  },
]);

const App = () => {
  const token = useAuthSelector((state) => state.auth.token);

  useLayoutEffect(() => {
    authInterceptor(token);
  }, [token]);
  return <RouterProvider router={router} />;
};

export default App;
