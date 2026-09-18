import { Form, useNavigate, type ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"
// import { Link } from "react-router-dom"
import type { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    product: Product
}
//El comentario de abajo quita el error de que no puedo exportar la función action, ya que no es un componente de React
// eslint-disable-next-line react-refresh/only-export-components
export async function action({params} : ActionFunctionArgs) {
    if(params.id !== undefined){
        await deleteProduct(+params.id)
        return redirect('/')
    }

}


export default function ProductDetails({ product }: ProductDetailsProps) {

    const fetcher = useFetcher()
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
            <fetcher.Form method="POST">
                <button
                    type="submit"
                    name="id"
                    value={product.id}
                    className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-blue-100 hover:cursor-pointer`}
                >
                  {isAvailable ? 'Disponible' : 'No Disponible'}
                </button>
            </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800 ">
           <div className="flex gap-2 items-center">
                {/* <Link
                    to={`/productos/${product.id}/editar`}
                    className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase text-xs font-bold text-center hover:bg-indigo-500'
                >Editar</Link> */}
                {/* <button
                    onClick={() => navigate(`/productos/${product.id}/editar`, {
                        state: {
                            product // = product: product
                        }
                    })}
                    className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase text-xs font-bold text-center hover:bg-indigo-500'
                >Editar</button> */}
                <button
                    onClick={() => navigate(`/productos/${product.id}/editar`)}
                    className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase text-xs font-bold text-center hover:bg-indigo-500'
                >Editar</button>
                <Form
                    className="w-full"
                    method="POST"
                    action={`productos/${product.id}/eliminar`}
                    onSubmit={ (e) => {
                        if( !confirm('Eliminar?')){
                            e.preventDefault()
                        }
                    }}
                >
                    <input 
                        type="submit" 
                        value='Eliminar'
                        className='bg-red-600 text-white rounded-lg w-full p-2 uppercase text-xs font-bold text-center hover:bg-red-500'
                    />
                </Form>
           </div>
        </td>
    </tr> 
  )
}
