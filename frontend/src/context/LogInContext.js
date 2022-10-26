// Imports de React
import { createContext, useState } from "react";


// Creación del context
const LogInContext = createContext();


//  CONTEXT   //       
const LogInProvider = ({children}) => {

    // Estados para setear a los usuarios, el estado de logueo y de la creación de un usuario nuevo
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [initialAvatar, setInitialAvatar] = useState("");
    const [formSuccess, setFormSuccess] = useState();
    const [userImg, setUserImg] = useState();
    const [newUser, setNewUser] = useState();
    

    //  FUNCTIONS   //

    // Función para traer un usuario por id
    const getUserById = (id) => {
        fetch(`/user/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
        
        fetch(`/user/${id}/image`, {
            method: 'GET',
            headers: {
              'Content-Type': 'image/jpeg' || 'image/png' || 'image/jpg',
            }
        })
            .then(res => res.blob())
            .then(data => setUserImg(URL.createObjectURL(data), null))
    };    

    // Función para iniciar sesión
    const logIn = (userData) => {
        fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => getUserById(data.id))
            .then((res) => setLoggedIn(true))
            .catch((e) => setLoggedIn(false))
    };

    // Función para cerrar sesión
    const logOut = () => {
        fetch('/user/logout')
            .then(res => res.json());
        setLoggedIn(false);
        setUser({});
    };

    // Función para crear un nuevo usuario
    const createUser = (user) => {
        fetch('/register', {
            method: 'POST',
            body: user
        })
            .then(res => res.json())
            .then(data => setNewUser(data));
        setFormSuccess(true)
    }

    // Data para enviar a los children
    const data = {
        logIn,
        logOut,
        user,
        setUser,
        getUserById,
        userImg,
        loggedIn,
        initialAvatar,
        setInitialAvatar,
        createUser,
        formSuccess,
        setFormSuccess
    }

    return (
        <LogInContext.Provider value={data}>
            {children}
        </LogInContext.Provider>
    )
};

export {LogInProvider};
export default LogInContext;