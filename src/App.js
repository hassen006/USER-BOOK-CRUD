import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './component/Navbar';
import User from './component/User'
import Book from './component/Book'
import Home from './component/Home';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";



function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/user" element={<User/>} />
            <Route path="/book" element={<Book/>} />
      </Routes>
    </Router>
  );
}

export default App;
