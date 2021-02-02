
import { BrowserRouter as Router ,Route,Redirect} from 'react-router-dom'

import Navbar from "./components/navbar.component"
import Footer from "./components/footer.component";

import Sylabus from './components/sylabus.component';
import Feedback from './components/feedback.component';
import { isAuth } from './helpers/auth';


function App() {
  return (
    <div>
    {isAuth() ? null:<Redirect to="/login" /> }
    <Router >
      <Navbar/>
  
      <Route path="/feedback" exact component={Feedback} />
      <Route path="/sylabus" exact component={Sylabus} />
      <Footer></Footer>
    </Router>
    </div>
  );
}

export default App;
