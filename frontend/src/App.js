import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import SignupPage from "./Pages/SignPages/SignupPage";
import Singin from "./Pages/SignPages/Singin";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Singin />}></Route>
        <Route path="signup" element={<SignupPage />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </>
    )
  );

  return (
    <div className="App">
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "90%",
            textTransform: "capitalize",
          },
        }}
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
