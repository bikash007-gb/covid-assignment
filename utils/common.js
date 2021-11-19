exports.isNullorUndefined = (x) => {
    if (x === null || x === "undefined" || x === undefined) {
        return true
    }
    return false
}
exports.isDefined = (x) => {
    return !isNullorUndefined(x)
}
