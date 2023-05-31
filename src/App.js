import {Route, Switch} from 'react-router-dom'
import Login from './components/LoginPage'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/protectedRoute'
import RestaurantDetailItem from './components/RestaurantDetailItem'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute
      exact
      path="/restaurants/:id"
      component={RestaurantDetailItem}
    />
    <Route component={NotFound} />
  </Switch>
)

const sample = async () => {
  const response = await fetch(
    'http://stageapi.iguru.guru:222/api/ExamManagement/GetStudentProgressReports?schoolID=282&sectionID=2682&eXamMasID=8442&students=181521',
  )
  const data = await response.json()
  console.log(data)
}

sample()

export default App
