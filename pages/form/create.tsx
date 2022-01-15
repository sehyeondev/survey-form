import Question from '../../src/components/Question'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../src/reducers';
import { setFormTitle, setFormDesc, addQuesiton } from '../../src/reducers/form';
import { useEffect } from 'react';



export default function Create () {
  const dispatch = useDispatch();
  const {formTitle, formDesc, questions} = useSelector((state: RootState)=> state.form);


  const submit = () => {
    console.log(formTitle);
    console.log(formDesc);
    console.log(questions);
  }

  return (
    <div>
      <div >
        <input  placeholder='Form title' value={formTitle} onChange={(e) => dispatch(setFormTitle(e.target.value))}/>
        <input placeholder='Form description' value={formDesc} onChange={(e) => dispatch(setFormDesc(e.target.value))}/>
      </div>

      {
        questions.map((question, index) => 
            <Question
              key = {question.uuid}
              question = {question}/>
        )
      }

      <button onClick={() => dispatch(addQuesiton())}>+</button>
      <button onClick= {() => submit()}>s</button>
    </div>
  )
}