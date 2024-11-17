import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../store"
import { getUserName } from "../../store/selectors"
import { TestList } from "../testList/testList"

export const Dashboard = () => {
  const userName = useAppSelector(getUserName)

  const navigate = useNavigate()


  const handleClickCreate = () => {
    navigate("/test/create")
  }

  return (
    <>
      <div className="h-auto w-full grid grid-rows-[100px,1fr]">
        <p className="text-center text-4xl font-bold text-slate-600 mt-10">
          Welcome, {userName}
        </p>
        <div className="w-full flex justify-center mt-6 mb-14">
          <button 
            onClick={handleClickCreate}
            className="px-10 py-4 sm:px-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:from-violet-600 hover:to-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-violet-400 transition duration-200 text-lg">
            Create new test
          </button>
        </div>
        <TestList />
      </div>
    </>
  )
}
