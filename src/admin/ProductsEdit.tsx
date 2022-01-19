import React, {PropsWithRef, SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from "./Wrapper";
import {Redirect} from 'react-router-dom';

const ProductsEdit = (props: PropsWithRef<any>) => {
    const [name, setName] = useState('');
    const [tickets, setTickets] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const [date, setDate] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!isNaN(tickets)) {
            await fetch(`http://127.0.0.1:5000/update/${props.match.params.id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "name":name,
                    "amount":tickets,
                    "date":date
                })
            });
            setRedirect(true);
        } else {
            alert("use numbers, dont be that guy")
        }
        
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
                           defaultValue={name}
                           onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Add tickets</label>
                    <input type="text" className="form-control" name="image"
                        defaultValue={tickets}
                        onChange={e => setTickets(parseInt(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" className="form-control" name="image"
                        onChange={e => setDate(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default ProductsEdit;
