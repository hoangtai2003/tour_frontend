import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {
    const [token, setToken] = useState("")
    const [ user, setUser ] = useState([])
    const url = "http://localhost:4000/api/v1"
    const userId = user?.id
    const navigate = useNavigate();
    useEffect(() => {
        const storedToken = localStorage.getItem("token_customer");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []); 
    
    useEffect(() => {
        const fetchUserInfo = async() => {
            try {
                const response = await axios.get(`${url}/auth/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(response.data.data)
            } catch(error){
                 if (error.response){
                    localStorage.removeItem("token_customer");
                    setToken(null)
                    navigate('/home')
                }
            }
        }
        if (token) {
            fetchUserInfo();
        }
    }, [token, navigate]); 
    const contextValue = {
        url,
        token,
        setToken,
        user,
        setUser,
        userId
    }
    return (
        <StoreContext.Provider value={contextValue}>
           {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;

