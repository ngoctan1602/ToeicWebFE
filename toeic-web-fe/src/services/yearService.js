import axios from 'axios'
const yearApi = axios.create(
    {
        baseURL: import.meta.env.VITE_BASE_API + 'year'
    }
)

export const getYear = async () => {
    return (await yearApi.get('/getAll')).data
}
export const addYear = async (year) => {
    return (await yearApi.post('/add', year)).data
}
export const update = async (year) => {
    return (await yearApi.put('/update', year)).data
}