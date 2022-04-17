/* eslint-disable */
import React, { useContext, useState } from 'react';
import logo from './logo.svg';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import data from './data.js';
import './App.css';
import Detail from './Detail.js';
//리액트에서 사용하는 ajax 서버연결 라이브러리
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';

let inventoryContext = React.createContext();

function Shoes(props) {
  let inventory = useContext(inventoryContext);
  return (
    <div className='col-md-4'>
      <img
        src={
          'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'
        }
        width='100%'
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
      {inventory[props.i]}
      <Test></Test>
    </div>
  );
}

function Test() {
  let inventory = useContext(inventoryContext);
  return <p> 재고:{inventory}</p>;
}

function App() {
  let [shoes, shoesChange] = useState(data);
  let [loading, loadingChange] = useState(false);
  let [inventory, inventoryChange] = useState([10, 11, 12]);

  return (
    <div>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>Shopping </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link as={Link} to='/'>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to='/detail'>
                Detail
              </Nav.Link>
              <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path='/'>
          <div className='background'>
            <h1>20% Season Off</h1>
            <p>
              this is a simple hero unit, a simple,style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant='primary'>Learn more</Button>
            </p>
          </div>

          <div className='container'>
            <inventoryContext.Provider value={inventory}>
              <div className='row'>
                {shoes.map((e, i) => {
                  return <Shoes shoes={e} i={i} key={i} />;
                })}
              </div>
            </inventoryContext.Provider>
            {loading == true ? <p>로딩중입니다.</p> : null}

            <button
              className='btn btn-primary'
              onClick={() => {
                loadingChange(true);
                //서버에 post 요청
                //axios.post('서버url',{id:'one-il',pw:1234}).then();
                //서버에 get 요청
                axios
                  .get('https://codingapple1.github.io/shop/data2.json')
                  //통신에 성공했을때
                  .then((result) => {
                    loadingChange(false);
                    shoesChange([...shoes, ...result.data]);
                  })

                  //통신에 실패했을때
                  .catch(() => {
                    console.log('실패했습니다');
                  });
              }}
            >
              더보기
            </button>
          </div>
        </Route>

        <Route path='/detail/:id'>
          <Detail
            shoes={shoes}
            inventory={inventory}
            inventoryChange={inventoryChange}
          />
        </Route>

        <Route path='/:id'>
          <div>...</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
