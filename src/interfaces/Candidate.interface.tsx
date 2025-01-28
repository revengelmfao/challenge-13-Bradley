// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
  id: number;
  name: string;
  skills: string[];
  avatar: string;
  status: string;
  location: string;
}
