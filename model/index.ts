import fs from 'fs'
const parseCsv = (data: string) => {
    let csvlist = data.split('\n')
    let typelist = csvlist[0].split(',')
    let datalist = []
    for (let index = 1; index < csvlist.length; index++) {
        let csvitems = csvlist[index].split(",")
        let data: { [key: string]: any } = {}
        typelist.forEach((item, index) => {
            data[item] = csvitems[index]
        })
        datalist.push(data)
    }
    return datalist
}

const writeJson = (name: string, content: string) => {

    fs.writeFile(`../json/${name}.json`, content, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('文件创建成功~' + name);
        }

    })
}


fs.readFile('../csv/bill.csv', "utf8", function (err, data) {
    let list = parseCsv(data)
    writeJson('bill', JSON.stringify(list))

});
fs.readFile('../csv/categories.csv', "utf8", function (err, data) {
    let list = parseCsv(data)
    writeJson('categories', JSON.stringify(list))
});
