import React from "react";
import { codeingLanguages } from "../Constants/constants";

const LanguageIcons = ({ language, setLanguage, setLangname}) => {
  const handleClick = (newLang, name) => {
    setLanguage(newLang);
    setLangname(name)
  };

  return (
    <>
      {codeingLanguages.map((e) => {
        return (
          <div key={e.src} onClick={() => handleClick(e.type, e.name)}>
            <img
              className={`border rounded-sm w-8 h-8 object-contain m-2 mt-0 p-1.5 cursor-pointer active:invisible ${
                language === e.type && `border-purple-700 border-2`
              }`}
              src={e.src}
              alt=""
            />
          </div>
        );
      })}
    </>
  );
};

export default LanguageIcons;
