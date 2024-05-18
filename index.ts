type Pair = [number, number]
type Path = number[]

/**
 * Get all the possible values for a and b where
 * - `a * b = n`
 * - a and b are integers larger than 1
 */
export function getMultiplierPairs(n: number): Pair[] {
    if (getMultiplierPairs.cache.has(n)) {
        return getMultiplierPairs.cache.get(n)!
    }

    const start = Math.trunc(Math.sqrt(n))
    const pairs: Pair[] = []
    for (let a = start; a > 1; a--) {
        const b = n / a
        if (Number.isInteger(b)) {
            pairs.push([a, b])
        }
    }

    getMultiplierPairs.cache.set(n, pairs)
    return pairs
}
getMultiplierPairs.cache = new Map<number, Pair[]>()

/**
 * Generate a candidates list for the number n.
 */
export function generateCandidates(n: number) {
    if (n <= 1) {
        throw new RangeError(`Can't generate candidates for n = ${n}`)
    }

    if (generateCandidates.cache.has(n)) {
        return generateCandidates.cache.get(n)!
    }

    const largestMultipliers = getMultiplierPairs(n).map((p) => Math.max(...p))
    const candidates = [n - 1, ...largestMultipliers]

    generateCandidates.cache.set(n, candidates)
    return candidates
}
generateCandidates.cache = new Map<number, number[]>()

/**
 Given a positive integer N, find the smallest number of steps it will take to
 reach 1.

 There are two kinds of permitted steps:
 - You may decrement N to N - 1.
 - If a * b = N, you may decrement N to the larger of a and b.

 For example, given 100, you can reach 1 in five steps with the following route:
 100 -> 10 -> 9 -> 3 -> 2 -> 1.
 */
function findFirstSmallestPath(n: number): number[] {
    if (!Number.isInteger(n) || n < 1)
        throw RangeError(`N has to be an integer larger or equal to 1. ${n} given.`)

    const paths: Path[] = [[n]]
    while (paths.length) {
        const currentPath = paths.shift()!
        const head = currentPath.at(-1)!
        if (head === 1) {
            return currentPath
        } else {
            // search further
            const candidates = generateCandidates(head)
            for (const c of candidates) {
                paths.push([...currentPath, c])
            }
        }
    }
    throw Error(`Coundn't find path for n = ${n}`)
}

console.time("Run")
console.log("Shortest paths")
for (let i = 100; i <= 100_000; i += 71) {
    const result = findFirstSmallestPath(i)
    console.log(`${i} (${result?.length})`, result)
}
console.timeEnd("Run")
