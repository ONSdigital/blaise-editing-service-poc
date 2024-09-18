export interface AllocationDetails {
  editors: UserAllocationDetails[]
  interviewers: UserAllocationDetails[]
}

interface UserAllocationDetails {
  name: string;
  Cases: string[]
}
