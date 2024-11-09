import { useForm } from "react-hook-form"
import { IFormData } from "../../lib/types"
import { useNavigate } from "react-router-dom"
import { getResult, result } from "../tasks/task.slice"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"

export const HomePage = () => {
  const [text, setText] = useState("")
  const dispatch = useAppDispatch()
  const results = useAppSelector(result)

  useEffect(() => {
    dispatch(getResult())
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>()
  const navigate = useNavigate()

  const onSubmit = (data: IFormData) => {
    const names = results.map(data => data.name)
    if (names.includes(text)) {
      alert("error")
      reset()
      navigate("/")
    } else {
      sessionStorage.setItem("username", data.name)
      reset()
      navigate("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-200">
      <h1 className="text-center text-4xl font-bold text-white mb-20">
        Welcome to the Testing Platform
      </h1>
      <div className="bg-white p-10 rounded-lg shadow-[0px_-3px_60px_-15px_rgb(105,105,105)] w-1/4 h-48">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          <input
            type="text"
            placeholder="Enter a username"
            {...register("name", { required: "Name is required" })}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setText(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">
              {errors.name.message as string}
            </p>
          )}

          <button
            type="submit"
            className="py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}
