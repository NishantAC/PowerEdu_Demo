// RadioGroup.js
export const RadioGroup = ({ children, className }) => {
     return <div className={`flex space-x-4 ${className}`}>{children}</div>;
   };
   
   // RadioItem.js
 export const RadioItem = ({ value, checked, onChange, children }) => {
     return (
       <label className="flex items-center space-x-2">
         <input
           type="radio"
           value={value}
           checked={checked}
           onChange={onChange}
           className="w-4 h-4 text-blue-500 border-gray-300"
         />
         <span>{children}</span>
       </label>
     );
   };
   
   