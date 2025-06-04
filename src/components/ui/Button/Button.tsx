interface ButtonProps {
  label: string,
  onClick: () => void,
  className?: string
}

export const Button = ({ label, onClick, className }: ButtonProps) => {
  return (
    <button className={`px-4 py-2 font-semibold cursor-pointer ${className || ''}`} onClick={onClick}>
      {label}
    </button>
  )
}