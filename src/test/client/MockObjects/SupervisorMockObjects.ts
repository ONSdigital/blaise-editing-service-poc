import { SupervisorInformation } from '../../../common/interfaces/supervisorInterface';

const SupervisorInformationMockObject: SupervisorInformation = {
  TotalNumberOfCases: 1000,
  NumberOfCasesNotAllocated: 970,
  NumberOfCasesAllocated: 25,
  NumberOfCasesCompleted: 9,
  Editors: [
    {
      EditorName: 'Doctor Doom',
      NumberOfCasesAllocated: 10,
      NumberOfCasesCompleted: 5,
      NumberOfCasesQueried: 0,
    },
    {
      EditorName: 'Doctor Strange',
      NumberOfCasesAllocated: 15,
      NumberOfCasesCompleted: 4,
      NumberOfCasesQueried: 1,
    },
    {
      EditorName: 'Doctor Who',
      NumberOfCasesAllocated: 0,
      NumberOfCasesCompleted: 0,
      NumberOfCasesQueried: 0,
    },
  ],
};

export default SupervisorInformationMockObject;
