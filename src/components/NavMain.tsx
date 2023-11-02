import React from 'react'
import { Link } from "gatsby"
import { NavMainLinks } from '../config/about';



const NavMain = () => (
  <nav>
    <ol className="inline-list">
      {NavMainLinks.map((link, index) => (
        <ol key={index}>
          <Link to={link.url}>{link.text}</Link>
          {/* {samplePageLinks.map((link, i) => (
            <React.Fragment key={link.url}>
              <Link to={link.url}>{link.text}</Link>
              {i !== samplePageLinks.length - 1 && <> · </>}
            </React.Fragment>
          ))} */}
          {/* {link.sublinks && (
            <ol>
              {link.sublinks.map((sublink, index) => (
                <li key={index}>
                  <Link to={sublink.url}>{sublink.label}</Link>
                </li>
              ))}
            </ol>
          )} */}
        </ol>
      ))}
    </ol>
  </nav>
)



export default NavMain
