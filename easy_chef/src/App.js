import './App.css';
import Home from './pages/Home';
import AllRecipes from './pages/AllRecipes';
import MainLayout from './core/components/MainLayout'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MyRecipes from "./pages/MyRecipes";
import ShoppingList from "./pages/ShoppingList";
import EditRecipe from "./pages/EditRecipe";
import UserProfile from "./pages/UserProfile";
import UserLogout from "./pages/UserLogout";

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
                        <Route path="edit-recipe" element={<EditRecipe />} />
                        <Route path="new-recipe" element={<EditRecipe />} />
                        <Route path="user-profile" element={<UserProfile />} />
                        <Route path="log-out" element={<UserLogout />} />
                    </Route>
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;
