export interface IClaim {
  _id: string;
  firstName?: string | null;
  mobilePhone: string;
  date: string;
  email?: string | null;
  tag?: string | null;
  location?: string | null;
  files?: string[] | null;
}
