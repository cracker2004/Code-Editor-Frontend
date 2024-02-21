   <h1>Online Code Complier</h1>
      <div>
        <label name="language">Language: </label>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <br />
      <div>
        <textarea
          value={code}
          name=""
          id=""
          cols="75"
          rows="20"
          onChange={(e) => {
            setCode(e.target.value);
          }}
        ></textarea>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <p>{status}</p>
      <p>{jobId && `JobId: ${jobId}`}</p>
      <p>{output}</p>










        const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");

  const handleSubmit = async () => {
    const payLoad = {
      language,
      code,
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