import { configureStore } from "@reduxjs/toolkit";
import getRecipesSlice from "./slices/recipesSlice/getRecipesSlice";
import createRecipesSlice from './slices/recipesSlice/createRecipeSlice'

export const store = configureStore({
    reducer: {
        getRecipes: getRecipesSlice,
        createRecipes: createRecipesSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch