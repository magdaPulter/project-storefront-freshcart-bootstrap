export function ratingMap(ratingValue: number): number[] {
    const initialArr: number[] = [1, 1, 1, 1, 1]
    if (Number.isInteger(ratingValue)) {
      return initialArr.fill(0, ratingValue)
    }
    const filledArray: number[] = initialArr.fill(0, ratingValue)
    filledArray.splice(ratingValue, 1, 0.5)
    return filledArray
  }