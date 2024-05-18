import { expect, test } from "bun:test"
import { getMultiplierPairs } from "."

test("It generates all the multipliers", () => {
    expect(getMultiplierPairs(0)).toEqual([])
    expect(getMultiplierPairs(1)).toEqual([])

    // primes return empty lists
    expect(getMultiplierPairs(2)).toEqual([])
    expect(getMultiplierPairs(3)).toEqual([])
    expect(getMultiplierPairs(5)).toEqual([])
    expect(getMultiplierPairs(19)).toEqual([])

    // squares
    expect(getMultiplierPairs(4)).toEqual([[2, 2]])
    expect(getMultiplierPairs(25)).toEqual([[5, 5]])

    // composite numbers
    expect(getMultiplierPairs(6)).toEqual([[2, 3]])
    expect(getMultiplierPairs(12)).toEqual([
        [3, 4],
        [2, 6],
    ])
    expect(getMultiplierPairs(24)).toEqual([
        [4, 6],
        [3, 8],
        [2, 12],
    ])
})
