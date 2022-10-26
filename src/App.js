import './App.css';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Chat from './Components/Chat';
import Login from './Components/Login';
import { useStateValue } from './Components/StateProvider';


function App() {

  const [{user}, dispatch] = useStateValue();


  return (
    <div className="app">
      <Router>

        {!user ?

          <Login/>

          : <><Header />

            <div className='app_body'>

              <Sidebar />

              <Routes>
                <Route path="/room/:roomId/" element={<Chat />} />
                <Route path="/" element={<p></p>} />
              </Routes>
            </div>

          </>
        }
      </Router>
    </div >
  );
}

export default App;
