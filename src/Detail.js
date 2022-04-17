/* eslint-disable */
//컴포넌트 만들때 필요!!
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';

//styled-component쓰려면 변수 대문자로 선언!!!
let Box = styled.div`
  padding-top: 30px;
`;

let Title = styled.h4`
  font-size: 25px;
  color: ${(props) => props.color};
`;

function Info(props) {
  return <p>{props.inventory[0]}</p>;
}

function TabContent(props) {
  useEffect(() => {
    props.swiChange(true);
  });
  if (props.tab === 0) {
    return <div>0번째 내용</div>;
  } else if (props.tab === 1) {
    return <div>1번째 내용</div>;
  } else if (props.tab === 2) {
    return <div>1번째 내용</div>;
  }
}
function Detail(props) {
  let [alert, alertChange] = useState(true);
  let [tab, tabChange] = useState(0);
  let [swi, swiChange] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      alertChange(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  let history = useHistory();
  let { id } = useParams();
  let shoesId = props.shoes.find((a) => {
    return a.id == id;
  });

  return (
    <div className='container'>
      <Box>
        <Title className='red'>안녕하세요</Title>
      </Box>

      {alert === true ? (
        <div className='my-alert'>
          <p>재고가 얼마 남지 않았습니다.</p>
        </div>
      ) : null}
      <div className='row'>
        <div className='col-md-6'>
          <img
            src={'https://codingapple1.github.io/shop/shoes1.jpg'}
            width='100%'
          />
        </div>
        <div className='col-md-6 mt-4'>
          <h4 className='pt-5'>{shoesId.title}</h4>
          <p>{shoesId.content}</p>
          <p>{shoesId.price}원</p>

          <Info inventory={props.inventory}></Info>

          <button
            className='btn btn-danger'
            onClick={() => {
              let newInventory = [...props.inventory[0]];
              newInventory = newInventory - 1;
              props.inventoryChange(newInventory);
            }}
          >
            주문하기
          </button>
          <button
            className='btn btn-danger'
            onClick={() => {
              // 전 페이지로 이동
              // history.goBack();
              // ()안 경로로 이동
              history.push('/');
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className='mt-5' variant='tabs' defaultActiveKey='link-0'>
        <Nav.Item>
          <Nav.Link
            eventKey='link-0'
            onClick={() => {
              swiChange(false);
              tabChange(0);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              swiChange(false);
              tabChange(1);
            }}
            eventKey='link-1'
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={swi} classNames='wow' timeout={500}>
        <TabContent tab={tab} swiChange={swiChange}></TabContent>
      </CSSTransition>
    </div>
  );
}

export default Detail;
