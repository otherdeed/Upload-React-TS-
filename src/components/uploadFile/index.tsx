import { useRef } from 'react';
import { Svg } from '../svg';

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
  value: string;
  setErrorSizeFile: (string: string) => void;
  errorSizeFile: string
};

export const UploadFile = ({
  setFile,
  file,
  value,
  setErrorSizeFile,
  errorSizeFile
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      validateFile(selectedFile);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    // Проверка типа файла при наведении
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      const firstItem = event.dataTransfer.items[0];

      if (firstItem.kind === 'file') {
        const fileType = firstItem.type;
        const allowedTypes = ['text/plain', 'application/json', 'text/csv'];
        if (allowedTypes.includes(fileType)) {
          event.currentTarget.style.backgroundColor = '#ccffcc';
        } else {
          event.currentTarget.style.backgroundColor = '#ffcccc';
        }
      }
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.backgroundColor = '';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.style.backgroundColor = '';

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const selectedFile = event.dataTransfer.files[0];
      validateFile(selectedFile);
    }
  };

  const validateFile = (file: File) => {
    const allowedFormats = ['.txt', '.json', '.csv',];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !allowedFormats.includes(`.${fileExtension}`)) {
      setErrorSizeFile('Недопустимый формат файла.');
      return;
    }
    if (file.size > 1024) {
      setErrorSizeFile('Максимальный размер файла — 1 КБ.');
      return;
    }
    setErrorSizeFile('');
    setFile(file);
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className='pt-3 bg-gray-200/40 border border-gray-300 w-70 my-2 h-50 rounded-3xl flex flex-col justify-center items-center cursor-pointer'
    >
      <Svg />
      <input
        onChange={handleFileChange}
        type="file"
        className='hidden'
        ref={fileInputRef}
        accept=".txt,.json,.csv"
      />
      <div className='text-center text-indigo-500 px-10 my-2'>
        {errorSizeFile
          ? (<span className='text-red-400'>{errorSizeFile}</span>)
          : file
            ? `Выбран файл формата: ${file.name.split('.').pop()}`
            : 'Перенесите ваш файл в область ниже'}
      </div>
    </div>
  );
};