const plusOrMinus = (values: string) => {
    let newValue: number | string;
    if (!(/[^0-9.-]/g.test(values))) {
        newValue = values.replace(/[^\-\d.]/g, '').replace(/\-{2,}/g, '-').replace(/\-{2,}/g, '-').replace(/^\./g, '')
            .replace(/\.{2,}/g, '.')
            .replace('.', '$#$')
            .replace(/\./g, '')
            .replace('$#$', '.');
        if (newValue.toString().indexOf('.') > 0 && Number(newValue.toString().split('.')[1].length) > 2) {
            newValue = parseInt(String(parseFloat(newValue) * 100)) / 100;
        }
        if ((newValue.toString().split('-').length - 1) > 1) {
            newValue = parseFloat(String(newValue)) || '';
        }
        if ((newValue.toString().split('-').length) > 1 && newValue.toString().split('-')[0].length > 0) {
            newValue = parseFloat(String(newValue)) || '';
        }
        if (newValue.toString().length > 1 && (newValue.toString().charAt(0) === '0' || (newValue.toString().length > 2 && newValue.toString().charAt(0) === '-' && newValue.toString().charAt(1) === '0' && newValue.toString().charAt(2) !== '.')) && newValue.toString().indexOf('.') < 1) {
            newValue = parseFloat(String(newValue)) || '';
        }
        // 判断整数位最多为9位
        if (newValue.toString().indexOf('.') > 0 && Number(newValue.toString().split('.')[0].length) > 9) {
            newValue = `${newValue.toString().substring(0, 9)}.${newValue.toString().split('.')[1]}`;
        } else if (newValue.toString().indexOf('.') < 0 && Number(newValue.toString().split('.')[0].length) > 9) {
            newValue = newValue.toString().substring(0, 9);
        }
    } else {
        newValue = values.replace(/[^0-9.-]/g, '');
    }
    return newValue;
}

export { plusOrMinus }

export default { plusOrMinus }