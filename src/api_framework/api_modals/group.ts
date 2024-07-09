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
  name: string;
  description: string;
  group_id: string;
  business_id: string;
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
