import React, {SyntheticEvent, useState} from 'react';
import Wrapper from "./Wrapper";
import {Redirect} from 'react-router-dom';

const ProductsCreate = () => {
    const [name, setName] = useState('');
    const [tickets, setTickets] = useState(0);
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!isNaN(tickets)) {
            await fetch('http://127.0.0.1:5000/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name:name,
                    amount:tickets
                })
            });
        }
        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to={'/'}/>
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="title"
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Number of tickets</label>
                    <input type="number" className="form-control" name="image"
                        onChange={e => setTickets(parseInt(e.target.value))}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default ProductsCreate;
