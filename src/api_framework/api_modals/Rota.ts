//Get :Shift stats Api
export interface IRotaManagementShiftStatsData {
    active_shift: number;
    inactive_shift: number;
  }
  export interface IRotaManagementShiftStatsResponse {
    status: boolean;
    message: string;
    data: IRotaManagementShiftStatsData;
  }
  
  // Shift List API Interface
  export interface IRotaManagementShiftTimings {
    start_time: string;
    end_time: string;
  }
  export interface IRotaManagementShiftListData {
    id?: string;
    shift_name: string;
    shift_status: boolean;
    shift_data_transformed?: string;
    shift_type?: string;
    shift_timings: IRotaManagementShiftTimings[];
  }
  export interface IRotaManagementShiftListResponse {
    status: boolean;
    message: string;
    data: IRotaManagementShiftListData[];
  }
  
  // Create Shift API
  export interface IRotaManagementShiftCreateResponse {
    status: boolean;
    message: string;
    data: IRotaManagementShiftDetailsData;
  }
  
  // Update Shift API
  export interface IRotaManagementShiftDetailsData {
    id: string;
    shift_name: string;
    shift_status: boolean;
    shift_timings: IRotaManagementShiftTimings[];
  }
  export interface IRotaManagementShiftUpdateResponse {
    status: boolean;
    message: string;
    data: IRotaManagementShiftDetailsData;
  }
  
  // Rota shift Details API
  export interface IRotaManagementShiftDetailsResponse {
    status: boolean;
    message: string;
    data: IRotaManagementShiftDetailsData;
  }
  
  //Rota  Create API
  export interface IRotaManagementRotaCreatePropsData {
    clinic_id: string;
    staff_id: string;
    shift_id?: string;
    is_week_off: boolean;
    rota_dates: Array<string>;
  }
  export interface IRotaManagementRotaCreateResponse {
    status: boolean;
    message: string;
    data: string | null;
  }
  
  // Rota detail Api
  export interface IRotaManagementRotaDetailProps {
    from_date: string;
    to_date: string;
    staff_id?: string;
    clinic_id: string;
  }
  export interface IRotaManagementRotaDetailsData {
    clinic_id: string;
    staff_id: string;
    shift_id: string;
    is_week_off: boolean;
    rota_date: string;
    id: string;
  }
  export interface IRotaManagementRotaDetailResponse {
    status: boolean;
    message: string;
    data: IRotaManagementRotaDetailsData | null;
  }
  
  //Rota Update Api
  export interface IRotaManagementRotaUpdatePropsData {
    clinic_id: string;
    staff_id: string;
    shift_id: string;
    is_week_off: boolean;
    rota_dates: Array<string>;
  }
  
  //Rota Delete Api
  
  export interface IRotaManagementRotaDeleteResponse {
    status: boolean;
    message: string;
    data: null;
  }
  
  // Rota Filter Api
  export interface IRotaManagementRotaFilterParams {
    clinic_ids: Array<string>;
    provider_category_ids: Array<string>;
    staff_ids: Array<string>;
    from_date?: string;
    to_date?: string;
  }
  export interface IRotaManagementRotaDetailShiftData {
    shift_name: string;
    shift_data_transformed: string;
    shift_status: boolean;
    shift_type: string;
    shift_timings: IRotaManagementShiftTimings[];
  }
  export interface IRotaManagementRotaDetailsData {
    id: string;
    clinic_id: string;
    staff_id: string;
    shift_id: string;
    is_week_off: boolean;
    rota_date: string;
    shift_data: IRotaManagementRotaDetailShiftData;
  }
  export interface IRotaManagementRotaStaffDetails {
    staff_id: string;
    staff_name: string;
    staff_category_id: number;
    staff_category_name: string;
    rota_details: IRotaManagementRotaDetailsData[];
  }
  export interface IRotaManagementRotaFilterData {
    clinic_id: string;
    clinic_name: string | null;
    staff_details: IRotaManagementRotaStaffDetails[];
  }
  export interface IRotaManagementRotaFilterResponse {
    status: boolean;
    message: string;
    data: IRotaManagementRotaFilterData[];
  }
  
  // Rota Category Api
  export interface IRotaManagementRotaCategoryData {
    id: number;
    staff_category_name: string;
    staff_id?: string | null;
  }
  export interface IRotaManagementRotaCategoryResponse {
    status: boolean;
    message: string;
    data: IRotaManagementRotaCategoryData[];
  }
  
  // Category Providers list _post
  export interface IRotaManagementRotaProvidersProps {
    provider_category_ids?: Array<string>;
    clinic_ids: Array<string>;
  }
  export interface IRotaManagementRotaProvidersData {
    vetbuddy_staff_category_id: number;
    name: string;
    staff_id?: string;
  }
  export interface IRotaManagementRotaProvidersResponse {
    status: boolean;
    message: string;
    data: IRotaManagementRotaProvidersData[];
  }
  
  //Post :Copy Rota
  export interface IRotaManagementRotaCopyPropsDate {
    start_date: string;
    end_date: string;
  }
  
  // "clinic_wise_staffs": [
  //   {
  //     "clinic_id": "7f5f4ef0-3a68-11ed-9f48-027b5103e28a",
  //     "staff_ids": ["85951da2-2cd8-4463-bcdc-817f2b916b62"]
  //   }
  // ],
  export interface IRotaManagementRotaClinicStaff {
    clinic_id: string;
    staff_ids: Array<string>;
  }
  export interface IRotaManagementRotaCopyPropsData {
    clinic_wise_staffs: IRotaManagementRotaClinicStaff;
    copy_to_date: string;
    no_of_days_to_copy: number;
    copy_from_date_range: IRotaManagementRotaCopyPropsDate;
  }
  export interface IRotaManagementRotaCopyResponse {
    status: boolean;
    message: string;
    data: null;
  }
  
  //Get : Rota Error API
  export interface IRotaManagementErrorProps {
    error_id: string;
  }
  export interface IRotaErrorListError {
    provider_name: string;
    provider_category: string;
    date: string;
    existing_clinic: string;
    shift_name: string;
    timing: string;
  }
  export interface IRotaErrorListData {
    header: string;
    errors: IRotaErrorListError[];
  }
  export interface IRotaErrorListResponse {
    status: boolean;
    message: string;
    data: IRotaErrorListData;
  }
  
  // Post error ids
  export interface ERRORS {
    data?: any;
    error_id: string;
  }
  export interface IRotaErrorIdSResponse {
    status: boolean;
    message: string;
    data: ERRORS | null;
  }
  