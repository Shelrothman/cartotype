import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { StoreItem } from '../types';
// import useInterval from 'beautiful-react-hooks/useInterval';


// !! FIX THE TOAST CRAP

type ShoppingCartProviderProps = {
    children: ReactNode;
};

type CartItem = {
    id: string;
    quantity: number;
};

export type NotificationToast = {
    show: boolean;
    // setShow: (show: boolean) => void;
    message: string;
    id: string;
    // variant: string;
};


type ShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: string) => number;
    increaseCartQuantity: (id: string, firstTime?: boolean, item?: string) => void;
    decreaseCartQuantity: (id: string) => void;
    removeFromCart: (id: string, item: string) => void;
    cartQuantity: number;
    cartItems: CartItem[];
    isOpen: boolean;
    globalStoreItems: any;
    setGlobalStoreItems: any;
    /** Notification Toasts for alerting user of completion or not of tasks.. i.e item removed from cart, item added, item saved successfully and so on  */
    notificationToasts: NotificationToast[];
    setNotificationToasts: (notificationToasts: NotificationToast[]) => void;
    addNotificationToast: (message: string) => void;
    removeNotificationToast: (id: string) => void;
};

// make it contain the values of the type this way
const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false);


    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
    );

    const [globalStoreItems, setGlobalStoreItems] = useState<StoreItem[]>([]);

    const [notificationToasts, setNotificationToasts] = useState<NotificationToast[]>([{ show: false, message: '', id: '' }]);


    useEffect(() => {
        console.log('notificationToasts', notificationToasts)
    }, [notificationToasts])

    // this calculates the total quantity of items in the cart
    const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function addNotificationToast(message: string) {
        const newToast = { show: true, message, id: notificationToasts.length + '' };
        setNotificationToasts((notificationToasts) => {
            return [newToast, ...notificationToasts];
        }) // ID
    }

    function removeNotificationToast(id: string) {
        setNotificationToasts((notificationToasts) => {
            return notificationToasts.filter((toast) => toast.id !== id);
        })
    };

    function getItemQuantity(id: string) {
        // if the find, return the quantity, otherwise return 0
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    }
    function increaseCartQuantity(id: string, firstTime: boolean = false, item: string = '') {
        if (firstTime) addNotificationToast(`Item: ${item} added to cart!`);
        setCartItems((currentItems) => {
            if (currentItems.find((item) => item.id === id) == null) {
                return [...currentItems, { id, quantity: 1 }];
            } else {
                // if ya do find it:
                return currentItems.map((item) => {
                    if (item.id === id) return { ...item, quantity: item.quantity + 1 };
                    else return item;
                });
            }
        })
    }
    function decreaseCartQuantity(id: string) {
        setCartItems((currentItems) => {
            if (currentItems.find((item) => item.id === id)?.quantity === 1) {
                // then get rid of it
                return currentItems.filter((item) => item.id !== id);
            } else {
                return currentItems.map((item) => {
                    if (item.id === id) return { ...item, quantity: item.quantity - 1 };
                    else return item;
                });
            }
        })
    }
    function removeFromCart(id: string, itemName: string) {
        // setNotificationToasts([{ ...notificationToasts, show: true, message: `Item: ${itemName} removed from cart.` }]);
        addNotificationToast(`Item: ${itemName} removed from cart.`);
        setCartItems((currentItems) => {
            return currentItems.filter((item) => item.id !== id);
        })
    }

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            cartItems,
            cartQuantity,
            openCart,
            closeCart,
            isOpen,
            globalStoreItems,
            setGlobalStoreItems,
            notificationToasts,
            setNotificationToasts,
            addNotificationToast,
            removeNotificationToast
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}
