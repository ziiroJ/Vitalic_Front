import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCalendarAlt,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NavBarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  height: 80px;
  border-radius: 10px 10px 0 0;
  background-color: #f3a338;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 70px;
  }

  @media (max-width: 480px) {
    height: 60px;
  }
`;

const NavButton = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  text-decoration: none;
  border: none;
  background-color: transparent;
  margin-top: 5px;
  padding-top: 5px;

  &:hover {
    color: #000;
    transition: color 0.2s;
  }

  svg {
    margin-bottom: 5px;
  }

  @media (max-width: 480px) {
    svg {
      font-size: 1.5em;
    }
    font-size: 0.8em;
  }
`;

function NavBar() {
  return (
    <>
      <NavBarContainer>
        <NavButton to="/calendar">
          <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
          CALENDAR
        </NavButton>
        <NavButton to="/home">
          <FontAwesomeIcon icon={faHouse} size="2x" />
          HOME
        </NavButton>
        <NavButton to="/goal">
          <FontAwesomeIcon icon={faTrophy} size="2x" />
          GOAL
        </NavButton>
      </NavBarContainer>
    </>
  );
}

export default NavBar;
