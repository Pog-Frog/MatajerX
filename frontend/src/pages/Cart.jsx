import CartItem from "../components/CartItem";
import { ShoppingCart, RefreshCw } from "lucide-react";

const Cart = ({products, handleChangeCount, handleResetCount, removeProductFromCart, totalItems, totalPrice}) => {

    return (
        <div className="w-lg mx-auto bg-white rounded-xl shadow-md m-4">
            <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <ShoppingCart className="h-6 w-6 text-indigo-600" />
                        <h1 className="ml-2 text-2xl font-bold text-gray-800">Your Cart</h1>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {totalItems} items
                    </span>
                </div>

                <div className="space-y-4 mb-6">
                    {products && products.map(item => (
                        <CartItem 
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            count={item.count}
                            onCountChange={(count) => handleChangeCount(item.id, count)}
                            removeProductFromCart={removeProductFromCart}

                        />
                    ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                        <p>Subtotal</p>
                        <p>${totalPrice.toFixed(2)}</p>
                    </div>

                    <div className="flex space-x-4">
                        <button 
                            onClick={handleResetCount}
                            className="flex items-center justify-center px-4 py-2 rounded-md font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                        >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Clear Cart
                        </button>
                        <button
                            className="flex-1 flex justify-center py-2 px-4 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Cart;