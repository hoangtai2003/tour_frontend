import axios from "axios";
import { createContext, useState, useEffect } from "react";
export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {
    const [token, setToken] = useState("")
    const [ user, setUser ] = useState(null)
    const url = "http://localhost:4000/api/v1"
    const fetchUserInfo = async() => {
        try {
            const response = await axios.get(`${url}/auth/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(response.data.data)
        } catch(error){
            console.error("Lỗi khi lấy thông tin người dùng", error);
        }
    }
    useEffect(() => {
        async function loadData() {
            if (token){
                fetchUserInfo()
            }
            const storedToken = localStorage.getItem("token")
            if (storedToken) {
                setToken(storedToken)
            }
        }
        loadData()
    }, [token, url])
    const contextValue = {
        url,
        token,
        setToken,
        fetchUserInfo,
        user,
        setUser
    }
    return (
        <StoreContext.Provider value={contextValue}>
           {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;

