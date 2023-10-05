import {
  Accordion, ONSPanel,
} from 'blaise-design-system-react-components';
import { ExpandableContent } from 'blaise-design-system-react-components/build/src/components/Accordion';
import { ReactElement } from 'react';
import { OldAllocationDetails } from '../../common/interfaces/questionnaireAllocationInterface';
import { questionnaireAllocationMockObject } from '../../test/mockObjects/questionnaireAllocationMockObject';
import EditorAllocation from './EditorAllocation';
import { AllocationDetails } from '../../common/interfaces/surveyInterface';

function CreateAllocationBreakdownContent(allocation: OldAllocationDetails[]):ExpandableContent[] {
  return allocation.map(({ editor, cases }) => ({ title: editor, content: <EditorAllocation cases={cases} /> }));
}

interface QuestionnaireBreakdownProps {
  questionnaireName: string;
  allocationDetails: AllocationDetails
}

export default function Breakdown({ questionnaireName, allocationDetails }: QuestionnaireBreakdownProps): ReactElement {
  const questionnaireAllocationDetails = questionnaireAllocationMockObject;

  return (
    <>
      <ONSPanel spacious status="info" testID="info-panel">
        There are
        {' '}
        {allocationDetails.numberOfCases - allocationDetails.numberOfCasesAllocated}
        {' '}
        cases left to allocate for
        {' '}
        {questionnaireName}
      </ONSPanel>

      <br />
      <h3>Currently allocated</h3>
      <Accordion Expandables={CreateAllocationBreakdownContent(questionnaireAllocationDetails.allocation)} />
      <br />
    </>
  );
}
