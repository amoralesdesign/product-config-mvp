import { Button } from './ui/Button/Button'
import { useCategories } from '../hooks'

export const Categories = () => {
  const { categories, scrollToElement } = useCategories()

  return (
    <nav>
      <ul className="flex gap-2 overflow-x-auto py-2 [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <li key={cat.id}>
            <Button
              className="text-orange-500 whitespace-nowrap border-0 focus:underline hover:underline decoration-3 underline-offset-4 decoration-orange-500"
              label={cat.name}
              onClick={() => scrollToElement(cat.id)}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}