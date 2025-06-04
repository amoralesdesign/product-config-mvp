import { Logo } from "../components"
import { Categories } from "../components"
import { Link } from "react-router"

export const Header = () => {
  return (
    <header className="sticky z-10 top-0 bg-zinc-900 p-4 border-b-2 border-orange-500 lg:flex flex-wrap items-center justify-between">
      <Link to="/">
        <Logo />
      </Link>
      <Categories />
    </header>
  )
}