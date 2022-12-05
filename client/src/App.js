import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom"
import NavBar from './components/navigation/NavBar';
import BudgetsContainer from './containers/BudgetsContainer';
import TransactionsContainer from './containers/TransactionsContainer';
import BudgetForm from './components/budgets/BudgetForm';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/Login';
import BudgetTransactions from './components/transactions/BudgetTransactions';
import NewForm from './components/NewForm';
import TransactionForm from './components/transactions/TransactionForm';
import { UserProvider } from './context/user';


function App() {
  // const {user, setUser} = useContext(UserContext);

  // useEffect(() => {
  //   fetch("/me")
  //   .then((resp) => {
  //     if (resp.ok) {
  //       resp.json().then((user) => {
  //         setUser(user)
  //       });
  //   } else {
  //     resp.json().then((error) => console.log(error.error))
  //   }
  //   })
  // },[user, setUser])

  return (
        <div className="App">
          <UserProvider>
            <NavBar />
            <Routes>
              <Route exact path="/budgets/new" element={<BudgetForm />}/>
              <Route path="/budgets" element={<BudgetsContainer />}/>
                
     

              <Route path='/budgets/:id/transactions'>
                <BudgetTransactions />
              </Route>

              <Route exact path="/transactions">
                <TransactionsContainer />
              </Route>

              <Route exact path="/transactions/new">
                <TransactionForm />
              </Route>

              <Route exact path="/new">
                <NewForm />
              </Route>

              <Route exact path="/login">
                <Login />
              </Route>

              <Route exact path="/">
                <Dashboard />
              </Route>

            </Routes>
          </UserProvider>
        </div>
        
      
   
  );
}

export default App;
