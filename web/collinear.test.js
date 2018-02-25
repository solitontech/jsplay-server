
const collinear = require('./collinear');

function isEqual(pointA, pointB) {
    return pointA.x === pointB.x && pointA.y === pointB.y;
}

function outputContainsLine(output, pointA, pointB) {
    for (let line of output) {
        if (line.length === 2 &&
            line.find(point => isEqual(point, pointA)) &&
            line.find(point => isEqual(point, pointB))) {

            return true;
        }
    }

    return false;
}

describe('Collinear', () => {
    it('should find either ends of a collinear points line segment', () => {
        const input = {};
        input.points = [
            {x:10, y:0},
            {x:0, y:10},
            {x:3, y:7},
            {x:7, y:3},
            {x:20, y:21},
            {x:3, y:4},
            {x:14, y:15},
            {x:6, y:7},
        ];

        const output = collinear(input);
        expect(output.length).toEqual(2);
        expect(outputContainsLine(output, {x:10, y:0}, {x:0, y:10}))
            .toEqual(true);
        expect(outputContainsLine(output, {x:3, y:4}, {x:20, y:21}))
            .toEqual(true);
    });

    it('should not a find a line unless there are four collinear points in it', () => {
        const input = {};
        input.points = [
            {x:3, y:7},
            {x:3, y:4},
            {x:14, y:15},
            {x:6, y:7},
            {x:3, y:5},
        ];

        const output = collinear(input);
        expect(output.length).toEqual(0);
    });

    it('should find vertical line', () => {
        const input = {};
        input.points = [
            {x:3, y:7},
            {x:3, y:4},
            {x:14, y:15},
            {x:6, y:7},
            {x:3, y:10},
            {x:3, y:5},
        ];

        const output = collinear(input);
        expect(output.length).toEqual(1);
        expect(outputContainsLine(output, {x:3, y:4}, {x:3, y:10}))
            .toEqual(true);
    });

    it('should find horizontal line', () => {
        const input = {};
        input.points = [
            {x:10, y:0},
            {x:3, y:0},
            {x:7, y:3},
            {x:20, y:0},
            {x:3, y:4},
            {x:14, y:15},
            {x:6, y:0},
        ];

        const output = collinear(input);
        expect(output.length).toEqual(1);
        expect(outputContainsLine(output, {x:3, y:0}, {x:20, y:0}))
            .toEqual(true);
    });

    it('should find either ends of a 5 point collinearity', () => {
        const input = {};
        input.points = [
            {x:10, y:0},
            {x:0, y:10},
            {x:3, y:7},
            {x:7, y:3},
            {x:3, y:4},
            {x:14, y:15},
            {x:6, y:7},
            {x:-2, y:12},
        ];

        const output = collinear(input);
        expect(output.length).toEqual(1);
        expect(outputContainsLine(output, {x:-2, y:12}, {x:10, y:0}))
            .toEqual(true);
    });

    it('should find two lines going through a point', () => {
        const input = {};
        input.points = [
            {x:5, y:5},
            {x:10, y:0},
            {x:7, y:7},
            {x:0, y:10},
            {x:12, y:12},
            {x:3, y:7},
            {x:10, y:10},
        ];

        const output = collinear(input);
        expect(output.length).toEqual(2);
        expect(outputContainsLine(output, {x:10, y:0}, {x:0, y:10}))
            .toEqual(true);
        expect(outputContainsLine(output, {x:12, y:12}, {x:5, y:5}))
            .toEqual(true);
    });

    it('should find either ends of two parallel lines', () => {
        const input = {};
        input.points = [
            {x:0, y:4},
            {x:1, y:5},
            {x:2, y:6},
            {x:3, y:7},
            {x:2, y:0},
            {x:3, y:1},
            {x:4, y:2},
            {x:5, y:3},
        ];

        const output = collinear(input);
        expect(output.length).toEqual(2);
        expect(outputContainsLine(output, {x:3, y:7}, {x:0, y:4}))
            .toEqual(true);
        expect(outputContainsLine(output, {x:5, y:3}, {x:2, y:0}))
            .toEqual(true);
    });
});
