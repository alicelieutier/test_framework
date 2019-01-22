describe("Square", () => {
    describe("constructor", () => {
        it("throws 'argument is not a number' when argument is not a number", () => {
            expect(() => {new Square('a')}).toThrow('argument is not a number');
        })
        it("throws 'size should be a positive number' when argument is a negative number", () => {
            expect(() => {new Square(-5)}).toThrow('size should be a positive number');
        })
        it("does not throw when initialized with a number", () => {
            expect(() => {new Square(7)}).notToThrow();
        })
    })
    describe("area", () => {
        it("returns an area of 9 for a size 3 square", () => {
            let square = new Square(3);
            expect(square.area()).toEq(9);
        })
        it("returns an area of 16 for a size 4 square", () => {
            let square = new Square(4);
            expect(square.area()).toEq(16);
        })
    })
})
