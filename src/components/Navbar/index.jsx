import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const Navbar = (props) => {
  const wrapperRef = useRef();
  const checkboxRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event) => {
    if (
      wrapperRef &&
      wrapperRef?.current &&
      wrapperRef?.current?.contains(event.target)
    ) {
      if (event.target.nodeName === "A") checkboxRef.current.checked = false;
    }

    if (
      wrapperRef &&
      wrapperRef?.current &&
      !wrapperRef?.current?.contains(event.target)
    ) {
      if (checkboxRef.current.checked) event.preventDefault();

      checkboxRef.current.checked = false;
    }
  };

  return (
    <nav role="navigation">
      <div id="menuToggle" ref={wrapperRef}>
        <input type="checkbox" ref={checkboxRef} />

        <span></span>
        <span></span>
        <span></span>

        <ul id="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
