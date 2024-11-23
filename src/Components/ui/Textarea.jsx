// Textarea.js
const Textarea = ({ value, onChange, placeholder, rows }) => {
     return (
       <textarea
         value={value}
         onChange={onChange}
         placeholder={placeholder}
         rows={rows}
         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
       />
     );
   };
   
export default Textarea;
   