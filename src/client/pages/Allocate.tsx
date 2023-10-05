import { useParams } from 'react-router-dom';
import { AllocationDetails } from '../../common/interfaces/surveyInterface';
import { getAllocationDetails } from '../api/NodeApi';
import { useAsyncRequestWithParam } from '../hooks/useAsyncRequest';
import AsyncContent from '../components/AsyncContent';
import QuestionnaireAllocation from '../components/QuestionnaireAllocation';

function DisplayAllocation(questionnaireName:string) {
  const allocationDetails = useAsyncRequestWithParam<AllocationDetails, string>(getAllocationDetails, questionnaireName);

  return (
    <div data-testid="Allocate">
      <AsyncContent content={allocationDetails}>
        {(loadedAllocationDetails) => <QuestionnaireAllocation questionnaireName={questionnaireName} allocationDetails={loadedAllocationDetails} />}
      </AsyncContent>
    </div>
  );
}

export type AllocateParams = {
  questionnaireName: string
};

export default function Allocate() {
  const { questionnaireName } = useParams<keyof AllocateParams>() as AllocateParams;

  return DisplayAllocation(questionnaireName);
}
