import React from "react";
import { useDispatch } from "react-redux";
import Option from './Option'
import { QuestionInterface, SelectOptionInterface } from '../interfaces/question'
import { updateQuesiton, deleteQuesiton, addSelectOption } from "../reducers/form"
import { Box, MenuItem, Select, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Question: React.FC<{question: QuestionInterface}> = ({question}) => {
  const dispatch = useDispatch();

  return (
    <Box sx={{bgcolor: 'white', mt: 2, width: 800, p: 3, borderRadius: 2,}}>
      <Box sx={{display: 'flex', flexDirection: 'row',}}>
        <Box sx={{display: "flex", flexDirection: 'column', }}>
          <TextField sx={{width: 500}} variant="outlined"
            placeholder='Question title' 
            value={question.title} 
            onChange={(e) => dispatch(updateQuesiton("title", e.target.value, question.uuid))}
          />
          <TextField sx={{ mt:2, width: 500}} multiline variant="outlined" 
            placeholder='Question Desc'
            value={question.desc} 
            onChange={(e) => dispatch(updateQuesiton("desc", e.target.value, question.uuid))} 
          />
        </Box>
        
        <Box sx={{ml:2}}>
            <Select sx={{width: 150}}
              value={question.qType}
              onChange={(e) => dispatch(updateQuesiton("qType", e.target.value, question.uuid))}
            >
              <MenuItem value="checkbox">checkbox</MenuItem>
              <MenuItem value="radio">radio</MenuItem>
              <MenuItem value="text">text</MenuItem>
            </Select>
        
          <Button sx={{ml: 8}} 
            onClick={(e) => dispatch(deleteQuesiton(question.uuid))}>
            <DeleteIcon />
          </Button>
        </Box>
      </Box>

      {
        ((question.qType === "checkbox") || (question.qType === "radio"))  &&
        <Box>
          {
            question.selectOptions.map((option: SelectOptionInterface, index: number) =>
                <Option 
                  key={option.uuid}
                  qUuid={question.uuid}
                  qType={question.qType}
                  option={option}
                />
            )
          }
          <Button sx={{mt:2}} variant="outlined" 
            onClick={(e) => dispatch(addSelectOption(question.uuid))}>
            <AddIcon/>
          </Button>
        </Box>
      }

      {
        ((question.qType === "text")) &&
        <TextField sx={{mt:2}} placeholder="users can type text answer"></TextField>
      }
    </Box>
  )
}

export default React.memo(Question);
