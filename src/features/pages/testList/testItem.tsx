import { ITests } from "../../lib/types"

interface IProps {
  test: ITests
}

export const TestItem: React.FC<IProps> = ({ test }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-center items-center gap-4 h-1/4 w-1/5">
      <strong className="text-xl font-medium text-gray-600 ">
        {test.title}
      </strong>
      <p className="text-gray-500 text-wrap text-center">{test.description}</p>
      <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Take Test
      </button>
    </div>
  )
}
