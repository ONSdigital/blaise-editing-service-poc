import { ONSPanel } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';

interface ErrorPanelProps {
  message: string;
}

export default function ErrorPanel({ message }: ErrorPanelProps) : ReactElement {
  return (
    <ONSPanel status="error">
      <h4>Something went wrong</h4>
      <p data-testid="ErrorMessage">
        {message}
      </p>
    </ONSPanel>
  );
}
