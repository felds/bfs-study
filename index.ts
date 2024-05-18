// console.log("Hello via Bun!");

type Pair = [number, number]

export function getMultiplierPairs(n: number) {
    const start = Math.trunc(Math.sqrt(n))
    const pairs = []
    for (let a = start; a > 1; a--) {
        const b = n / a
        if (Number.isInteger(b)) {
            pairs.push([a, b])
        }
    }
    return pairs
}
