import logo from '../../../assets/img/logo.avif'

interface LogoProps {
  width?: string | number
  height?: string | number
  className?: string
  alt?: string
}

export const Logo = ({ width = "234", height = "52", className = "", alt = "logo" }: LogoProps) => {
  return (
    <img 
      src={logo} 
      alt={alt} 
      width={width} 
      height={height} 
      className={className}
    />
  )
} 