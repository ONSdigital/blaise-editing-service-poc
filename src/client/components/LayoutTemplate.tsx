import { Footer, Header } from 'blaise-design-system-react-components';
import React from 'react';

const divStyle = {
  minHeight: 'calc(67vh)',
};

interface LayoutTemplateProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  logOut: () => void;
}

export default function LayoutTemplate({ children, isLoggedIn, logOut }: LayoutTemplateProps) {
  console.debug('LayoutTemplate');
  const navigationLinks = [
    {
      endpoint: '/',
      id: 'home',
      label: 'Home',
    },
  ];

  return (

    <>
      <Header
        title="Blaise Editing Service"
        noSave
        signOutButton={isLoggedIn}
        signOutFunction={() => logOut()}
        navigationLinks={navigationLinks}
      />
      <div style={divStyle} className="ons-page__container ons-container" data-testid="app-content">
        {children}
      </div>
      <Footer />
    </>
  );
}
