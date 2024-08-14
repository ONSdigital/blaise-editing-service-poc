import { ReactElement } from 'react';

interface ErrorDetailsProps {
  error: Error;
}

export default function ErrorDetails({ error }: ErrorDetailsProps) : ReactElement {
  return (

    <div>
      <h2>Something went wrong</h2>
      <p data-testid="ErrorMessage">
        {error.message}
      </p>
    </div>
  );
}
