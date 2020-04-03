import React from "react"

const Textarea = ({
                     value = '',
                     placeholder = '',
                     maxRows = 8,
                     max = 400,
                     maxRowsTitle = 'строк',
                     onChange
                  }) => {
   return (
      <>
         <textarea placeholder={placeholder}
                   rows={maxRows}
                   value={value}
                   onChange={onChange}/>
         {/*<span>{value.split(/\r*\n/).length}/{maxRows} {maxRowsTitle}</span>*/}
         <span>{value.length}/{max}</span>
      </>
   )
}

export default Textarea