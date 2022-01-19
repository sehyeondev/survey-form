import Question from '../../src/components/Question'
import { useDispatch, useSelector } from "react-redux";
import { QuestionInterface } from '../../src/interfaces/question';
import { RootState } from '../../src/reducers';
import { setFormTitle, setFormDesc, addQuesiton } from '../../src/reducers/form';
import { Box, Button, TextField, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

export default function Create () {
  const dispatch = useDispatch();
  const {formTitle, formDesc, questions} = useSelector((state: RootState)=> state.form);

  const submit = () => {
    console.log("=================")
    console.log("Form Title: " + formTitle);
    console.log("Form Description: " + formDesc);
    questions.forEach((question: QuestionInterface, qIndex: number) => {
      console.log("-----------------")
      console.log(`Question ${qIndex + 1} - type: ${question.qType}`)
      console.log("Title: " + question.title)
      console.log("Description: " + question.desc)
      if (question.qType === "text") return
      question.selectOptions.forEach((option, oIndex) => {
        console.log(`    Option ${oIndex +1} - ${option.title}`)
      })
    })
  }

  return (
    <Box
      sx={{
        ...style,
        justifyContent: 'left',
        bgcolor: 'rgba(103,58,183, 0.1)',
        minHeight: '100vh',  
      }}
      >
      <Box
      sx={{
        ...style,
        width: 800,
        borderRadius: 2,
        p:3,
        mt:2,
        }}
      >
        <TextField sx={{width: 800}} variant="outlined"
          placeholder='Form title' 
          value={formTitle} 
          onChange={(e) => dispatch(setFormTitle(e.target.value))}
        />
        <TextField sx={{width: 800}} multiline variant="outlined" margin='dense'
          placeholder='Form description' 
          value={formDesc} 
          onChange={(e) => dispatch(setFormDesc(e.target.value))} 
        />
      </Box>

      {
        questions.map((question :QuestionInterface, index: number) => 
            <Question
              key = {question.uuid}
              question = {question}/>
        )
      }

      <Stack spacing={2} direction="row" sx={{mt:2}}>
        <Button sx={{mr: 2}} variant="contained" 
          onClick={() => dispatch(addQuesiton())}>
          <AddIcon/>
        </Button>
        <Button variant="contained" 
          onClick= {() => submit()}>
          <SendIcon/>
        </Button>
      </Stack>
    </Box>
  )
}

const style ={
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: 'white',
}