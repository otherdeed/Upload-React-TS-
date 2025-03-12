import { useEffect, useState } from 'react'
import { CloseButton } from '../closeButton'
import { Input } from '../input'
import { UploadFile } from '../uploadFile'
import { Button } from '../button'
import axios from 'axios'
import { Loading } from '../loading/loading'
import {type ErrorData, validateError } from '../error/error'
export const LoadingBlock = () => {
    const [file, setFile] = useState<File | null>(null);
    const [errorSizeFile, setErrorSizeFile] = useState('')
    const [helpText, setHelpText] = useState('Перед загрузкой дайте имя файлу')
    const [value, setValue] = useState<string>('')
    const [responseData, setResponseData] = useState<any>(null)
    const [error, setError] = useState<ErrorData | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const clearValue = () => {
        setValue('')
    }
    const hadleUploadFile = async () => {
        if (file && value.length !== 0 && errorSizeFile.length === 0) {
            setIsLoading(true)
            try {
                const formData = new FormData()
                console.log(file.type);
                formData.append('file', file)
                formData.append('name', value)
                console.log(formData);
                const res = await axios.post(
                    'https://file-upload-server-mc26.onrender.com/api/v1/upload',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    }
                );
                setResponseData(res.data)
            } catch (error) {
                console.log(validateError(error));
                setError(validateError(error))
            } finally {
                setIsLoading(false)
            }
        }
    }
    const resetData = () => {
        setFile(null)
        setValue('')
        setResponseData(null)
        setError(null)
    }
    const resetFile = () => {
        setFile(null)  
    }
    useEffect(() => {
        if (value.length === 0) {
            setHelpText('Перед загрузкой дайте имя файлу')
        }
        if (value.length > 0) {
            setHelpText('Перенесите ваш в файл в область ниже')
        }
        if (file && value.length > 0) {
            setHelpText('Загрузите ваш файл')
        }
        if(file && value.length === 0) {
            setHelpText('Дайте имя файлу')
        }
    }, [value, file])
    if (error) {
        return (
            <div className='relative flex flex-col items-center bg-gradient-to-b to-indigo-400 via-indogo-400 from-red-400 w-80 rounded-xl p-4'>
                <div onClick={resetData}>
                    <CloseButton />
                </div>
                <div className="text-center mt-8 text-xl text-white">
                    Ошибка при загрузки файла
                </div>
                <div className="text-center flex flex-col mt-5 text-white my-2">
                    <span>Error:{error.status} Bad Request</span>
                    <span>"{error.data}"</span>
                </div>
            </div>
        )
    }
    if (responseData) {
        return (
            <div className='relative flex flex-col items-center bg-gradient-to-b to-indigo-300 via-indigo-500 from-indigo-500 w-80 rounded-xl p-4'>
                <div onClick={resetData}>
                    <CloseButton />
                </div>
                <div className="text-center mt-8 text-xl text-white">
                    Файл успешно загружен
                </div>
                <div className="text-start flex flex-col mt-5 text-white my-2 ml-5">
                    <span>name: {value}</span>
                    <span>filename: {`${file?.name.split('.').pop()}`}</span>
                    <span>timestamp: {responseData.timestamp.split('T')[1].split('.')[0]}</span>
                    <span>message: {responseData.message}</span>
                </div>
            </div>
        )
    }
    return (
        <div className='relative flex flex-col items-center bg-gradient-to-b to-indigo-50 via-indigo-100 from-indigo-400 w-80  rounded-xl'>
            <div onClick={resetData}>
                <CloseButton />
            </div>
            <div className="text-center mt-10 text-2xl text-white">
                Загрузочное окно
            </div>
            <div className="text-center text-white my-2">
                {helpText}
            </div>
            <Input valueIsNull={value.length > 0} clearValue={clearValue} handleChange={handleChange} placeholder='Название файла' value={value} />
            <UploadFile errorSizeFile={errorSizeFile} setErrorSizeFile={setErrorSizeFile} value={value} file={file} setFile={setFile} />
            {file && errorSizeFile.length === 0 && <Loading resetFile={resetFile} nameFile={value} file={file} />}
            <Button value={value} file={file} hadleUploadFile={hadleUploadFile} isLoading={isLoading} text='Загрузить' />
        </div>
    )
}
