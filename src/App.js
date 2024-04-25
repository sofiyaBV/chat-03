import { BrowserRouter, HashRouter } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import AppRouter from "./components/AppRouter";
import { useAppContext } from "./utils/context";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "./components/Loader";

function App() {
  const { auth } = useAppContext();
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Navigation />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
