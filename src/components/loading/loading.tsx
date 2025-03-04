import { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';

type Props = {
    file: File | null;
    nameFile: string;
};

export const Loading = ({ 
    file, 
    nameFile,
}: Props) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (file) {
            const interval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prevProgress + 10;
                });
            }, 100);

            return () => clearInterval(interval);
        }
    }, [file]);

    return (
        <div className="border rounded-xl w-70 flex relative border-gray-300 items-center h-10 my-2 justify-between px-4">
            {
                progress === 100 ? (
                    <>
                        <div className="absolute right-0 top-0.5">
                            <IoIosClose className="text-indigo-500 w-8 h-8 cursor-pointer" />
                        </div>
                        <div className="text-indigo-500 absolute top-1 left-15 text-xl">
                            {`${nameFile}.${file?.name.split('.').pop()}`}
                        </div>
                        <div className="h-8 w-10 bg-indigo-500 absolute left-1 rounded-xl flex items-center justify-center">
                            <span className="text-white"></span>
                        </div>
                        <div className="text-sm text-indigo-500 absolute right-8 text-xl top-1">{progress}%</div>
                    </>
                ) : (
                    <>
                        <div className="absolute right-0 top-1.5">
                            <IoIosClose className="text-indigo-500 w-6 h-6 cursor-pointer" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-8 w-10 bg-indigo-500 absolute left-1 rounded-xl flex items-center justify-center">
                                <span className="text-white"></span>
                            </div>
                            <div className="text-indigo-500 absolute top-1 left-15 text-sm">
                                {`${nameFile}.${file?.name.split('.').pop()}`}
                            </div>
                        </div>
                        <div className="flex absolute top-7 left-13 items-center space-x-4">
                            <div className="w-50 h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-500 rounded-full transition-all duration-200"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="text-sm text-indigo-500 absolute right-8 text-sm top-1">{progress}%</div>
                    </>
                )
            }
        </div>
    );
};