import { ONSPanel } from 'blaise-design-system-react-components';
import { ReactElement } from 'react';

interface SuccessPanelProps {
  message: string;
}

export default function SuccessPanel({ message }: SuccessPanelProps) : ReactElement {
  return (
    <ONSPanel status="success">
      <h4>Success</h4>
      <p data-testid="SuccessMessage">
        {message}
      </p>
    </ONSPanel>
  );
}
