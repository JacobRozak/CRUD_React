import React, {useEffect, useState} from 'react';
import Wrapper from "./Wrapper";
import {Product} from "../interfaces/product";
import {Link} from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://127.0.0.1:5000/');
                const data = await response.json();
                setProducts(data);
            }
        )();
    }, []);

    const remove = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await fetch(`http://127.0.0.1:5000/delete/${id}`)
            setProducts(products.filter((p: Product) => p.id !== id));
        }
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to='/create' className="btn btn-sm btn-outline-secondary">Add</Link>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(
                        (p: Product) => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td><img src="https://pyxis.nymag.com/v1/imgs/806/ec8/05638100340c7ebb8b14b799d46956ea14-28-fyre-fest.2x.h473.w710.jpg" height="180"/></td>
                                    <td><Link to={`/event/${p.id}`}>{p.name}</Link></td>
                                    <td>{p.date_created}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/edit/${p.id}`}
                                                  className="btn btn-sm btn-outline-secondary">Edit</Link>
                                            <a href="#" className="btn btn-sm btn-outline-secondary"
                                               onClick={() => remove(p.id)}
                                            >Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

export default Products;
