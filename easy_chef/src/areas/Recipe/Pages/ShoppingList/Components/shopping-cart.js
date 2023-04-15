import api from '../../../../../core/baseAPI';
import React, { useState, useEffect } from 'react';

const Ingredients_List = ({ingredients}) => {
    const [total, setTotal] = useState(0)
    useEffect(() => {
        let total_ = 0
        for (let i = 0; i < ingredients.length; i++) {
            total_ += ingredients[i].Quantity
        }
        setTotal(total_)
    }, [ingredients])

const ingredientsScroll = {
    maxHeight: '450px',
    overflowY: 'scroll'
    };

    return (
        <>
            <h5>Ingredients</h5>
            <hr></hr>
            <div className="chat-history-body bg-body ps ps--active-y" style={ingredientsScroll}>
                <ul className="list-unstyled chat-history m-3">
                    {ingredients.map(item => (
                        <li>
                            <div className="row mb-1">
                                <div className="col-8 fw-normal">{item.Ingredient}</div>
                                <div className="col-4 fw-normal text-end">{item.Quantity} oz.</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <hr className="mx-n4"></hr>
            <dl className="row m-3 mb-0">
                <dt className="col-8">Total Items</dt>
                <dd className="col-4 fw-semibold text-end mb-0">{ total } oz.</dd>
            </dl>
        </>
        )
}

export default Ingredients_List