//Create Org
export interface IUserOrgCreateProps {
  business_name: string;
  country: string;
  department: string;
}

// Country List

export interface ICountryListResponseData {
  name: string;
  code: string;
}
export interface ICountryListResponse {
  data: ICountryListResponseData[] | null;
}
