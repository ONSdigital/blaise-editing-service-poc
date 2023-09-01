import { ONSLoadingPanel } from 'blaise-design-system-react-components';
import LayoutTemplate from '../components/LayoutTemplate';

interface LoadingProps {
  showSignOutButton:boolean
  signOut: (loggedIn: boolean) => void
}

export default function Loading({ showSignOutButton, signOut }:LoadingProps) {
  return (
    <LayoutTemplate showSignOutButton={showSignOutButton} signOut={() => signOut}>
      <ONSLoadingPanel />
    </LayoutTemplate>
  );
}
