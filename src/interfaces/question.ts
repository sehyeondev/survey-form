export interface QuestionInterface{
  uuid: string;
  title: string;
  desc: string;
  qType: string;
  selectOptions: Array<SelectOptionInterface>;
}

export interface SelectOptionInterface{
  uuid: string;
  title: string;
}