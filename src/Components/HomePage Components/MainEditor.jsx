import React from "react";
import { useState } from "react";
import LanguageIcons from "../LanguageIcons";
import Split from "react-split";
import axios from "axios";

const MainEditor = ({ setLangname }) => {
  const [language, setLanguage] = useState("c");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [jobId, setJobId] = useState("");
  const [status, setStatus] = useState("");
  const [inputValues, setInputValues] = useState("");

  const handleSubmit = async () => {
    const payLoad = {
      language,
      code,
      inputValues
    };
    try {
      setOutput("");
      setJobId("");
      setStatus("");
      const { data } = await axios.post("http://localhost:5000/run", payLoad);
      // console.log(data);
      setJobId(data.jobId);

      let intervalId;

      intervalId = setInterval(async () => {
        const { data: dataRes } = await axios.get(
          "http://localhost:5000/status",
          { params: { id: data.jobId } }
        );
        // console.log(dataRes);

        const { success, job, error } = dataRes;
        if (success) {
          const { status: jobStatus, output: joboutput } = job;
          setStatus(jobStatus);
          if (jobStatus === "pending") return;
          setOutput(joboutput);
          clearInterval(intervalId);
        } else {
          setStatus("error");
          console.log(error);
          setOutput(error);
          clearInterval(intervalId);
        }
      }, 1000);
    } catch (e) {
      if (e.response) {
        const { stderr } = e.response.data.err;
        setOutput(stderr);
      } else {
        setOutput("Error Connecting To Server");
      }
      console.log(stderr);
    }
    // console.log(output);
    // console.log(code);
  };


  return (
    <section className="bg-[#f5f5f5] h-[88vh] flex">
      <aside className="h-full ">
        <div className="border-l-2 border-r-2 h-[100%] pt-2 border-r-purple-200">
          {/* SideBar where user will select the language */}
          <LanguageIcons
            language = {language}
            setLanguage = {setLanguage}
            setLangname = {setLangname}
          />
        </div>
      </aside>

      <aside className="flex-1 border-r-[10px] border-r-[#f5f5f5] pt-1">
        <div className="flex h-[7vh]">
          {/* File Name And Some Buttons  */}
          <p className="p-2 pl-3 border-r-2 border-r-purple-200 border-t-2 border-t-purple-200 text-sm text-black font-semibold bg-white rounded-t-md">
            main.{language}
          </p>

          <div className="flex p-1 gap-4 pr-5 justify-end flex-1 border-b-2 border-b-purple-200">
            <img
              className=" p-[8px] cursor-pointer active:invisible"
              src="../../../minimize.png"
              alt=""
            />
            <img
              className=" p-1 cursor-pointer active:invisible"
              src="../../../setting.png"
              alt=""
            />
            {/* <img className="" src="../../../minimize.png" alt="" /> */}
            <button
              className=" text-center font-bold px-4  text-xs text-white bg-purple-700 rounded-sm h-6 hover:bg-purple-800 "
              onClick={handleSubmit}
            >
              Run
            </button>
          </div>
        </div>
        {/* Editor Text Area */}
        <textarea
          id="code-wrapper"
          className="min-w-full min-h-[79vh] max-w-full max-h-[79vh] outline-none border-r-2 border-r-purple-200 border-b-2 border-b-purple-200"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        ></textarea>
      </aside>

      {/* <aside> */}
      <Split
        className="flex-1 bg-[#f5f5f5] text-[13px] font-bold max-h-[88vh] gutter"
        direction="vertical"
        sizes={[50, 50]}
        minSize={100}
        gutterSize={12}
      >
        <div className="pt-1 flex flex-col ">
          {/* DIV FOR THE INPUT  */}
          <div className="flex">
            <h6 className="bg-white p-2 pl-3 rounded-tl-md">Inputs</h6>
            <div className="flex justify-end flex-1">
              <button className="bg-white px-3 py-0 mr-4 mb-1 border border-purple-700 rounded-[4px] h-6 active:invisible">
                Clear
              </button>
            </div>
          </div>
          <textarea className="bg-white flex-1 scrollbar pl-3 text-sm font-semibold outline-none pt-2 resize-none" onChange={(e)=> {setInputValues(e.target.value)}}></textarea>
        </div>
        <div className="bg-white flex flex-col">
          {/* DIV FOR THE OUTPUT  */}
          <h6 className="p-2 pl-3">Output:</h6>
          <div className="pl-3 text-sm font-thin font-serif scrollbar flex-1">
            {output}
          </div>
        </div>
      </Split>
      {/* </aside> */}
    </section>
  );
};

export default MainEditor;
