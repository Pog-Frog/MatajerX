import { Plus, Minus, Trash } from "lucide-react";

const CartItem = ({ id, name, price, count, onCountChange, removeProductFromCart }) => {
    const handleClickAdd = () => {
        onCountChange(count + 1);
    }

    const handleClickRemove = () => {
        if (count > 0) {
            onCountChange(count - 1);
        }
    }

    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="flex items-center">
                <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{name}</h3>
                    <p className="text-sm font-medium text-gray-500">${price}</p>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={handleClickRemove}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    disabled={count === 0}
                >
                    <Minus className="h-4 w-4 text-gray-600" />
                </button>

                <span className="w-8 text-center font-medium text-gray-900">{count}</span>

                <button
                    onClick={handleClickAdd}
                    className="p-1 rounded-full bg-indigo-100 hover:bg-indigo-200"
                >
                    <Plus className="h-4 w-4 text-indigo-600" />
                </button>
                <button className="rounded-full p-1 bg-indigo-100 hover:bg-indigo-200" onClick={() => removeProductFromCart(id)}>
                    <Trash className="h-4 w-4" />
                </button>
            </div>

        </div>
    );
}

export default CartItem;