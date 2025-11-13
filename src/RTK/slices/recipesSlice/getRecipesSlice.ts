import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Base_URL } from "../../../utils/constants";
import type { InitialStateRecipe } from "../../../types";
import type { RootState } from "../../store";


export const fetchAllRecipes = createAsyncThunk('getRecipesSlice/fetchAllRecipes', async () => {
    try {
        const response = await fetch(`${Base_URL}/recipes`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = (await response.json()).data
        return data
    } catch (error) {
        console.log(error)
    }
})

const initialState: InitialStateRecipe = {
    loading: null,
    data: null,
    error: null
}

const getRecipesSlice = createSlice({
    name: 'getRecipesSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllRecipes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload
            })
            .addCase(fetchAllRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
    }

})


export const getRecipesState = (state: RootState) => state.getRecipes
export default getRecipesSlice.reducer


