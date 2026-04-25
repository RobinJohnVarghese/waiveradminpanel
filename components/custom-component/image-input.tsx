import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import { Cross2Icon, UploadIcon } from '@radix-ui/react-icons';

interface ImageInputProps {
  label?: string;
  inline?: boolean;
  className?: string;
  name?: string;
  multiple?: boolean;
  disabled?: boolean;
  onCancel?: (() => void) | boolean;
  src?: string | undefined | null;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  hintMessage?: string | false;
  errorMessage?: string | false;
  successMessage?: string | false;
}

const ImageInput: React.FC<ImageInputProps> = ({
  label = "Label",
  inline = false,
  className = "",
  name = "noname",
  multiple = false,
  disabled = false,
  onCancel = false,
  src = "",
  onChange = () => { },
  hintMessage = false,
  errorMessage = false,
  successMessage = false,
}) => {

  return (
    <div className={`form-element ${className} ${inline ? "form-element-inline" : ""}`}>
      <div className="font-semibold mb-2 text-sm">{label}</div>
      <div className="group flex w-full h-64 rounded-sm border border-solid border-gray-300 py-1 flex-col justify-center items-center cursor-pointer relative">
        {!src && !disabled && (
          <>
            <UploadIcon className="stroke-current text-gray-400 size-12 " />
            <span className="text-center text-[10px] mt-2">
              Drag Your Files Here
              <br /> or
              <br /> Click to Upload
            </span>
          </>
        )}
        {src && (
          <>
            <div className={`rounded w-full h-full cursor-pointer relative`}>
              <Image src={src} alt="media" layout="fill" objectFit="contain" unoptimized />
            </div>
            {/* <UploadIcon className="stroke-current text-gray-300 cursor-pointer absolute left-1 top-1 group-hover:text-gray-900 size-14" /> */}
          </>
        )}
        {!disabled && (
          <>
            <input
              type="file"
              name={name}
              className="absolute w-full h-full opacity-0 cursor-pointer"
              multiple={multiple}
              onChange={onChange}
            />
            {onCancel !== false && (
              <div
                className=" btn-rounded btn-icon bg-transparent hover:bg-blue-50 text-red-500 hover:text-red-700 btn-raised absolute top-1 right-1"
                onClick={onCancel as (() => void)}
              >
                <Cross2Icon className="w-6 h-6" />
              </div>
            )}
          </>
        )}
        {disabled && !src && (
          <span className="text-center text-xs mt-2 text-red-300">
            No Files Uploaded
          </span>
        )}
      </div>

      {hintMessage && <div className="form-hint text-xs">{hintMessage}</div>}
      {errorMessage && <div className="mt-2  text-red-500 text-xs">{errorMessage}</div>}
      {successMessage && <div className="form-success text-xs">{successMessage}</div>}
    </div>
  );
};

export default ImageInput;
