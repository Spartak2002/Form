import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store"
import { getTests } from "../../store/selectors"
import { deleteTestAsync, getTestsAsync } from "../../store/features/testsSlice"
import { TestItem } from "./testItem"

export const TestList = () => {
  const testsList = useAppSelector(getTests)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTestsAsync())
  }, [])

  const handleDelete = (id: number) => {
    dispatch(deleteTestAsync(id));
  };

  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-slate-100 shadow-2xl">
        {testsList.map(test => (
          <TestItem key={test.id} test={test} onDelete={handleDelete}/>
        ))}
      </div>
    </>
  )
}
