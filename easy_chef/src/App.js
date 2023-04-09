import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from './core/components/MainLayout'
import Home from './areas/Home';
import AllRecipes from './areas/Recipe/Pages/AllRecipes';
import MyRecipes from "./areas/Recipe/Pages/MyRecipes";
import ShoppingList from "./areas/Recipe/Pages/ShoppingList";
import EditRecipe from "./areas/Recipe/Pages/EditRecipe";
import UserProfile from "./areas/User/Pages/Profile";
import UserLogout from "./areas/User/Pages/Logout";
import ViewRecipe from "./areas/Recipe/Pages/ViewRecipe";
import {useCallback, useState} from "react";

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home/>}/>
                        <Route path="all-recipes" element={<AllRecipes/>}/>
                        <Route path="my-recipes" element={<MyRecipes />} />
                        <Route path="shopping-list" element={<ShoppingList />} />
                        <Route path="edit-recipe/:id" element={<EditRecipe />} />
                        <Route path="new-recipe" element={<EditRecipe />} />
                        <Route path="user-profile" element={<UserProfile />} />
                        <Route path="log-out" element={<UserLogout />} />
                        <Route path="view-recipe" element={<ViewRecipe />} />
                    </Route>
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;
