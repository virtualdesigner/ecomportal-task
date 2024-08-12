type ButtonProps = {
  children: string,
  type?: 'submit'
  className?: string
  disabled?: boolean
  onClick?: () => void
}

const Button = ({ className, children, type, disabled, onClick }: ButtonProps) => {
  return <button className={`px-4 py-2 cursor-pointer rounded-md border border-2 w-40 bg-blue-500 text-white ${className}`} type={type} disabled={disabled} onClick={onClick}>{children}</button>
}

export default Button