import api from '../../../../../core/baseAPI';
import React, { useState, useEffect } from 'react';

const Ingredients_List = ({ingredients}) => {
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let total_ = 0
        for (var i = 0; i < ingredients.length; i++) {
            total_ += ingredients[i].Quantity
        }
        setTotal(total_)
    }, [ingredients])

    return (
        <>
            <h5>Ingredients</h5>
            <hr></hr>
            <div className="chat-history-body bg-body ps ps--active-y">
                <ul className="list-unstyled chat-history m-3">
                    {ingredients.map(item => (
                        <li>
                            <div className="row mb-1">
                                <div className="col-10 fw-normal">{item.Ingredient}</div>
                                <div className="col-2 fw-normal text-end">{item.Quantity}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <hr className="mx-n4"></hr>
            <dl className="row m-3 mb-0">
                <dt className="col-11">Total Items</dt>
                <dd className="col-1 fw-semibold text-end mb-0">{ total }</dd>
            </dl>
        </>
    )
}

export default Ingredients_List