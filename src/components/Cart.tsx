import { useCart } from '../hooks'
import { Button } from './ui/Button/Button'

export const Cart = () => {
  const { 
    categories,
    processCategory,
    total, 
    hasItems, 
    handleRemoveItem, 
    handleClearCart 
  } = useCart()

  return (
    <section className="bg-zinc-100 text-zinc-900 px-2 py-8 md:px-8">
      <div className="sticky top-40 overflow-x-auto">
        <table className="w-full ">
          <tbody>
            {categories.map((category) => {
              const { id, name, cartItem, hasItem } = processCategory(category)
              
              return (
                <tr key={id} className="border-b border-zinc-200 hover:bg-zinc-50">
                  <td className="py-3 font-bold">{name}</td>
                  <td className="py-3">
                    {hasItem && cartItem ? (
                      <span className="font-medium">{cartItem.name}</span>
                    ) : (
                      <span className="text-zinc-400 italic">No selected</span>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    {hasItem && cartItem ? (
                      <>
                        {cartItem.modifiedPrice !== cartItem.originalPrice ? (
                          <>
                           <span className="text-orange-600">{cartItem.modifiedPrice}€</span>
                            <span className="text-xs text-zinc-400 line-through">{cartItem.originalPrice}€</span>
                          </>
                        ) : (
                          <span>{cartItem.originalPrice}€</span>
                        )}
                      </>
                    ) : (
                      <span className="text-zinc-400">-</span>
                    )}
                  </td>
                  <td className="py-3 text-center">
                    {hasItem && cartItem ? (
                      <Button
                        label="Eliminar"
                        className="text-xs px-3 py-1 text-red-600"
                        onClick={() => handleRemoveItem(id)}
                      />
                    ) : (
                      <span className="text-zinc-400">-</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-zinc-400">
              <td colSpan={3} className="py-4 font-bold text-lg">Total:</td>
              <td className="py-4 text-right font-bold text-lg text-orange-600">{total}€</td>
              <td className="py-4"></td>
            </tr>
          </tfoot>
        </table>
        {hasItems && (
          <Button
            label="Reset config"
            onClick={handleClearCart}
            className="w-full mt-6 rounded text-orange-600 hover:text-orange-400 border border-orange-500 hover:bg-zinc-950 focus:ring-4 focus:outline-none focus:ring-orange-300"
          />
        )}
      </div>
    </section>
  )
}
