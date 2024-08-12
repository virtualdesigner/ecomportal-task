type ButtonProps = {
  children: string,
  type?: 'submit'
  className?: string
  disabled?: boolean
}

const Button = ({ className, children, type, disabled }: ButtonProps) => {
  return <button className={`px-3 py-2 rounded border border-2 ${className}`} type={type} disabled={disabled}>{children}</button>
}

export default Button