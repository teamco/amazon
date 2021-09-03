const flatten = (obj) => {
    let res = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object') {
            res = { ...res, ...flatten(value) };
        } else {
            res[key] = value;
        }
    }
    return res;
}