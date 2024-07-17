export interface IGroupCreateprops {
  group_description: string;
  group_name: string;
}

//GROUP DETALS AND LIST

export interface IgroupDetailsData {
  group_id: string;
  group_name: string;
  group_description?: string;
  tags: string;
}
export interface IgroupDetailsResponse {
  status: boolean;
  data: IgroupDetailsData | null;
}
export interface IgroupListResponse {
  status: boolean;
  data: IgroupDetailsData[] | null;
}

// group stats

export interface IGroupStatsresponseData {
  status: string;
  count: number;
}
export interface IGroupStatsresponse {
  status: boolean;
  message: string;
  data: IGroupStatsresponseData[] | null;
}

//Survey Create

export interface ISurveyCreateProps {
  survey_name: string;
  survey_description: string;
  group_id: string;
}

//Survey Live

export interface ISurveyLiveProps {
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  tags: Array<string>;
  is_comments_on: boolean;
}

// Survey response
export interface ISurveyCreateResponse {
  data: {
    user_id: string;
    group_id: string;
    survey_id: string;
    business_id: string;
    name: string;
    description: string;
    created_at: number;
    status: string;
  };
  status: true;
  message: "Survey Created Successfully";
}

//Question type

export interface IGroupQuestionTypeResponseData {
  open_text_response: IGroupQuestionTypeResponseData[];
  question_type_name: string;
  question_type_id: string;
  options: Array<string>;
}
export interface IGroupQuestionTypeResponse {
  status: boolean;
  message: string;
  data: IGroupQuestionTypeResponseData[];
}
// SURVEY LIST
export interface ISurveyListResponseData {
  survey_name?: string;
  survey_description?: string;
  group_id?: string;
  survey_id?: string;
  start_date?: string;
  start_time?: string;
  end_date?: string;
  end_time?: string;
  tags?: Array<string>;
  response_count?: number | null;
  total_sent?: number | null;
  group_name?: string;
  status?: string;
}
export interface ISurveyListResponse {
  status: boolean;
  message: string;
  data: ISurveyListResponseData[];
}

//User list

export interface IUserListResponseData {
  customer_id: string | null;
  email: string | null;
  name: string | null;
  mobile?: string | null;
  tags: Array<string> | [];
}
export interface IUserListResponse {
  message: string;
  status: boolean;
  data: IUserListResponseData[] | null;
}
