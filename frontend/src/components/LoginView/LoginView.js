//  IMPORTS  //

// CSS
import './LoginView.css';

// Material UI
import { IconButton, MenuItem, TextField, FormControl, InputLabel, Input, InputAdornment, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// React
import { useState, useContext } from 'react';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// Context
import LogInContext from '../../context/LogInContext';

//  COMPONENT   //
const LoginView = () => {

    // Llamada a context
    const {logIn, setInitialAvatar} = useContext(LogInContext);

    // Instancia de useNavigate
    const navigate = useNavigate();

    // Estados para cerrar menú, mostrar y ocultar la contraseña y setear al usuario
    const [anchorElAccount, setAnchorElAccount] = useState(null);
    const [showPassword, setShowPassword] = useState(false)
    const [usuario, setUsuario] = useState({});


    //  FUNCTIONS  //

    // Función para cerrar el menú
    const handleCloseAccount = (e) => {
        e.preventDefault()
        setAnchorElAccount(null);
    };

    // Función para setear el usuario a partir de los valores ingresados en el form
    const handleChange = (event) => {
        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value
        });
    };

    // Funciones para mostrar y ocultar la contraseña
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Función para loguearse
    const handleLogIn = async (e) => {
        e.preventDefault();
        await logIn(usuario);
        setInitialAvatar(usuario.username.slice(0,1).toUpperCase());
        navigate('/');
    };
    
    // Función de enrutamiento para ir a crear una nueva cuenta
    const newAccount = (e) => {
        e.preventDefault()
        navigate('/user/new');
        handleCloseAccount(e)
    }


    //  HTML   //
    return (
        <div className='container-us'>
            <div className='row-us'>
                <form onSubmit={(e) => handleLogIn(e)}>
                    <MenuItem id='formItem-userWidget'>
                        <TextField
                            label="Usuario"
                            id="formInput-userWidget"
                            sx={{ m: 1, width: '25ch' }}
                            variant="standard"
                            name='username'
                            onChange={handleChange}
                        />
                    </MenuItem>
                    <MenuItem id='formItem-userWidget'>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" id='formInput-userWidget'>
                            <InputLabel htmlFor="standard-adornment-password" id='formLabel-userWidget'>Contraseña</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={handleChange}
                                name='password'
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                    </MenuItem>
                    <Button id='btnLogIn-userWidget' type='submit' size='small'>Ingresar</Button>
                </form>
            </div>
            <div className='row-us'>
                <Button id='btnNewAccount-userWidget' type='submit' size='small' onClick={(e) => newAccount(e)}>Crear cuenta</Button>                  
            </div>
        </div>
    )
}

export default LoginView;