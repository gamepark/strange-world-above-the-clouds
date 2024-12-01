import { getDistanceBetweenSquares, Location, Material } from '@gamepark/rules-api'
import { LandCard } from '../../material/LandCard'

export const getAdjacentFumarole = (panorama: Material, darkCities: Material, fumaroleLocation: Location) => {
  return panorama
    .id(LandCard.Fumarole)
    .filter((item) => getDistanceBetweenSquares(
      { x: item.location.x!, y: item.location.y! },
      { x: fumaroleLocation.x!, y: fumaroleLocation.y! }
    ) === 1 && !hasDarkCitiesOnIt(darkCities, item.location))

}

const hasDarkCitiesOnIt = (darkCities: Material, location: Location) => {
  return darkCities
    .getItems()
    .some((item) =>
      (Math.abs(location.x! - (item.location.x!)) === 0.5 && location.y === item.location.y) ||
      Math.abs(location.y! - (item.location.y!)) === 0.5 && location.x === item.location.x)
}