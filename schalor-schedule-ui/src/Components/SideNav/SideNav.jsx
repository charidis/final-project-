import * as React from "react";

import "./SideNav.css";

import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Classes</Popover.Header>
    <Popover.Body>
      <ListGroup>
        <ListGroup.Item>CICS1302</ListGroup.Item>
        <ListGroup.Item>MATH1302</ListGroup.Item>
      </ListGroup>
    </Popover.Body>
  </Popover>
);

export default function SideNav({ user, terms}) {
  return (
    <div className="side-nav">
      <div>
        <Row className="mt-2">
          <Col>
            <span className="user-initial">
              {user.firstName? `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}` : null}
          
            </span>
            <span>
              {user.firstName} {user.lastName}
            </span>
          </Col>
        </Row>
        <Row className="mt-5">
          <input
            className="class-search-bar"
            type="text"
            name="Search"
            placeholder="Search"
          />
        </Row>
        <Row>
          {terms.map((term, index) => (
            <span className="term-btn">{term.title}</span>
          ))}
        </Row>
      </div>
    </div>
  );
}
