import { useState } from "react";
import "./authentication.css";
import Formmanager from "../FormManager/formmanager";
import Signup from "../SignUp/signup";
export default () => {
  const [select, setselect] = useState(false);
  return (
    <>
      <div className="container">
        <div className="auth mt-5">
          <div className="row justify-content-center">
            {/*  <div className="col-md-4 col-sm-12"> */}
            <div className="switch">
              <div
                className={`togler ${select ? "moveright" : "moveleft"}`}
              ></div>
              <span onClick={() => setselect(!select)}>Manager</span>
              <span onClick={() => setselect(!select)}>Employee</span>
            </div>
            <br />
            {select ? <Signup /> : <Formmanager />}
          </div>
          {/*  </div> */}
        </div>
      </div>
    </>
  );
};
