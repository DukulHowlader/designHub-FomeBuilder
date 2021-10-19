import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import GenerateForm from "./components/GenerateForm/GenerateForm";
import Home from "./components/Home/Home";
import './App.css'
import FormMake from "./components/FormMake/FormMake";
import FormView from "./components/FormView/FormView";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/form">
          <GenerateForm/>
        </Route>
        <Route path="/forms/:id">
          <FormMake/>
        </Route>
        <Route path="/formView/:key">
          <FormView/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
