import { Header} from "../../styled-components/styleIndex"
import { Link } from 'react-router-dom'

const NavBar = () => {

  return (
    <div className='nav-wrapper'>
      <Header>
        <h1>Budget Tracker</h1>
        <nav>
        <Link to="/">
            <li>My Dashboard</li>
        </Link>
        <Link to="/budgets">
            <li>Budgets</li>
        </Link>
        <Link to="/transactions">
            <li>Transactions</li>
        </Link>
        <Link to="/new">
            <li className="circle">+</li>
        </Link>
       </nav>
       <h2></h2>
       </Header>
    </div>
  )
}

export default NavBar;
