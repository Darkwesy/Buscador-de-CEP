import { VscGithubAlt } from "react-icons/vsc";
import { CiLinkedin } from "react-icons/ci";

import './Navbar.scss'

function Navbar () {
  return (
    <div className="Navbar__Wrapper">
      <span>Consultar CEP</span>
      <div className="Navbar__Wrapper__Links">
        <a href="https://github.com/darkwesy"><div className="icon__wrapper"><VscGithubAlt/></div></a>
        <a href="https://linkedin.com/in/thiagopazba"><div className="icon__wrapper"><CiLinkedin/></div></a>
      </div>

    </div>
  )
}

export default Navbar