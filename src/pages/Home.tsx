import { useEffect } from "react"
import { ItemSelector } from "../components"
import { useItemStore } from "../store/useItemStore"
import { useCategoryStore } from "../store/useCategoryStore"
import { useRuleStore } from "../store/useRuleStore"
import { Logo } from "../components"

export const Home = () => {
  const { items, fetchData, loading: itemsLoading } = useItemStore()
  const { categories } = useCategoryStore()
  const { fetchRules, loading: rulesLoading } = useRuleStore()

  const isLoading = itemsLoading && rulesLoading

  useEffect(() => {
    fetchData()
    fetchRules()
  }, []);

  if (isLoading) {
    return (
      <div className="absolute z-10 bg-zinc-900 top-0 bottom-0 left-0 right-0 text-white flex items-center justify-center">
        <Logo />
      </div>
    )
  }

  return (
    <>
      {categories.map((cat) => (
        <ItemSelector
          key={cat.id}
          id={cat.id}
          title={cat.name}
          order={cat.order}
          items={items.filter(item => item.category === cat.id)}
        />
      ))}
    </>
  );
};