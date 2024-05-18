type Pair = [number, number]

const getMultiplierPairsCache: Map<number, Pair[]> = new Map()
export function getMultiplierPairs(n: number) {
    if (getMultiplierPairsCache.has(n)) {
        return getMultiplierPairsCache.get(n)!
    }

    const start = Math.trunc(Math.sqrt(n))
    const pairs: Pair[] = []
    for (let a = start; a > 1; a--) {
        const b = n / a
        if (Number.isInteger(b)) {
            pairs.push([a, b])
        }
    }

    getMultiplierPairsCache.set(n, pairs)
    return pairs
}
