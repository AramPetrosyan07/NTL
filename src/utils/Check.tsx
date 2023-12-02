export const checkLengthOfValue = (val:any, symbol = ''):any => {
    if (typeof val === 'string') {
      return val.trim().length ? val + symbol : <div className="w-[20px] flex h-[1px] bg-gray-500 dark:bg-gray-100"></div>;
    } else  {
      return !!val ? val + symbol : <div className="w-[20px] h-[1px] bg-gray-500 dark:bg-gray-100"></div>;
    }
  };

  export const CutString =(inputString: any): any => {
    if (typeof inputString == "string") {
      if (inputString.length > 20) {
        return inputString.slice(0, 20) + '...'
      }else{
        return inputString
      }
    }
  }

