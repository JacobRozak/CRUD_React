import React, {useEffect, useState, PropsWithRef} from 'react';
import Wrapper from "./Wrapper";
import {Event} from "../interfaces/event";

const Events = (props: PropsWithRef<any>) => {
    var [tickets, setTickets] = useState([]);
    var [ticketsNumber, setTicketsNumber] = useState(0);
    var [redeemedTickets, setRedeemedTickets] = useState(0);
    var [eventName, setEventName] = useState('');
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://127.0.0.1:5000/event/${props.match.params.id}`);
                const data = await response.json();
                setTickets(data['tickets']);
                setTicketsNumber(data['tickets'].length)
                setRedeemedTickets(data['tickets'].filter((obj: Event) => obj.reedeemed == true).length)
                setEventName(data['name'])
            }
        )();
    }, []);
    
    const redeem = async (uuid: string) => {
        await fetch(`http://127.0.0.1:5000/redeem/${props.match.params.id}?uuid=${uuid}`)
            .then(response => response.json())
            .then(
                function(data){
                    setRedeemedTickets(data.filter((obj: Event) => obj.reedeemed == true).length)
                    setTickets(data)
                }   
            )
    }
    const remove = async (uuid: string) => {
        await fetch(`http://127.0.0.1:5000/deleteTicket/${props.match.params.id}?uuid=${uuid}`)
            .then(response => response.json())
            .then(
                function(data) {
                    setRedeemedTickets(data.filter((obj: Event) => obj.reedeemed == true).length);
                    setTicketsNumber(data.length)
                    setTickets(tickets.filter((p: Event) => p.uuid !== uuid))
                } 
            );
    }
    const reset = async (id: string) => {
        await fetch(`http://127.0.0.1:5000/reset/${props.match.params.id}`)
            .then(response => response.json())
            .then(
                function(data){
                    setRedeemedTickets(data.filter((obj: Event) => obj.reedeemed == true).length)
                    setTickets(data)
                }   
            )
        }
    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                <a href="#" onClick={() => reset(props.match.params.id)} className="btn btn-sm btn-outline-secondary">Reset</a>
                </div>
                <h1>{eventName}</h1>
            </div>

            <div className="table-responsive">
                <h3>All TICKETS : {ticketsNumber}</h3>
                <h3>REEDEEMED TICKETS : {redeemedTickets}</h3>
                <h3>AVALIABLE TICKETS : {ticketsNumber - redeemedTickets}</h3>
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Token</th>
                        <th>Redeemed</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.map(
                        (p: Event, i) => {
                            return (
                                <tr key={p.id}>
                                    <td>{i}</td>
                                    <td>{p.uuid}</td>
                                    <td>{p.reedeemed.toString()}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <a href="#" className="btn btn-sm btn-outline-secondary"
                                               onClick={() => redeem(p.uuid)}
                                            >Redeem</a>
                                            <a href="#" className="btn btn-sm btn-outline-secondary"
                                               onClick={() => remove(p.uuid)}
                                            >delete</a>
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

export default Events;
