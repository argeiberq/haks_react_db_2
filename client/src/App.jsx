import './App.css';
import UserList from './componentes/UserList';
import UserForm from './componentes/UserForm'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
			<Routes>
				<Route path='' element={<UserList />}/>
				<Route path='/add' element={<UserForm />}/>
				<Route path='/edit/:id' element={<UserForm />}/> 
			</Routes>
		</Router>
  );
}

export default App;
