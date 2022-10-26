// Imports de React
import { createContext, useState } from "react";


// Creación del context
const CategoriesContext = createContext();

//  CONTEXT   //
const CategoriesProvider = ({children}) => {

    // Estados para setear todas las categorías y la seleccionada
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);


    // Función para traer todas las categorías de la base de datos
    const getCategories = async () => {
        const result = await fetch("/categories");
        const cat = await result.json();
        return setCategories(cat);
    };

    // Función para setear la categoría actual
    const setCat = (cat_actual, categories) => {
        if (cat_actual !== null) {
            categories.map(c => {
                if (c.id === cat_actual) {
                    return setCategory(c.categoria)
                }
            })
        } else {
            return setCategory('Categorías')
        }
    }
    

    // Data para enviar a los children
    const data = {
        category,
        setCategory,
        setCat,
        getCategories,
        categories
    }

    return (
        <CategoriesContext.Provider value={data}>
            {children}
        </CategoriesContext.Provider>
    )
};

export {CategoriesProvider};
export default CategoriesContext;