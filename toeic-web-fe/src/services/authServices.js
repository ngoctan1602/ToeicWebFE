import * as BaseApi from '../api/BaseAPI'
import CheckValue from '../component/common/checkEmtyValue'
import { jwtDecode } from 'jwt-decode';
export const login = async (account) => {
    return (await BaseApi.postItem('/login', account))
}
export const checkExpiredToken = () => {
    const accessToken = localStorage.getItem("accessToken")
    if (!CheckValue(accessToken)) {
        return false
    }
    const decoded = jwtDecode(accessToken);
    const expirationTime = decoded.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    if (expirationTime < currentTime) {
        return false
    }
    return true;
}