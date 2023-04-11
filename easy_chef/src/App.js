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
import {useCallback, useRef, useState} from "react";

function App() {
    const [render, setRerender] = useState(false);
    const mainLayoutRef = useRef();

    function Rerender(){
        setRerender(!render);
        mainLayoutRef.current.ReRender();
    }

    return (
        <BrowserRouter>
            <MainLayout ref={mainLayoutRef}>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home/>}/>
                        <Route path="all-recipes" element={<AllRecipes/>}/>
                        <Route path="my-recipes" element={<MyRecipes/>}/>
                        <Route path="shopping-list" element={<ShoppingList/>}/>
                        <Route path="edit-recipe/:id" element={<EditRecipe key={Math.random()}/>}/>
                        <Route path="new-recipe" element={<EditRecipe key={Math.random()}/>}/>
                        <Route path="new-recipe/:baseId" element={<EditRecipe key={Math.random()}/>}/>
                        <Route path="user-profile/:id" element={<UserProfile onReRender={Rerender} key={Math.random()}/>}/>
                        <Route path="user-profile" element={<UserProfile onReRender={Rerender} key={Math.random()}/>}/>
                        <Route path="log-out" element={<UserLogout/>}/>
                        <Route path="view-recipe/:id" element={<ViewRecipe/>}/>
                    </Route>
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;
