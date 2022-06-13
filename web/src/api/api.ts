import Request from '../lib/Request'

const http = new Request('http://localhost:5000', 10000)


export const getCategories = () => {
    return http.get('/getCategories')
}
export const getBill = () => {
    return http.get('/getBill')
}
export const addBill = (data: { [key: string]: any }) => {
    return http.post('/addBill', data)
}
