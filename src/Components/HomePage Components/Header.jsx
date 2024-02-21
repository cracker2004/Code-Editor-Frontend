import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({langname}) => {
  return (
    <header className="pt-3 pr-10 pl-10 h-[12vh] border-2 flex justify-between border-b-purple-700">
      <div>
        <div className="w-28 mb-1">
          <Link to={"/"} className="">
            <img
              className="h-auto w-auto object-contain"
              src="./logo-black.png"
              alt=""
            />
          </Link>
        </div>
        <p className="text-sm font-semibold text-purple-800">
          {langname} Online Compiler
        </p>
      </div>
      <div className="text-purple-800 underline font-semibold">
        <a href="/">Code With Friends?</a>
      </div>
    </header>
  );
};

export default Header;
