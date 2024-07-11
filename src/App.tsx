import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateTipPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";
const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTipPage />
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />
  }
])

export function App() {
  return <RouterProvider router={router} />
}