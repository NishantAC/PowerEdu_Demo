import React, { useEffect, useState, useContext, useRef } from "react";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";




function Information() {
  const { user } = useSelector((state) => state.user);
  const themeProperties = useSelector(selectThemeProperties);

  return (
    <div className=" max-xl:max-w-4/5 max-xl:mt-10 flex flex-col h-full " >
  
      <div className="h-full relative  ">

      </div>
    </div>
  );
}

export default Information;