import { useEffect } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { getTests, postUserName, tests } from "../tasks/task.slice"
import { useSelector } from "react-redux"
import { TestList } from "../testList/testList"

export const Dashboard = () => {
  const userName = sessionStorage.getItem("username")

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (userName) {
      dispatch(postUserName({ name: userName }))
    }
  }, [dispatch, userName])

  return (
    <>
      <div className="h-screen w-full grid grid grid-rows-[100px,1fr]">
        <p className="text-center text-4xl font-bold text-slate-600 mb-20 mt-10">
          Welcome, {userName}
        </p>
        <TestList />
      </div>
    </>
  )
}
