export default function InputText({
  value,
  onChange,
  disabled = false,
  className = "",
  inputRef = null,
  autoFocus = false,
  ...rest
}) {
  return (
    <input
      className={`border-2 border-gray-300 rounded-lg p-1 ${className}`}
      ref={inputRef}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoFocus={autoFocus}
      {...rest}
    />
  );
}
