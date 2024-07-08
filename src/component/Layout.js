import React from "react";
import ToolBar from "./toolbar";
import NavBar from "./naveBar";
import { Footer } from "../container/footer";

const Layout = ({ children }) => {
    return (<>
        <ToolBar />
        {/* <NavBar /> */}
        {children}
        <Footer />
    </>)
}
export default Layout;