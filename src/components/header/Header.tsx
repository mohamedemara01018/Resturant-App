import { Link } from 'react-router'
import './Header.css'


function Header() {
    return (
        <header>
            <div className="content">
                <ul>
                    <li>
                        <Link to={'/'}>Recipes</Link>
                        <Link to={'/create-recipe'}>Create Recipe</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header