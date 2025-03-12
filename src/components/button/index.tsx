type Props ={
    isLoading: boolean;
    text: string;
    value: string;
    file: File | null;
    hadleUploadFile: () => void;
}
export const Button = ({
    isLoading,
    text,
    file,
    value,
    hadleUploadFile
}:Props) => {
  return (
    <button onClick={hadleUploadFile} className={`${isLoading || file === null || value.length === 0? 'bg-zinc-300 cursor-not-allowed' : 'bg-indigo-400 cursor-pointer'} w-70 text-2xl rounded-full text-white  h-15 mb-2`}>
        {text}
    </button>
  )
}
