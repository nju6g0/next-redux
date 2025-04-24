/* eslint-disable react/display-name */
function BaseButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  className = "",
  type = "button",
  size = "md",
  variant = "gray", // 預設為灰色按鈕
  ...rest
}) {
  const isDisabled = loading || disabled;

  // 定義不同尺寸的 class
  const sizeClasses = {
    lg: "px-6 py-3 text-lg",
    md: "px-4 py-2 text-md",
    sm: "px-2 py-1 text-sm",
  };

  // 定義不同樣式的 class
  const variantClasses = {
    gray: "border-gray-400 text-gray-300 hover:bg-gray-200 hover:text-white",
    blue: "border-blue-400 text-blue-300 hover:bg-blue-200 hover:text-white",
    pink: "border-rose-300 text-pink-200 hover:bg-pink-200 hover:text-white",
  };

  return (
    <button
      type={type}
      className={`
        border 
        font-bold 
        rounded 
        cursor-pointer 
        disabled:bg-gray-200
        disabled:text-gray-300
        disabled:border-gray-200
        disabled:cursor-not-allowed
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${className}
      `}
      onClick={onClick}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
}

// 定義不同的子屬性按鈕
const Button = ({ ...props }) => <BaseButton {...props} />;
Button.Gray = (props) => <BaseButton {...props} variant="gray" />;
Button.Blue = (props) => <BaseButton {...props} variant="blue" />;
Button.Pink = (props) => <BaseButton {...props} variant="pink" />;

export default Button;
