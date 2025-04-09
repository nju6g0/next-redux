export default function Textarea({ placeholder, value, onChange, className }) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full 
        h-24 
        border 
        border-gray-300 
        rounded-lg 
        p-2 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500
        ${className}`}
    ></textarea>
  );
}
