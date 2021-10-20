import { Matrix, getRotationMatrix, scale, translation } from '../Matrix'

describe('Matrix implementation', () => {
  it('should instantiate the identity matrix', () => {
    const idMatrix = new Matrix()
    expect(idMatrix.elements).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  })
  it('should instantiate the identity matrix', () => {
    const idMatrix = new Matrix([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1])
    expect(idMatrix.elements).toEqual([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1])
  })

  it('should correctly translate correctly', () => {
    const matrix1 = new Matrix(scale(1, 2, 3))
    const matrix2 = new Matrix(translation(1, 2, 3))
    const multiplied = matrix1.multiply(matrix2)
    expect(multiplied).toEqual([1, 0, 0, 1, 0, 2, 0, 2, 0, 0, 3, 3, 0, 0, 0, 1])
  })

  it('should correctly identify a matrix equal to itself', () => {
    const matrix1 = new Matrix()
    const matrix2 = new Matrix(0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1)
    expect(matrix1).toEqual(matrix2)
  })

  it('should scale correctly'),
    () => {
      const matrix = new Matrix([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
      matrix.scale(2)
      expect(matrix).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])
    }

  it('should multiply correctly', () => {
    const matrix1 = new Matrix()
    const matrix2 = new Matrix()
    const multiplied = matrix1.multiply(matrix2)
    expect(multiplied).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  })

  it('should multiply correctly 2', () => {
    const matrix1 = new Matrix([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1])
    const matrix2 = new Matrix([1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0])
    const multiplied = matrix1.multiply(matrix2)
    expect(multiplied).toEqual([2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0])
  })

  it('should multiply correctly 3', () => {
    const matrix1 = new Matrix([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    const matrix2 = new Matrix([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const multiplied = matrix1.multiply(matrix2)
    expect(multiplied).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  })

  it('should multiply correctly 4', () => {
    const matrix1 = new Matrix([1, 2, 1, 0, 1, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1, 2])
    const matrix2 = new Matrix([1, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1, 2, 1, 2, 1, 0])
    const multiplied = matrix1.multiply(matrix2)
    expect(multiplied).toEqual([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4])
  })

  it('should instantiate the rotation matrix correctly', () => {
    const matrix = new Matrix(getRotationMatrix(0, 1, 2, 1))
    expect(matrix.elements).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  })
})
