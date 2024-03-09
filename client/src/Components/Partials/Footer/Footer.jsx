import React from "react";
import { MDBFooter, MDBContainer, MDBBtn, MDBIcon } from "mdb-react-ui-kit";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import './footer.css'

const Footer = () => {
  return (
    <MDBFooter className="bg-light text-center text-white">
      <MDBContainer className="p-4 pb-0">
        <section className="mb-4">
          {/* Example Social Buttons */}
          <MDBBtn floating className="m-1" style={{ backgroundColor: "#3b5998" }} href="#">
            <MDBIcon fab icon="facebook-f" />
          </MDBBtn>

          <MDBBtn floating className="m-1" style={{ backgroundColor: "#55acee" }} href="#">
            <MDBIcon fab icon="twitter" />
          </MDBBtn>

          <MDBBtn floating className="m-1" style={{ backgroundColor: "#dd4b39" }} href="#">
            <MDBIcon fab icon="google" />
          </MDBBtn>

          <MDBBtn floating className="m-1" style={{ backgroundColor: "#ac2bac" }} href="#">
            <MDBIcon fab icon="instagram" />
          </MDBBtn>

          <MDBBtn floating className="m-1" style={{ backgroundColor: "#0082ca" }} href="#">
            <MDBIcon fab icon="linkedin-in" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#333333" }}
            href="https://github.com/LemonmadeDesigns/Reel-Reviews"
          >
            <MDBIcon fab icon="github" />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        <div>
          © {new Date().getFullYear()} Copyright:
          <a className="text-white" href="/">
            CPSC 335
          </a>
          &nbsp;| Powered by&nbsp;
          <a className="text-white" href="https://github.com/LemonmadeDesigns/Reel-Reviews">
            Digit Coders 2024
          </a>
        </div>
      </div>
    </MDBFooter>
  );
};

export default Footer;
