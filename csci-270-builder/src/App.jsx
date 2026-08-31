import Csci270 from "./components/Csci270";
import PdfSlideshowPrototype from "./components/PdfSlideshowPrototype";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./styles.css";

const App = () => {
  const router = createHashRouter([
    {
      path: "/",
      element: <Csci270 />,
    },
    {
      path: "/pdf-prototype",
      element: <PdfSlideshowPrototype />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
