import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useTheme } from "../context/ThemeContext";
import { CartItem } from "./CartItem";
// import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";
// type ShoppingCartProps = {
//     isOpen: boolean;
// }

export function ShoppingCart() {

    const { closeCart, cartItems, isOpen } = useShoppingCart();
    const { currentTheme } = useTheme();

    return (
        <Offcanvas
            show={isOpen}
            onHide={closeCart}
            placement="end"
            className={currentTheme === "dark" ? 'bg-dark text-light' : 'bg-light text-dark'}
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total:{" "}
                        {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const item = storeItems.find(i => i.id === cartItem.id)
                                return total + (item?.price || 0) * cartItem.quantity
                            }, 0)
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}