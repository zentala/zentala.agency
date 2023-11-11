import React from 'react';
import { NavMainLinks } from '../config/about';
import { useIntl, Link } from "gatsby-plugin-intl";

const NavMain: React.FC = () => {
  const intl = useIntl();

  const getLinkProps = (id: string): { to: string, title: string } => {
    const pathId = `menu.${id}.path`;
    const titleId = `menu.${id}.title`;
    return {
      to: intl.formatMessage({ id: pathId }),
      title: intl.formatMessage({ id: titleId }),
    };
  };

  return (
    <nav className="inline-list">
      <ol>
        {NavMainLinks.map((id, index) => {
          const { to, title } = getLinkProps(id);

          return (
            <li key={index}>
              <Link to={to}>{title}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default NavMain;
