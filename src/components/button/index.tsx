import React from 'react'
type Props ={
    isLoading: boolean,
    text: string,
    hadleUploadFile: () => void
}
export const Button = ({
    isLoading,
    text,
    hadleUploadFile
}:Props) => {
  return (
    <button onClick={hadleUploadFile} className={`${isLoading? 'bg-zinc-300' : 'bg-indigo-400'} w-70 text-2xl rounded-full text-white  h-15 mb-2`}>
        {text}
    </button>
  )
}
