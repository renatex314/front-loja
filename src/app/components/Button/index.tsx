interface ButtonProps extends React.DOMAttributes<HTMLButtonElement> {
  children: React.ReactNode | React.ReactNode[];
  type?: 'button' | 'submit';
}
const Button = ({children, type = 'button', ...props}: ButtonProps) => {
  return (
    <button
      type={type}
      className="flex justify-center items-center bg-blue-500 text-white rounded-md shadow-lg p-3 hover:bg-blue-600 duration-100 cursor-pointer"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;
