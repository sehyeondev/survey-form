import Question from '../../src/components/Question'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../src/reducers';
import { setFormTitle, setFormDesc, addQuesiton } from '../../src/reducers/form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';


export default function Create () {
  const dispatch = useDispatch();
  const {formTitle, formDesc, questions} = useSelector((state: RootState)=> state.form);


  const submit = () => {
    console.log("=================")
    console.log("Form Title = " + formTitle);
    console.log("Form Description = " + formDesc);
    questions.forEach((question, qIndex) => {
      console.log("-----------------")
      console.log(`Question ${qIndex + 1}`)
      console.log("Question Type = " + question.qType)
      console.log("Question Title = " + question.title)
      console.log("Question Description = " + question.desc)
      question.selectOptions.forEach((option, oIndex) => {
        console.log(`Option ${oIndex +1} of Question ${qIndex+1}`)
        console.log("Option Title = " + option.title)
      })
    })
    console.log(questions);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(103,58,183, 0.1)',
        minHeight: '100vh',  
      }}
      >
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'white',
        width: 800,
        borderRadius: 2,
        p:3,
        mt:2,
        }}
      >
        <TextField
          sx={{width: 800}}
          variant="outlined"
          placeholder='Form title' 
          value={formTitle} 
          onChange={(e) => dispatch(setFormTitle(e.target.value))}
        />
        <TextField 
          sx={{width: 800}} 
          multiline
          variant="outlined" 
          margin='dense'
          placeholder='Form description' 
          value={formDesc} 
          onChange={(e) => dispatch(setFormDesc(e.target.value))} 
        />
      </Box>

      {
        questions.map((question, index) => 
            <Question
              key = {question.uuid}
              question = {question}/>
        )
      }

      <Stack spacing={2} direction="row" sx={{mt:2}}>
        <Button sx={{mr: 2}} variant="contained" onClick={() => dispatch(addQuesiton())}>
          <AddIcon/>
        </Button>
        <Button variant="contained" onClick= {() => submit()}>
          <SendIcon/>
        </Button>
      </Stack>
    </Box>
  )
}