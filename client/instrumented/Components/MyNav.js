import { useHistory } from 'react-router-dom';
import { Navbar, Container, Button, Modal, Row, Col, Table, ListGroup, Alert } from "react-bootstrap";
import { useState } from "react";
import { clock, iconStar, iconPerson, iconCalendar, iconCart, cartFill, cross, coin } from "./Icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import Clock from "./Clock";
import { addPRequest } from '../API/API';

import { Offcanvas } from "react-bootstrap";
import React from 'react';
import { useEffect } from 'react';

export default function MyNav(props) {

  const history = useHistory();
  const [show, setShow] = useState(false);
  const [showHour, setShowHour] = useState(false);
  const toggleShow = () => setShow(!show);
  var date = dayjs(props.date)
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [message, setMessage] = useState([]);

  const toggleShowHour = () => {
    setShow(false);
    setShowHour(!show)
  };

  const handleLogout = async () => {
    await props.logout();
    props.setLogged(false);
    history.push("/")

  }

  const handleModal = () => {
    var newDate = new Date(dayjs(props.date).format('MMMM DD, YYYY ' + hour + ":" + min));
    props.setDate(newDate);
    setShowHour(false);
    date = dayjs(props.date);
  }

  const handleCalendar = (inp) => {
    props.setDate(inp);
    setShow(false);
    setHour(0);
    setMin(0);
  }

  //when the basket button in clicked, the offcanvas will show up
  const handleShowBasket = () => { props.setShowBasket(true) }

  //this use effect is used to show a message when the order is sent
  useEffect(() => {
    setTimeout(() => {
      setMessage([]);
    }, 5000);
  }, [message]);

  return (
    <>
      <Navbar className="justify-content-between NavBar-Background text-warning myNav" expand="sm">
        <Container fluid>
          <Navbar.Brand style={{ fontSize: "25px" }}>
            <a href="/" className="nounderline">
              {iconStar}
              <span> SPG - Group 07</span></a>
          </Navbar.Brand>
          < div className="">
            <Button variant="light" onClick={toggleShow} className="me-2 callandarButton" style={{ fontSize: "17px" }}>
              {iconCalendar}
              {date.format('ddd DD MMM')}
            </Button>
            <Button variant="light" onClick={toggleShowHour} className="btn-hour">
              {clock}
              {date.format('HH:mm')}
            </Button>
            {show ? (
              <Calendar className="position-absolute priority react-calendar" onChange={handleCalendar} style={{ color: "#0f8b8b" }} value={props.date} />
            ) : (
              ""
            )}
            <Modal className="" show={showHour} onHide={() => !showHour} animation={false}>
              <Modal.Body>
                <Row className="mt-3 ps-3 pe-3 mb-2">
                  <Col className="col-3" style={{ "fontWeight": "600" }}><p>Select hour: </p></Col>
                  <Col className="col-9" ><input
                    className="input-hour"
                    type="number"
                    min={0}
                    max={23}
                    step={1}
                    value={hour}
                    onChange={e => setHour(e.target.value)}
                  /></Col>
                </Row>
                <hr className="p-0 m-0 mb-3" />
                <Row className="ps-3 pe-3" style={{ "fontWeight": "600" }}>
                  <Col className="col-3"><p>Select min: </p></Col>
                  <Col className="col-9"><input
                    className="input-hour"
                    type="number"
                    min={0}
                    max={60}
                    step={1}
                    value={min}
                    onChange={e => setMin(e.target.value)}
                  /></Col>
                </Row>
                <hr className="p-0 mt-1" />
                <Clock size={200} date={new Date(props.date.getFullYear(), props.date.getMonth(), props.date.getDate(), hour, min)} timeFormat="24hour" hourFormat="standard" />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => { setShowHour(false) }} style={{ 'backgroundColor': "#143642" }}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleModal} style={{ fontSize: "17px", "fontWeight": "500" }}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <Navbar.Text>
            {iconPerson}{" "}
            {props.logged ? (
              <>
                <Button variant="link" style={{ color: "#ec9a2a", fontSize: "20px", textDecoration: "none" }} onClick={handleLogout} id="logoutbutton">Logout</Button>
                {props.logged === "client" && <Button className="ml-2" onClick={() => handleShowBasket()}>{iconCart}</Button>}
              </>
            ) : (
              <>
                {" "}
                <Link to="/login">
                  <Button variant="link" style={{ fontSize: "20px", color: "#ec9a2a" }} className="btn-login">Login</Button>
                </Link>
                <Button variant="link" style={{ fontSize: "20px", color: "#ec9a2a" }} className="btn-reg">Register</Button>{" "}
              </>
            )}{" "}
          </Navbar.Text>
        </Container>
      </Navbar>
      {message.length > 0 && <Alert variant={message[0]}>{message[1]}</Alert>}
      <BasketOffCanvas showBasket={props.showBasket} setShowBasket={props.setShowBasket}
        dirtyBasket={props.dirtyBasket} setDirtyBasket={props.setDirtyBasket} setDirtyQuantity={props.setDirtyQuantity}
        userId={props.userId} date={props.date} setMessage={setMessage} setDirtyAvailability={props.setDirtyAvailability}
      />
    </>
  );
}

