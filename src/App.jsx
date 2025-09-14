import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from './Routing/Routing';
import toast, { Toaster } from 'react-hot-toast';
function App() {






  return (
    <>
    <RouterProvider router={router} />
    <Toaster/>
    </>
  );
}

export default App;
