import { useEffect, useState } from "react";
import { Card, Container, Button, Form, ListGroup, ListGroupItem, Alert } from "react-bootstrap";
import React from 'react'
import Select from 'react-select'
import { getClients, getClientOrders } from "../API/API"
import OrderToggle from "./OrderToggle";
import { home } from "./Icons";
import { useHistory } from 'react-router-dom';

export default function Handout(props) {
    const history = useHistory();

    const [selectedClient, setSelectedClient] = useState(""); //this state controls the Select input
    const [options, setOptions] = useState([]); //this state is used to store the information in props.clients in the format that works with the Select 
    const [error, setError] = useState("");
    const [stop, setStop] = useState(false);

    /*used to get all the clients when the component is being loaded
    then, converts the information in the best format to show options in the Select input*/
    useEffect(() => {
        setError("");
        if (!stop) {
            getClients()
                .then((res) => {
                    props.setClients(res)
                    setStop(true)
                    setOptions(res.map((e) => {
                        return { value: e.userid, label: e.name + " " + e.surname + " - " + e.address }
                    }))
                })
                .catch((err)=>{
                    setError(err.message);
                })
        }
    }, [props]);

    //this function is called only when the client is selected to load their orders
    function handlechange(event) {
        setSelectedClient(event.value);
        getClientOrders(event.value)
            .then((res) => {
                props.setOrders(res)
            })
            .catch((err) => {
                setError(err.message);
            })
    }

    return (
        <Container className="justify-content-center mt-3">
            <h1 className="text-center">Record product handout.</h1>
            <Card className="text-left mt-4">
                <ListGroup className="list-group-flush">
                    <ListGroupItem className="p-0">
                        <Card.Header>
                            First, select <b>the client</b>.
                        </Card.Header>
                        <Card.Body>
                            <Form className="client-here">
                                <Select options={options} onChange={(event) => handlechange(event)} />
                            </Form>
                        </Card.Body>
                    </ListGroupItem>
                    {selectedClient && !error &&
                        <>
                            <ListGroupItem className="p-0">
                                <Card.Header>Then, select <b>the order</b>.</Card.Header>
                                <Card.Body>
                                    {props.orders.length === 0 ?
                                        <span>There is no order to be handed out.</span>
                                        :
                                        <ListGroup>
                                            {props.orders.map((o, i) => {
                                                return (
                                                    <OrderToggle order={o} chiave={o.id} key={i} />
                                                )
                                            })}
                                        </ListGroup>
                                    }
                                </Card.Body>
                            </ListGroupItem>
                        </>
                    }
                    {error && <Alert variant="danger">An error as occurred: {error}</Alert>}
                </ListGroup>
            </Card>
                <Button
                    className='position-fixed rounded-circle d-none d-md-block'
                    style={{ width: '4rem', height: '4rem', bottom: '3rem', right: '3rem', zIndex: '100', "backgroundColor": "#143642", color: "white" }}
                    onClick={() => history.push("/")}>
                    {home}
                </Button>
        </Container>
    )
}