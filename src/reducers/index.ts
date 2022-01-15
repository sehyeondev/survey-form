import { combineReducers } from "redux";
import form from "./form";


const rootReducer = combineReducers({
  form,
});

// const rootReducer = (state, action) => {
//   return appReducer(state, action);
// };

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>