import { useRef } from 'react';
import { Svg } from '../svg';

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
  value: string;
};

export const UploadFile = ({ setFile, file, value }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      validateFile(selectedFile);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current && value.length !== 0) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const selectedFile = event.dataTransfer.files[0];
      validateFile(selectedFile);
    }
  };

  const validateFile = (file: File) => {
    const allowedFormats = ['.txt', '.json', '.csv'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !allowedFormats.includes(`.${fileExtension}`)) {
      return;
    }
    if (file.size > 1024 * 1024) {
      alert('Максимальный размер файла — 1 МБ.');
      return;
    }
    setFile(file);
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
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
        {file ? `Выбран файл формата: ${file?.name.split('.').pop()}` : 'Перенесите ваш файл в область ниже'}
      </div>
    </div>
  );
};