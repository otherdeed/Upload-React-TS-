import { IoIosClose } from "react-icons/io";

export const CloseButton = () => {
  return (
    <div className="rounded-3xl w-10 h-10 bg-gray-500/20 absolute right-2 top-2 flex items-center justify-center">
      <IoIosClose className="text-white w-10 h-10" />
    </div>
  );
};