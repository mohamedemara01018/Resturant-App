import { useDispatch, useSelector } from 'react-redux';
import './Home.css'
import type { AppDispatch } from '../../RTK/store';
import { fetchAllRecipes, getRecipesState } from '../../RTK/slices/recipesSlice/getRecipesSlice';
import { useEffect } from 'react';
import Loader from '../Loader';
import Errory from '../Error';
import { Link } from 'react-router';

function Home() {
    const dispatch: AppDispatch = useDispatch();
    const recipes = useSelector(getRecipesState)

    useEffect(() => {
        dispatch(fetchAllRecipes())
    }, [dispatch])
    if (recipes.loading) {
        return <Loader />
    }
    if (recipes.error) {
        return <Errory />
    }
    return (
        <div className='recipes'>
            {
                recipes && recipes.data && recipes.data.recipes.map((recipe: any) => {
                    return <Link key={recipe._id} to={`/recipes/${recipe._id}`} className="recipe-card">
                        <div className="recipe-card-header">
                            <h2 className="recipe-name">{recipe.name}</h2>
                            {recipe.category && <span className="recipe-category">{recipe.category}</span>}
                        </div>
                        <p className="recipe-desc">{recipe.desc}</p>
                        <p className="recipe-price">${recipe.price.toFixed(2)}</p>
                    </Link>
                })
            }


        </div>
    )
}

export default Home