import { useState } from "react";
import { MenuContext } from "./MenuContext";

const MenuState = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const [isShowOpen, setIsShowOpen] = useState(false);
    const closeShow = () => {
        setIsShowOpen(false);
    };

    const [isShowEditOpen, setIsShowEditOpen] = useState(false);
    const closeShowEdit = () => {
        setIsShowEditOpen(false);
    };

    const contextValue = {
        isMenuOpen,
        setIsMenuOpen,
        closeMenu,
        isShowOpen,
        setIsShowOpen,
        closeShow,
        isShowEditOpen,
        setIsShowEditOpen,
        closeShowEdit,
    };

    return (
        <MenuContext.Provider value={contextValue}>
            {props.children}
        </MenuContext.Provider>
    );
};

export default MenuState;