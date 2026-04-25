import { cn } from '@/lib/utils';
import React from 'react';

interface ValidationErrorMessageProps {
  errorMessages: string | Record<string, string> | object | unknown;
  className?: string;
}

const ValidationErrorMessage: React.FC<ValidationErrorMessageProps> = ({ errorMessages, className }) => {
  const isStringErrorMessage = typeof errorMessages === 'string' && errorMessages.trim() !== '';
  const isArrayErrorMessage = Array.isArray(errorMessages) && errorMessages.length > 0;
  const isErrorObject = typeof errorMessages === 'object' && errorMessages !== null && !isArrayErrorMessage && Object.keys(errorMessages).length > 0;

  const renderErrorObject = (obj: Record<string, any>, prefix = ''): JSX.Element[] => {
    return Object.entries(obj).flatMap(([key, value]) => {
      if (typeof value === 'string') {
        return (
          <div key={prefix + key}>
            <span className={cn("my-2 text-red-500 text-[13px]", className)}>
              <strong>{prefix}</strong> {value}
            </span>
            <br />
          </div>
        );
      } else if (typeof value === 'object' && value !== null) {
        return renderErrorObject(value, `${prefix}${key}.`);
      } else {
        return [];
      }
    });
  };

  const shouldRenderError = isStringErrorMessage || isArrayErrorMessage || isErrorObject;

  return (
    <>
      {shouldRenderError && (
        <div className={cn(" text-xs", className)}>
          {isStringErrorMessage ? (
            <div className={cn("my-2 text-red-500 text-[13px]", className)}>{errorMessages}</div>
          ) : isArrayErrorMessage ? (
            <div className='mb-4'>
              {(errorMessages as any[]).map((val: any, index: number) => (
                <div key={index}>
                  {typeof val === 'string' ? (
                    <span className={cn("my-2 text-red-500 text-[13px]", className)}>{val}</span>
                  ) : (
                    renderErrorObject(val)
                  )}
                  <br />
                </div>
              ))}
            </div>
          ) : isErrorObject ? (
            <div className='mb-4'>
              {renderErrorObject(errorMessages as Record<string, any>)}
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ValidationErrorMessage;



// import cn from '@/utils/class-names';
// import React from 'react';

// interface ValidationErrorMessageProps {
//   errorMessages: string | Record<string, string> | object | unknown;
//   className?: string;
// }

// const ValidationErrorMessage: React.FC<ValidationErrorMessageProps> = ({ errorMessages, className }) => {
//   // console.log('errorMessages', JSON.stringify(errorMessages));

//   return (
//     <>
//       {errorMessages && (
//         <div className={cn("my-2 text-red-500 text-[13px]", className)}>
//           {typeof errorMessages === 'string' ? (
//             <span>{errorMessages}</span>
//           ) : Array.isArray(errorMessages) ? (
//             errorMessages.map((message, index) => (
//               <div key={index}>
//                 <span>{message}</span>
//                 <br />
//               </div>
//             ))
//           ) : (
//             Object.values(errorMessages as Record<string, string>).map((val: string, index: number) => (
//               <div key={index}>
//                 <span>{val}</span>
//                 <br />
//               </div>
//             ))
//           )}
//         </div>
//       )}

//     </>
//   );
// };

// export default ValidationErrorMessage;