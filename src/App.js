import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Playground from './Playground'
import Sandbox from './Sandbox'

const App = () => {
  return (
    <article className="App">
      <Router>
        <Route path={process.env.PUBLIC_URL} components={Sandbox}></Route>

        <nav>
          <a href="http://localhost:3000/sandbox" className="button">
            Sandbox
          </a>
          <a href="http://localhost:3000/playground" className="button">
            Scene
          </a>
        </nav>

        <main>
          <Switch>
            <Route path="/sandbox" component={Sandbox} />
            <Route path="/playground" component={Playground} />
            <Route component={Sandbox} />
          </Switch>
        </main>
      </Router>
    </article>
  )
}

export default App
