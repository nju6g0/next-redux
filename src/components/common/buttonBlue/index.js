export default function Button({
  children,
  onClick,
  disabled = false,
  loading = false,
  className = "",
  type = "button",
  ...rest
}) {
  const isDisabled = loading || disabled;
  return (
    <button
      type={type}
      className={`
        border 
        bg-blue-500 
        text-white 
        font-bold 
        py-2 
        px-4 
        rounded 
        m-2 
        cursor-pointer 
        hover:bg-blue-200 
        hover:border-blue-200 
        disabled:bg-blue-100
        disabled:border-blue-200
        disabled:cursor-not-allowed 
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
