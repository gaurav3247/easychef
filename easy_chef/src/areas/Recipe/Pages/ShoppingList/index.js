import Recipe_List from "./Components/recipes_list"
import Ingredients_List from "./Components/shopping-cart"
import { useState, useEffect } from "react"
import { saveAs } from "file-saver";
import api from "../../../../core/baseAPI"
import cartEmpty from '../../../../assets/img/cart-empty.png';

const ShoppingList = () => {
    const [ingredients, setItems] = useState([])
    const [received, setReceived] = useState(false)

    useEffect(() => {
        api.get('/shopping-list/ingredients/')
            .then(response => {
                setItems(response.data.ingredients)
                console.log("sent request")
                setReceived(true)
            })
    }, [])

    function updateItems(newItems) {
        setItems(newItems)
    }

    function saveList(list) {
        let filedata = ''
        for (var i = 0; i < list.length; i++){
            filedata += (i+1) + ') ' + list[i].Ingredient + ': ' + list[i].Quantity + '\n'
        }
        var blob = new Blob([filedata], { type: "text/plain;charset=utf-8" })
        saveAs(blob, "shopping_list.txt")
    }

    if (received && ingredients.length === 0) {
        return (
            <div className="container justify-items-center">
                <img src={cartEmpty} alt="Card image cap" style={{maxHeight: "60vh", margin: "auto", display: "block"}}></img>
            </div>
        )
    }
    else if (received) {
        return (
        <div className="row">
            <div className="col-sm-12 col-lg-8">
                <div className="row">
                    <Recipe_List updateIngredientsList={updateItems}/>
                </div>
            </div>
            <div className="col-md-2 col-lg-4 mb-3">
                    <div className="border rounded p-4 mb-3 pb-3">
                        <Ingredients_List ingredients={ingredients}/>
                    </div>
                    <div className="col-sm-12 align-items-center">
                        <button onClick={() => saveList(ingredients)} type="button" className="btn btn-primary btn-lg waves-effect waves-light">Save Shopping List</button>
                    </div>
            </div>
        </div>
        )
    }
}

export default ShoppingList
