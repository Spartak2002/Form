import { useEffect } from "react"
import { useSelector } from "react-redux"
import { getTests, tests } from "../tasks/task.slice"
import { useAppDispatch } from "../../../app/hooks"
import { TestItem } from "./testItem"

export const TestList = () => {
  const testList = useSelector(tests)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTests())
  }, [])
  return (
    <>
      <div className="w-full flex px-10 py-5 bg-slate-100 gap-x-2 gap-y-2 shadow-2xl ">
        {testList.map(test => (
          <TestItem key={test.id} test={test} />
        ))}
      </div>
    </>
  )
}
