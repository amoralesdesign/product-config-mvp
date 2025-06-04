import { Item } from '../models'
import noImage from '../assets/img/no-image.jpg'
import { HeaderNumber } from './ui/Typography/HeaderNumber/HeaderNumber'
import { useItemSelector } from '../hooks'
import { ItemOption } from './ui/ItemOption/ItemOption'

interface ItemSelectorProps {
  title: string,
  id: string,
  order: number
  items: Item[]
}

export const ItemSelector = ({ id, title, order, items }: ItemSelectorProps) => {
  const { processItem } = useItemSelector(id)

  return (
    <section id={id} className="mb-8 scroll-mt-40">
      <HeaderNumber tag="h2" number={order}>
       {title}
      </HeaderNumber>
      <ul className="w-full flex flex-nowrap overflow-x-auto xl:grid xl:grid-cols-5 gap-4 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const { itemInfo, isSelected, isDisabled, onClick } = processItem(item)
          
          return (
            <li key={item.id} className="shrink-0 w-[200px] lg:shrink lg:w-auto lg:min-w-[38%] xl:min-w-0 ">
              <ItemOption
                item={item}
                isSelected={isSelected}
                isDisabled={isDisabled}
                onClick={onClick}
                image={item.image_url || noImage}
                price={itemInfo.modifiedPrice}
              />
              {isDisabled && (
                <div className="text-red-600 text-xs mt-1">
                  {itemInfo.disabledReason}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
