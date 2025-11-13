import { useState } from "react"
import './CreateRecipe.css'
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../RTK/store"
import { fetchCreateRecipes } from "../../RTK/slices/recipesSlice/createRecipeSlice"
import { useNavigate } from "react-router"
type FormData = {
    name: string
    desc: string
    price: number
    category: string
}

function CreateRecipe() {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        desc: "",
        price: 0,
        category: "",
    })
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { name, desc, price, category } = formData
        if (!name || !desc || !price || !category) {
            setError("All fields are required")
            return
        }
        setError("")
        console.log("Form submitted:", formData)
        const resultAction = await dispatch(fetchCreateRecipes(formData))

        if (fetchCreateRecipes.rejected.match(resultAction)) {
            setError(resultAction.payload as string || "Failed to create recipe")
        } else {
            console.log("Recipe created:", resultAction.payload)
            // reset form if needed
            setFormData({ name: "", desc: "", price: 0, category: "" })
            navigate('/')
        }



    }
    return (
        <form className="recipe-form" onSubmit={handleSubmit}>
            <h2>Create Recipe</h2>
            {error && <p className="error">{error}</p>}

            <label>
                Name
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>

            <label>
                Description
                <textarea name="desc" value={formData.desc} onChange={handleChange} />
            </label>

            <label>
                Price
                <input type="number" name="price" value={formData.price} onChange={handleChange} />
            </label>

            <label>
                Category
                <input type="text" name="category" value={formData.category} onChange={handleChange} />
            </label>

            <button type="submit">Create</button>
        </form>
    )
}

export default CreateRecipe