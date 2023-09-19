import { Survey } from '../../common/interfaces/surveyInterface';

const surveyAllocationListMockObject: Survey[] = [{
  name: 'LMS',
  questionnaires: [
    {
      name: 'LMS2101_AA1',
      serverParkName: 'gusty',
      installDate: '2021-01-15T15:26:43.4233454+00:00',
      status: 'Active',
      dataRecordCount: 2,
      hasData: false,
      active: false,
      caseAllocation: [{
        CaseId: '9001',
        HOut: '110',
        ToEditor: 'jakew',
      },
      {
        CaseId: '9002',
        HOut: '210',
        ToEditor: 'tobym',
      }],
    },
    {
      name: 'LMS2101_AB1',
      serverParkName: 'gusty',
      installDate: '2021-02-15T15:26:43.4233454+00:00',
      status: 'Active',
      dataRecordCount: 1,
      hasData: false,
      active: false,
      caseAllocation: [{
        CaseId: '9008',
        HOut: '110',
        ToEditor: 'jakew',
      }],
    },
    {
      name: 'LMS2101_AC1',
      serverParkName: 'gusty',
      installDate: '2021-03-15T15:26:43.4233454+00:00',
      status: 'Active',
      dataRecordCount: 0,
      hasData: false,
      active: false,
      caseAllocation: [],
    },

  ],
},
{
  name: 'OPN',
  questionnaires: [
    {
      name: 'OPN2201A',
      serverParkName: 'gusty',
      installDate: '2021-04-15T15:26:43.4233454+00:00',
      status: 'Active',
      dataRecordCount: 3,
      hasData: false,
      active: false,
      caseAllocation: [{
        CaseId: '9001',
        HOut: '110',
        ToEditor: 'jakew',
      },
      {
        CaseId: '9002',
        HOut: '210',
        ToEditor: 'tobym',
      },
      {
        CaseId: '9003',
        HOut: '110',
        ToEditor: 'jakew',
      }    ],
    }],
}];

export default surveyAllocationListMockObject;
