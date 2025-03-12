import { IoIosClose } from "react-icons/io";
type Props = {
    placeholder: string,
    value: string | undefined,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    clearValue: () => void,
    valueIsNull: boolean,
}
export const Input = ({
    placeholder,
    value,
    valueIsNull,
    handleChange,
    clearValue,
}: Props) => {
    return (
        <div className="relative">
            <IoIosClose onClick={clearValue} className={`absolute right-0 top-0.5 ${valueIsNull ? 'text-blue-600' : 'text-gray-400'} cursor-pointer w-8 h-8`} />
            <input
                type="text"
                className={`bg-white ${valueIsNull ? 'text-blue-600' : 'text-gray-500'}  h-9 w-70 rounded-[0.5vw] pl-2 font-medium outline-none`}
                onChange={handleChange}
                placeholder={placeholder}
                value={value}
            />
        </div>
    )
}
