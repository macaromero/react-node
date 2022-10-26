// Imports de React
import { createContext, useState } from "react";


// Creación del context
const OrderContext = createContext();


//  CONTEXT   //  
const OrderProvider = ({children}) => {

    // Estados para setear las ordenes
    const [order, setOrder] = useState({});
    const [ordersDb, setOrdersDb] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState();
    const [ordersByUserId, setOrdersByUserId] = useState([]);


    //  FUNCTIONS   //

    // Función para traer todas las órdenes de un mismo usuario
    const getOrderByUserId = (id) => {
        fetch(`/cart/${id}/productos`)
            .then(res => res.json())
            .then(data => setOrdersByUserId(data))
    }; 

    // Función para crear una orden nueva
    const createOrder = async (objOrder) => {
        fetch('/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(objOrder)
        })
            .then(res => res.json())
            .then(data => setOrder(data))
        setOrderSuccess(true)
    }


    // Data para enviar a los children
    const data = {
        // getOrders, 
        getOrderByUserId,
        setOrdersByUserId,
        ordersByUserId,
        createOrder,
        order,
        setOrder,
        ordersDb,
        orderSuccess,
        setOrderSuccess
    }

    return (
        <OrderContext.Provider value={data}>
            {children}
        </OrderContext.Provider>
    )
};

export {OrderProvider};
export default OrderContext;