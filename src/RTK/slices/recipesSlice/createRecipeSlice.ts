import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Base_URL } from "../../../utils/constants";
import type { InitialStateRecipe } from "../../../types";
import type { RootState } from "../../store";

export const fetchCreateRecipes = createAsyncThunk(
    "createRecipesSlice/fetchCreateRecipes",
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await fetch(`${Base_URL}/recipes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                const errorData = await response.json()
                return rejectWithValue(errorData) 
            }

            const data = await response.json()
            return data.data 
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState: InitialStateRecipe = {
    loading: null,
    data: null,
    error: null
}

const createRecipesSlice = createSlice({
    name: 'getRecipesSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateRecipes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCreateRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload
            })
            .addCase(fetchCreateRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
    }

})


export const createRecipesState = (state: RootState) => state.createRecipes
export default createRecipesSlice.reducer


