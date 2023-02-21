import {describe, it,expect} from "vitest"

describe("index", () => {
    let a = 1
    let b = 2

    it("test", () => {
        expect(a + b).toEqual(3)
    })
})