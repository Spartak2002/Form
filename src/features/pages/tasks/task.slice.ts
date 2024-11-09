import { IResult, IState, ITests } from "../../lib/types"
import axios from "axios"
import { createAppSlice } from "../../../app/createAppSlice"
import { PayloadAction } from "@reduxjs/toolkit"

const initialState: IState = {
  tests: [],
  result: [],
}
export const taskSlice = createAppSlice({
  name: "tasks",
  initialState,
  reducers: create => ({
    postUserName: create.asyncThunk(
      async (result: IResult) => {
        const response = await axios.post(
          "http://localhost:3004/results",
          result,
        )
        return response.data
      },
      {
        fulfilled: (state, action: PayloadAction<IResult[]>) => {
          state.result = action.payload
        },
      },
    ),

    getResult: create.asyncThunk(
      async () => {
        const response = await axios.get("http://localhost:3004/results")
        return response.data
      },
      {
        fulfilled: (state, action: PayloadAction<IResult[]>) => {
          state.result = action.payload
        },
      },
    ),

    getTests: create.asyncThunk(
      async () => {
        const response = await axios.get("http://localhost:3004/tests")
        return response.data
      },
      {
        fulfilled: (state, action: PayloadAction<ITests[]>) => {
          state.tests = action.payload
        },
      },
    ),
  }),

  selectors: {
    tests: state => state.tests,
    result: state => state.result,
  },
})

export const { postUserName, getResult, getTests } = taskSlice.actions
export const { tests, result } = taskSlice.selectors
