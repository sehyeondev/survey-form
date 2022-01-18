import {v4 as uuidv4} from 'uuid'
import { QuestionInterface, } from '../interfaces/question';
import cloneDeep from 'lodash/cloneDeep';

export const SET_FORM_TITLE = "SET_FORM_TITLE" as const;
export const SET_FORM_DESC = "SET_FORM_DESC" as const;
export const ADD_QUESTION = "ADD_QUESTION" as const;
export const UPDATE_QUESTION = "UPDATE_QUESTION" as const;
export const DELETE_QUESTION = "DELETE_QUESTION" as const;
export const ADD_SELECT_OPTION = "ADD_SELECT_OPTION" as const;
export const UPDATE_SELECT_OPTION = "UPDATE_SELECT_OPTION" as const;
export const DELETE_SELECT_OPTION = "DELETE_SELECT_OPTION" as const;

export const setFormTitle = (formTitle: string) => ({
  type: SET_FORM_TITLE,
  payload: {
    formTitle: formTitle,
  },
});

export const setFormDesc = (formDesc: string) => ({
  type: SET_FORM_DESC,
  payload: {
    formDesc: formDesc,
  },
});

export const addQuesiton = () => ({
  type: ADD_QUESTION,
});

export const updateQuesiton = (key: string, newValue: string, uuid: string) => ({
  type: UPDATE_QUESTION,
  payload: {
    key: key,
    newValue: newValue,
    uuid: uuid,
  },
});

export const deleteQuesiton = (uuid: string) => ({
  type: DELETE_QUESTION,
  payload: {
    uuid: uuid,
  },
});

export const addSelectOption = (uuid: string) => ({
  type: ADD_SELECT_OPTION,
  payload: {
    uuid: uuid,
  },
});

export const updateSelectOption = (title: string, qUuid: string, oUuid: string) => ({
  type: UPDATE_SELECT_OPTION,
  payload: {
    title: title,
    qUuid: qUuid,
    oUuid: oUuid,
  },
});

export const deleteSelectOption = (qUuid: string, oUuid: string) => ({
  type: DELETE_SELECT_OPTION,
  payload: {
    qUuid: qUuid,
    oUuid: oUuid,
  },
});

type FormAction = 
 | ReturnType<typeof setFormTitle>
 | ReturnType<typeof setFormDesc>
 | ReturnType<typeof addQuesiton>
 | ReturnType<typeof updateQuesiton>
 | ReturnType<typeof deleteQuesiton>
 | ReturnType<typeof addSelectOption>
 | ReturnType<typeof updateSelectOption>
 | ReturnType<typeof deleteSelectOption>;

interface FormState{
  formTitle: string;
  formDesc: string;
  questions:Array<QuestionInterface>
}

const initialState: FormState = {
  formTitle: "",
  formDesc: "",
  questions: [{
    uuid: "",
    title: "",
    desc: "",
    qType: "",
    selectOptions: [{
      uuid: "",
      title: "",
    }],
  }],
}


const form = (state: FormState = initialState, action: FormAction) => {
  // const clonedeep = require('lodash.clonedeep')
  switch (action.type) {
    case SET_FORM_TITLE:{
      return {
        ...state,
        formTitle: action.payload.formTitle
      }
    }

    case SET_FORM_DESC:{
      return {
        ...state,
        formDesc: action.payload.formDesc
      }
    }

    case ADD_QUESTION:{
      const cp = cloneDeep(state.questions)
      cp.push({
        uuid: uuidv4(),
        title: "",
        desc: "",
        qType: "checkbox",
        selectOptions: [{
          uuid: uuidv4(),
          title: ""
        }]})
      return {
        ...state,
        questions: cp
      }
    }

    case UPDATE_QUESTION:{
      const cp = cloneDeep(state.questions)
      const question = cp.find(ele => ele.uuid === action.payload.uuid)
      switch (action.payload.key) {
        case "title": {
          question.title = action.payload.newValue;
          break;
        }
        case "desc": {
          question.desc = action.payload.newValue;
          break;
        }
        case "qType": {
          question.qType = action.payload.newValue;
          break;
        }
        default: {
        }
      }
      return {
        ...state,
        questions: cp,
      }
    }

    case DELETE_QUESTION:{
      const cp = cloneDeep(state.questions)
      const index = cp.findIndex(ele => ele.uuid === action.payload.uuid)
      cp.splice(index, 1)
      return {
        ...state,
        questions: cp
      }
    }

    case ADD_SELECT_OPTION:{
      const cp = cloneDeep(state.questions)
      const question = cp.find(ele => ele.uuid === action.payload.uuid)
      question.selectOptions.push({
        uuid: uuidv4(),
        title: "",
      })
      return {
        ...state,
        questions: cp
      }
    }

    case UPDATE_SELECT_OPTION:{
      const cp = cloneDeep(state.questions)
      const question = cp.find(ele => ele.uuid === action.payload.qUuid)
      const option = question.selectOptions.find(ele => ele.uuid === action.payload.oUuid)
      option.title = action.payload.title
      return {
        ...state,
        questions: cp,
      }
    }

    case DELETE_SELECT_OPTION:{
      const cp = cloneDeep(state.questions)
      const question = cp.find(ele => ele.uuid === action.payload.qUuid)
      const oIndex = question.selectOptions.findIndex(ele => ele.uuid === action.payload.oUuid)
      question.selectOptions.splice(oIndex, 1)
      return {
        ...state,
        questions: cp
      }
    }

    default:
      return state;
  }
}

export default form;