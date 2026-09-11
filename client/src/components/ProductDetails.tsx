import { useNavigate } from "react-router-dom"
// import { Link } from "react-router-dom"
import type { Product } from "../types"
import { formatCurrency } from "../utils"

type ProductDetailsProps = {
    product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {

    const navigate = useNavigate()

    const isAvailable = product.availability

  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {isAvailable ? 'Disponible' : 'Agotado'}
        </td>
        <td className="p-3 text-lg text-gray-800 ">
           <div className="flex gap-2 items-center">
                {/* <Link
                    to={`/productos/${product.id}/editar`}
                    className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase text-xs font-bold text-center hover:bg-indigo-500'
                >Editar</Link> */}
                <button
                    onClick={() => navigate(`/productos/${product.id}/editar`, {
                        state: {
                            product // = product: product
                        }
                    })}
                    className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase text-xs font-bold text-center hover:bg-indigo-500'
                >Editar</button>
           </div>
        </td>
    </tr> 
  )
}
