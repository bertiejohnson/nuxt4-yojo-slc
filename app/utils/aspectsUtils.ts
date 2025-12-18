export function filterAspects(arr) {
  const theAspectsToFilter = ['conjunction', 'square', 'opposition', 'sextile', 'trine']
  const thePlanetsToFilter = [0, 1, 2, 3, 4]
  const ascMcNodeFilter = [10, 12, 13]

  return arr.filter((e) => {
    if (thePlanetsToFilter.includes(e.planetOneId)) return true
  }).filter((e) => {
    if (ascMcNodeFilter.includes(e.planetTwoId)) {
      return false
    } else {
      return true
    }
  }).filter((e) => {
    if (theAspectsToFilter.includes(e.aspectName)) return true
  }).toSorted((a, b) => a.fromExact - b.fromExact)
}
