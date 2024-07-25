import { Footer, Header, NotProductionWarning } from 'blaise-design-system-react-components';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const divStyle = {
  minHeight: 'calc(67vh)',
};

interface LayoutTemplateProps {
  children: React.ReactNode;
  showSignOutButton: boolean;
  signOut: () => void;
}

export default function LayoutTemplate({ children, showSignOutButton, signOut }: LayoutTemplateProps) {
  const navigate = useNavigate();

  /*   const navigationLinks = [
    {
      endpoint: '/',
      id: 'Home',
      label: 'Home',
    },
  ]; */

  return (

    <>
      <NotProductionWarning />
      <Header
        title="Blaise Editing Service"
        noSave
        signOutButton={showSignOutButton}
        signOutFunction={() => { signOut(); navigate('/'); }}
      />
      <div style={divStyle} className="ons-page__container ons-container" data-testid="app-content">
        <Link
          className="nav"
          to=".."
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          {'< back'}
        </Link>
        {children}
      </div>
      <Footer />
    </>
  );
}
