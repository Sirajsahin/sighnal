//Create Org
export interface IUserOrgCreateProps {
  org_name: string;
  country: string;
  industry: string;
  team_size: string;
}

// Country List

export interface ICountryListResponseData {
  name: string;
  code: string;
}
export interface ICountryListResponse {
  data: ICountryListResponseData[] | null;
}
// OrgList List

export interface IUserOrgList {
  org_id: "cfbf8623-1c83-455b-b291-7336b2b032aa";
  org_name: "gmail";
  industry: "siraj";
  country: "India";
}
export interface IUserOrgListResponse {
  data: IUserOrgList[] | null;
}
