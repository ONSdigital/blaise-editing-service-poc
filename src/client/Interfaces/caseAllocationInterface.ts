export interface CasesNotAllocatedInformation {
  editors: string[]
  interviewers: Interviewers[]
}

interface Interviewers {
  Interviewer: string;
  Cases: string[]
}
