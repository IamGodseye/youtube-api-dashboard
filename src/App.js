import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Home from "./components/home";

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;