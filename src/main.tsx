import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Dashboard } from "./features/pages/dashboard"
import { HomePage } from "./features/pages/home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
])

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
    // </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
