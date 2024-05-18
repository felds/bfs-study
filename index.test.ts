import { expect, test } from "bun:test"
import { findFirstSmallestPath, generateCandidates, getMultiplierPairs } from "."

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

test("It generates candidates", () => {
    // invalid cases
    expect(() => generateCandidates(0)).toThrow()
    expect(() => generateCandidates(1)).toThrow()

    // primes
    expect(generateCandidates(2)).toEqual([1])
    expect(generateCandidates(3)).toEqual([2])
    expect(generateCandidates(19)).toEqual([18])

    // prime squares
    expect(generateCandidates(9)).toEqual([8, 3])
    expect(generateCandidates(289)).toEqual([288, 17])

    // compound numbers
    expect(generateCandidates(12)).toEqual([11, 4, 6])
    expect(generateCandidates(24)).toEqual([23, 6, 8, 12])
})

test("It gets the same result as the example case", () => {
    expect(findFirstSmallestPath(100)).toEqual([100, 10, 9, 3, 2, 1])
})
