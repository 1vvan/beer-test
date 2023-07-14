import {create} from 'zustand';

const useRecipeStore = create((set, get) => ({
    recipes: [],
    currentPage: 6,
    selectedRecipes: [],

    fetchRecipes: async () => {
        try {
            const response = await fetch(`https://api.punkapi.com/v2/beers?page=1`);
            const data = await response.json();
            set({ recipes: data });
            console.log("Start recieps");
            console.log(data);
        } catch (error) {
            console.error('Failed to fetch recipes:', error);
        }
    },
    loadMoreRecipes: async () => {
        try {
            const currentPage = get().currentPage + 1;
            const response = await fetch(`https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=5`);
            const data = await response.json();
            set((state) => ({ currentPage, recipes: [...state.recipes.slice(5), ...data] }));
        } catch (error) {
            console.error('Failed to fetch more recipes:', error);
        }
    },

    toggleRecipeSelection: (recipeId) => {
        set((state) => ({
            selectedRecipes: state.selectedRecipes.includes(recipeId)
                ? state.selectedRecipes.filter((id) => id !== recipeId)
                : [...state.selectedRecipes, recipeId],
        }));
    },

    deleteSelectedRecipes: () => {
        set((state) => {
            const updatedRecipes = state.recipes.filter(
                (recipe) => !state.selectedRecipes.includes(recipe.id)
            );
            const slicedRecipes = updatedRecipes.slice(-15); // Оставляем только последние 15 рецептов
            return {
                recipes: slicedRecipes,
                selectedRecipes: [],
            };
        });
    },

}));

export default useRecipeStore;
