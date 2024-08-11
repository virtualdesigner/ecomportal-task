type ButtonProps = {
  children: string,
  type?: 'submit'
  className?: string
}

const Button = ({ className, children, type }: ButtonProps) => {
  return <button className={`px-3 py-2 rounded border border-2 ${className}`} type={type}>{children}</button>
}

export default Button