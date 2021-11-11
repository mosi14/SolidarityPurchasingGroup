import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import API from './API/API.js';
import {addPRequest} from './API/API'
import MyNav from "./Components/MyNav";
import { BrowserRouter as Router, Route, } from "react-router-dom";
import { useEffect, useState } from 'react';
import ProductsList from "./Components/ProductsList";
import ProductRequest from "./Components/ProductRequest";
import { Container, Row, Col } from "react-bootstrap";
import Handout from "./Components/Handout";
import Register from "./Components/Register";

function App() {
  const [dirty, setDirty] = useState(true);
  const [farmers, setFarmers] = useState(["Tizio", "Caio", "Sempronio", "Mino", "Pino"]);
  const [categories, setCategories] = useState(["Vegetables", "Meat", "Bread", "Eggs", "Milk"]);
  const [products, setProducts] = useState([{
    "id": 0,
    "name": "Artichoke",
    "farmerid": 0,
    "price": 2,
    "measure": "kg",
    "category": "Vegetables",
    "typeofproduction": "",
    "picture": ""
  }, {
    "id": 1,
    "name": "lOLLO",
    "farmerid": 1,
    "price": 200,
    "measure": "kg",
    "category": "Vegetables",
    "typeofproduction": "",
    "picture": ""
  }]);
  const [clients, setClients] = useState([]);

  const [orders, setOrders] = useState([
    {
      id:1,
      userid: 4,
      creationdate: "2021-11-09",
      claimdate: "2021-11-10 12:30",
      confirmationdate: "2021-11-09",
      deliveryaddress: null,
      deliveryid: null,
      status: "confirmed",
      products: [{
        id: 1,
        name: "Carote",
        quantity: 3,
        measure: "kg",
        price: 12.10
      }, {
        id: 2,
        name: "Patate",
        quantity: 10,
        measure:"kg",
        price: 20.11
      }]
    }, {
      id:2,
      userid: 5,
      creationdate: "2021-11-09",
      claimdate: "2021-11-10 12:30",
      confirmationdate: "2021-11-09",
      deliveryaddress: null,
      deliveryid: null,
      status: "confirmed",
      products: [{
        id: 4,
        name: "Tomino di Capra",
        quantity: 3,
        measure:"kg",
        price: 12.10
      }]
    }, {
      id:3,
      userid: 6,
      creationdate: "2021-11-09",
      claimdate: "2021-11-10 12:30",
      confirmationdate: "2021-11-09",
      deliveryaddress: null,
      deliveryid: null,
      status: "confirmed",
      products: [{
        id: 4,
        name: "Tomino di Capra",
        quantity: 3,
        measure:"kg",
        price: 12.10
      }, {
        id: 2,
        name: "Patate",
        quantity: 10,
        measure:"kg",
        price: 20.11
      }, {
        id: 1,
        name: "Patate",
        quantity: 3,
        measure:"kg",
        price: 12.10
      }]
    }, {
      id:4,
      userid: 7,
      creationdate: "2021-11-09",
      claimdate: "2021-11-10 12:30",
      confirmationdate: "2021-11-09",
      deliveryaddress: null,
      deliveryid: null,
      status: "confirmed",
      products: [{
        id: 7,
        name:"Salame",
        quantity: 3,
        measure:"kg",
        price: 12.10
      }, {
        id: 6,
        name:"Croccante di nocciola",
        quantity: 10,
        measure:"unità",
        price: 20.11
      }, {
        id: 2,
        name:"Patate",
        quantity: 3,
        measure:"kg",
        price: 12.10
      }]
    }, {
      id:5,
      userid: 9,
      creationdate: "2021-11-09",
      claimdate: "2021-11-10 12:30",
      confirmationdate: "2021-11-09",
      deliveryaddress: null,
      deliveryid: null,
      status: "confirmed",
      products: [{
        id: 7,
        name:"Salame",
        quantity: 3,
        measure:"kg",
        price: 12.10
      }, {
        id: 6,
        name:"Croccante di nocciola",
        quantity: 10,
        measure:"unità",
        price: 20.11
      }, {
        id: 2,
        name:"Patate",
        quantity: 3,
        measure:"kg",
        price: 12.10
      }, {
        id: 1,
        name: "Carote",
        quantity: 3,
        measure: "kg",
        price: 12.10
      }, {
        id: 8,
        name:"Hamburger",
        quantity: 1,
        measure:"kg",
        price: 15.11
      }, {
        id: 3,
        name:"Prezzemolo",
        quantity: 2,
        measure:"mazzi",
        price: 3.00
      }]
    }, {
      id:6,
      userid: 4,
      creationdate: "2021-11-09",
      claimdate: "2021-11-10 12:30",
      confirmationdate: "2021-11-09",
      deliveryaddress: null,
      deliveryid: null,
      status: "confirmed",
      products: [{
        id: 4,
        name:"Tomino di capra",
        quantity: 3,
        measure:"kg",
        price: 12.10
      }]
    }
  ]);

  /*useEffect(() => {
    if (dirty) {
      API.getAvailableProducts().then((p) => {
        //setTimeout(() => {
        setProducts(p);
        setDirty(false);
        //}, 1000);
      });
    }
  }, [dirty]);*/

  useEffect(() => {
    //API get availability
    let order = orders[0];

    addPRequest(order.userid, order.creationdate, order.claimdate, order.confirmationdate, order.deliveryaddress, order.deliveryid, order.status, order.products).then().catch();
}, []);

  return (
    <>
      <Router>
        <Route path="/"> <MyNav IsLogin={false} /></Route>
        <Route exact path='/products'>
          <Container className="p-0 m-0" fluid>
            <Row className="">
              <ProductsList
                products={products}
                categories={categories}
                farmers={farmers}
                className=""
              />
            </Row>
          </Container>
        </Route>

        <Route exact path='/productRequest' render={() => <ProductRequest clients={clients} setClients={setClients} products={products} />} />
        <Route exact path="/handout" render={() => <Handout clients={clients} setClients={setClients} orders={orders} setOrders={setOrders} />} />
        <Route exact path="/registerClient" render={() => <Register />} />

      </Router>
    </>
  );
}

export default App;