function BasketOffCanvas(props) {

  const [elements, setElements] = useState([]);

  //function called to close the offcanvas
  const handleClose = () => props.setShowBasket(false);

  //this use effect is used to update the basket!
  useEffect(() => {
    if (props.dirtyBasket) {
      if (sessionStorage.length > 0) {
        setElements(JSON.parse(sessionStorage.getItem("productList")))
      }
      props.setDirtyBasket(false);
    }

  }, [props.dirtyBasket, props.setDirtyBasket])

  //this use effect does the cleanup if the date changes
  /*   useEffect(()=>{
        sessionStorage.removeItem("productList")
        setElements([])
    }, props.date ) 
   */
  //this is used to adjust the quantity if something is removed from the basket
  function handleClick(id, quantity) {
    if (sessionStorage.length > 0) {
      let list = JSON.parse(sessionStorage.getItem("productList"));
      let info = [id, quantity]
      list = list.filter((el) => el.productid !== id)
      sessionStorage.setItem("productList", JSON.stringify(list))
      props.setDirtyBasket(true)
      props.setDirtyQuantity(info)
    }
  }

  function getTotal() {
    if (sessionStorage.length > 0) {
      let list = JSON.parse(sessionStorage.getItem("productList"));
      return parseFloat(
        list.reduce((partial_sum, product) => {
          return partial_sum + parseFloat(product.subtotal)
        }, 0)).toFixed(2)
    }
  }

  function checkAndOrder() {
    addPRequest(props.userId,
      props.date,
      null,
      null,
      null,
      null,
      "pending",
      elements)
      .then(result => {
        if (result.status !== undefined && result.status === 406) {
          props.setMessage(["danger", result.listofProducts.map(x => x.name + " ").concat("are not available")])
        }
        else if (result.status !== undefined && result.status === 200) {
          props.setMessage(["success", "Order received!"])
          sessionStorage.removeItem("productList")
          setElements([])
          props.setDirtyAvailability(true)
        }
      }).catch(err => { props.setMessage(["danger", err.message]) })
      .finally(() => {
        props.setShowBasket(false)
      })

  }

  return (
    <Offcanvas show={props.showBasket} placement="end" onHide={handleClose} {...props} style={{ "backgroundColor": "#FFF3E0", color: "#5E3A08" }}>
      <Offcanvas.Header closeButton className="division">
        <Offcanvas.Title className="d-flex align-items-center" style={{ fontSize: "28px" }}>
          {cartFill} {'\u00A0'} This is your <strong>{'\u00A0'}basket</strong></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ maxHeight: "75vh" }}>
        <Offcanvas.Title style={{ fontSize: "30px", "fontWeight": "600" }}>Selected Items</Offcanvas.Title>
        {elements && elements.length > 0 ?
          <>
            <Table size="sm" className="mt-3" responsive>
              <tr className="mb-0" style={{ borderBottom: "2px solid black" }}>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </Table>
            <ListGroup variant="flush">
              {elements.map((el, index) => {
                return (
                  <>
                    <Row key={index} className={index === 0 ? "" : "mt-2"} style={{ borderBottom: "1px solid gray" }}>
                      <Row className="p-0 m-0 w-100">
                        <Col xs={5}>{el.name}</Col>
                        <Col style={{ paddingLeft: "0px" }}>{el.quantity} {el.measure} </Col>
                        <Col className="text-center">
                          <Button variant="flat" className="py-0 m-0" style={{ position: "relative", bottom:"0.2rem" }} onClick={() => { handleClick(el.productid, el.quantity) }}>{cross}</Button>
                        </Col>
                      </Row>
                      <Row className="m-0 p-0 " style={{ fontSize: "0.7rem" }}>
                        <span className="text-muted pb-1 p-0" style={{ position: "relative", left: "8rem", maxWidth: "7rem" }} > Subtotal: {parseFloat(el.subtotal).toFixed(2)} €</span>
                      </Row>
                    </Row>
                  </>
                )
              })}
            </ListGroup>
          </>

          :
          <p className="mt-3">Your basket is currently empty.</p>
        }
        <Container className="fixed-bottom" style={{ position: "absolute", maxHeigh: "25vh" }}>
          {elements && elements.length > 0 &&
            <Row style={{ position: "relative", bottom: "3rem", left: "0.5rem" }} className="mb-3 division">
              <Col><strong>Total:</strong></Col>
              <Col><strong>{getTotal()} €</strong></Col>
            </Row>}
          <Button className="order-btn" style={{ position: "absolute", left: "8.5rem", bottom: "1rem" }}
            disabled={!(elements && elements.length > 0)} variant="yellow"
            onClick={() => checkAndOrder()}>
            <span style={{ position: "relative", bottom: "0.1rem" }}>{coin}</span> Check and order
          </Button>
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  )
}