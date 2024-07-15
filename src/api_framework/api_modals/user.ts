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
// department list
export interface IUserDepartmentListResponse {
  message: string;
  data: Array<string>;
  status: boolean;
}

// user Details

export interface IUserDetails {
  user_id: string | null;
  name: string | null;
  email: string | null;
  is_email_verified: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
  updated_by: string | null;
}
export interface IUserDetailsResponse {
  message: string;
  data: IUserDetails | null;
  status: boolean;
}

// Organization Details

export interface IOrganizationDetails {
  org_id: string | null;
  org_name: string | null;
  industry: string | null;
  team_size: string | null;
  country: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}
export interface IOrganizationDetailsResponse {
  message: string;
  data: IOrganizationDetails | null;
  status: boolean;
}
