export default function getUniqueListBy<T>(arr: Array<T>, key: keyof T) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}
