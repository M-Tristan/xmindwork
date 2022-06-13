import fs from 'fs'
import { resolve } from 'path'
const getJsonInfo = (name: string) => {
    return JSON.parse(fs.readFileSync(resolve(__dirname, `../../../json/${name}.json`), 'utf-8'));
}
const saveInfo = (name: string, info: Array<{ [key: string]: any }>) => {
    fs.writeFileSync(resolve(__dirname, `../../../json/${name}.json`), JSON.stringify(info))
    if (name === 'bill') {
        saveBillCsv(name, info)
    }

}
const saveBillCsv = (name: string, info: Array<{ [key: string]: any }>) => {
    let newInfo = info.map((item) => {
        return `${item.type},${item.time},${item.category},${item.amount}`
    })
    newInfo.unshift('type,time,category,amount')
    fs.writeFileSync(resolve(__dirname, `../../../csv/${name}.csv`), newInfo.join('\n'))
}

export { getJsonInfo, saveInfo }
export default { getJsonInfo, saveInfo }