import { useNavigate } from "react-router-dom";
import { ITests } from "../../types";


interface IProps {
  test: ITests;
  onDelete: (id: number) => void;
}

export const TestItem: React.FC<IProps> = ({ test, onDelete }) => {
  const navigate = useNavigate();

  const handleClickPass = () => {
    navigate(`/test/pass/${test.id}`);
  };

  const handleClickEdit = () => {
    navigate(`/test/edit/${test.id}`)
  }


  const handleDeleteTest = () => {
    onDelete(test.id as number)
  }


  return <>
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col justify-between gap-4 h-auto w-full sm:w-[300px] max-w-[300px]">
      <strong className="text-lg sm:text-xl font-medium text-gray-600 text-center ">
        {test.title}
      </strong>
      <p className="text-gray-500 text-center text-sm sm:text-base">{test.description}</p>
      <div className="flex justify-center gap-4 mt-4">
        <button 
          onClick={handleClickEdit}
          className="px-4 sm:px-6 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:from-violet-600 hover:to-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-violet-400 transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={handleClickPass}
          className="px-4 sm:px-6 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:from-violet-600 hover:to-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-violet-400 transition duration-200"
        >
          Pass
        </button>
        <button
          onClick={handleDeleteTest}
          className="px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-violet-400 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  </>
};
