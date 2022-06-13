import { getJsonInfo, saveInfo } from "../model"

let billlist: any = null
let categories: any = null



const getBill = () => {
    if (billlist === null) {
        billlist = getJsonInfo("bill")
    }
    return billlist
}
const getCategories = () => {
    if (categories === null) {
        categories = getJsonInfo("categories")
    }
    return categories
}

const addBill = (param: {
    amount: string
    category: string
    type: string
}) => {
    if (billlist === null) {
        billlist = getJsonInfo("bill")
    }
    billlist.push({
        time: String(new Date().getTime()),
        ...param
    })
    saveInfo('bill', billlist)
}
export { getBill, getCategories, addBill }
export default { getBill, getCategories, addBill }


