import {
  hideItemId,
  hideItemIdToOthers,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { DealRule } from './rules/DealRule'
import { DraftRule } from './rules/DraftRule'
import { PlayLandCardRule } from './rules/PlayLandCardRule'
import { RuleId } from './rules/RuleId'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class StrangeWorldAboveTheCloudsRules extends SecretMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor> {
  rules = {
    [RuleId.Deal]: DealRule,
    [RuleId.Draft]: DraftRule,
    [RuleId.PlayLandCard]: PlayLandCardRule,
  }

  locationsStrategies = {
    [MaterialType.LandCard]: {
      [LocationType.LandDeck]: new PositiveSequenceStrategy(),
      [LocationType.Hand]: new PositiveSequenceStrategy(),
      [LocationType.FumaroleStack]: new PositiveSequenceStrategy(),
      [LocationType.DraftArea]: new PositiveSequenceStrategy()
    },
    [MaterialType.DarkCityCard]: {
      [LocationType.DarkCityStack]: new PositiveSequenceStrategy()
    },
    [MaterialType.TravelerCard]: {
      [LocationType.TravelerStack]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.LandCard]: {
      [LocationType.LandDeck]: hideItemId,
      [LocationType.Hand]: hideItemIdToOthers,
      [LocationType.DraftArea]: showIdForPlayerThatPlace
    }
  }

  giveTime(): number {
    return 60
  }

  itemsCanMerge(): boolean {
    return false
  }
}

export const showIdForPlayerThatPlace = <P extends number = number, L extends number = number>(
  item: MaterialItem<P, L>, player?: P
): string[] => item.location.id === player ? [] : ['id']