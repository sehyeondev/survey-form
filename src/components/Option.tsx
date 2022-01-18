import React from "react";
import {QuestionInterface, SelectOptionInterface} from '../interfaces/question'
import {useDispatch} from 'react-redux'
import {Box, TextField, IconButton, Radio, Checkbox} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { updateSelectOption, deleteSelectOption } from "../reducers/form"

interface OptionComponentProps {
  qUuid: string;
  qType: string;
  option: SelectOptionInterface;
}

const Option: React.FC<OptionComponentProps> = ({qUuid, qType, option}) => {
  const dispatch = useDispatch();

  return (
    <Box sx={{mt:2}}>
      {
        (qType === "checkbox") && <Checkbox />
      }
      {
        (qType === "radio") && <Radio />
      }
      <TextField
        sx={{width: 600}}
        placeholder='Option Title'
        value={option.title}
        onChange={(e) => dispatch(updateSelectOption(e.target.value, qUuid, option.uuid))}/>
      <IconButton onClick={() => dispatch(deleteSelectOption(qUuid, option.uuid))}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}


export default Option