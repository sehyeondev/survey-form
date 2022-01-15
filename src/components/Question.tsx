import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateQuesiton, deleteQuesiton, addSelectOption, updateSelectOption, deleteSelectOption } from "../reducers/form"


export default function Question ({question}) {
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <input 
          placeholder='Question Title' 
          value={question.title} 
          onChange={(e) => dispatch(updateQuesiton("title", e.target.value, question.uuid))}
        />

        <input 
          placeholder='Question Desc' 
          value={question.desc} 
          onChange={(e) => dispatch(updateQuesiton("desc", e.target.value, question.uuid))}
        />

        <select value={question.qType} onChange={(e) => dispatch(updateQuesiton("qType", e.target.value, question.uuid))}>
          <option value="checkbox">checkbox</option>
          <option value="radio">radio</option>
          <option value="text">text</option>
        </select>

        <button onClick={(e) => dispatch(deleteQuesiton(question.uuid))}>delete</button>
      </div>

      {
        ((question.qType === "checkbox") || (question.qType === "radio"))  &&
        <div>
          {
            question.selectOptions.map((option, index) =>
                <Option 
                  key={option.uuid}
                  question={question}
                  option={option}
                />
            )
          }
          <button onClick={(e) => dispatch(addSelectOption(question.uuid))}>add option</button>
        </div>
      }

      {
        ((question.qType === "text")) &&
        <div>users can type text answer</div>
      }
    </div>
  )
}

function Option({question, option}){
  const dispatch = useDispatch();

  return (
    <div>
      <input type={question.qType} name = "option"/>
      <input placeholder='Option Title' value={option.title} onChange={(e) => dispatch(updateSelectOption(e.target.value, question.uuid, option.uuid))}/>
      <button onClick={() => dispatch(deleteSelectOption(question.uuid, option.uuid))}>x</button>
    </div>
  )
}