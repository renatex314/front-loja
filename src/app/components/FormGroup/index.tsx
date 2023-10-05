import { twMerge } from "tailwind-merge";

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  errorMessage?: string;
}
const FormGroup = ({ label, errorMessage, ...props }: FormGroupProps) => {
  return (
    <div 
      className={twMerge("h-[100px]", props.className)} 
      {...props}
    >
      <p className="h-[20px] mb-5">
        {label}
      </p>
      <div className="h-[56px]">
        {props.children}
      </div>
      <p className="h-[20px]">
        {errorMessage}
      </p>
    </div>
  )
}

export default FormGroup;
