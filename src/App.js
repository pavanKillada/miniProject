import {Route, Switch} from 'react-router-dom'
import Login from './components/LoginPage'
import Home from './components/Home'
import ProtectedRoute from './components/protectedRoute'
import NotFound from './components/NotFound'
import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
)

export default App
