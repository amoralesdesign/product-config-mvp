import { Item } from '../../../models/item.model';

interface ItemOptionProps {
  item: Item
  isSelected: boolean
  isDisabled: boolean
  onClick: () => void
  className?: string
  image?: string
  price?: string | number
}

export const ItemOption = ({ item, isSelected, isDisabled, onClick, className, image, price }: ItemOptionProps) => {
  return (
    <div
      className={`relative border-2 text-center rounded p-2 transition-all ${className || ''} ${
        isSelected 
          ? 'bg-zinc-100 border-orange-500' 
          : isDisabled 
            ? 'opacity-50 cursor-not-allowed'
            : 'bg-zinc-100 border-transparent hover:border-gray-300 cursor-pointer hover:bg-gray-50'
      }`}
      onClick={onClick}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-label={`${isSelected ? 'Seleccionado' : isDisabled ? 'No disponible' : 'Seleccionar'} ${item.name} - ${price}€`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {image && (
        <img
          src={image}
          alt={item.name}
          loading="lazy"
          className="w-full h-32 object-cover rounded"
        />
      )}
      <div className="mt-2">
        <div className="font-semibold">{item.name}</div>
        {price && (
          <div className="text-sm text-gray-600">{price}€</div>
        )}
      </div>
      {isDisabled && (
      <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
        <svg className="absolute inset-0 size-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
          <line x1="0" y1="100" x2="100" y2="0" vectorEffect="non-scaling-stroke"></line>
        </svg>
      </span>
      )}
    </div>
  )
}