import React from "react";
import "./Layout.css";
import AccountsSidebar from "./AccountsSidebar";
import Nav from "./AccountNav";

function Layout(props) {
  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <AccountsSidebar history={props.history} />
      <div className="layout" style={{ overflow: "hidden" }}>
        <Nav />
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
