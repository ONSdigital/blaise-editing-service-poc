export interface CasesNotAllocatedInformation {
  interviewerCases: InterviewerCases[]
}

interface InterviewerCases {
  Interviewer: string;
  Cases: string[]
}
