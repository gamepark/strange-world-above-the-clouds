import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isMoveItemType, isStartPlayerTurn, isStartRule } from '@gamepark/rules-api'
import { DarkCity } from '@gamepark/strange-world-above-the-clouds/material/DarkCity'
import { LandCard } from '@gamepark/strange-world-above-the-clouds/material/LandCard'
import { LocationType } from '@gamepark/strange-world-above-the-clouds/material/LocationType'
import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
import { Traveler } from '@gamepark/strange-world-above-the-clouds/material/Traveler'
import { PlayerColor } from '@gamepark/strange-world-above-the-clouds/PlayerColor'
import { RuleId } from '@gamepark/strange-world-above-the-clouds/rules/RuleId'
import { Trans } from 'react-i18next'
import { IconsMini } from '../material/help/LandCardHelp'
import { celine, florian, me, TutorialSetup } from './TutorialSetup'

const BaseComponents = {
  bold: <strong/>,
  italic: <em/>,
  ...IconsMini
}

export class Tutorial extends MaterialTutorial<PlayerColor, MaterialType, LocationType> {
  version = 1

  options = {
    players: [
      { id: me },
      { id: florian },
      { id: celine }
    ]
  }

  players = [
    { id: me },
    { id: florian, name: 'Florian' },
    { id: celine, name: 'Céline' }
  ]
  setup = new TutorialSetup()

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => <Trans defaults="tuto.welcome" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.panorama" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.starting" components={BaseComponents}/>,
        position: { y: 25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard).id(LandCard.StartingGray)
        ],
        margin: {
          bottom: 7
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.green" components={BaseComponents}/>,
        position: {
          y: -17
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard).location(LocationType.Hand).player(me)
        ],
        margin: {
          top: 10,
          bottom: 5
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.one" components={BaseComponents}/>,
        position: {
          y: -17
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard).location(LocationType.Hand).player(me)
        ],
        margin: {
          top: 10,
          bottom: 5
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.draft.sun" components={BaseComponents}/>,
        position: { y: 25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FirstPlayerCard)
        ],
        margin: {
          bottom: 7
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.draft.r1.2" components={BaseComponents}/>,
        position: { y: 10, x: 30 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Hand)
            .player(me)
            .id((id: LandCard) => [LandCard.Moon, LandCard.LandBlue1].includes(id))
        ],
        locations: [
          this.location(LocationType.DraftArea).player(florian).id(me).location
        ],
        margin: {
          top: 10,
          bottom: 5
        }
      }),
      move: {
        player: me,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && [LandCard.Moon, LandCard.LandBlue1].includes(game.items[move.itemType]![move.itemIndex].id)
      }
    },
    {
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Hand)
            .player(me)
            .id((id: LandCard) => [LandCard.Moon, LandCard.LandBlue1].includes(id))
        ],
        locations: [
          this.location(LocationType.DraftArea).player(florian).id(me).location
        ],
        margin: {
          top: 10,
          bottom: 5
        }
      }),
      move: {
        player: me,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && [LandCard.Moon, LandCard.LandBlue1].includes(game.items[move.itemType]![move.itemIndex].id)
      }
    },
    {
      move: {
        player: me
      }
    },
    {
      move: {
        player: celine,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && [LandCard.LandGray1, LandCard.LandGrayBlue1].includes(game.items[move.itemType]![move.itemIndex].id)
      }
    },
    {
      move: {
        player: celine,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && [LandCard.LandGray1, LandCard.LandGrayBlue1].includes(game.items[move.itemType]![move.itemIndex].id)
      }
    },
    {
      move: {
        player: celine
      }
    },
    {
      move: {
        player: florian,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && game.items[move.itemType]![move.itemIndex].id === LandCard.LandGreenGreen1
      }
    },
    {
      move: {
        player: florian,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && game.items[move.itemType]![move.itemIndex].id === LandCard.LandBlueYellow1
      }
    },
    {
      move: {
        player: florian,
        interrupt: (move) => isMoveItemType(MaterialType.LandCard)(move) && move.location.type === LocationType.Hand
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.received.r1.2" components={BaseComponents}/>,
        position: { y: 10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.DraftArea)
        ],
        margin: {
          top: 5,
          bottom: 5
        }
      }),
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.draft.r1.1" components={BaseComponents}/>,
        position: { y: 10, x: 30 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Hand)
            .player(me)
            .id(LandCard.LandGray1)
        ],
        locations: [
          this.location(LocationType.DraftArea).player(florian).id(me).location
        ],
        margin: {
          top: 10,
          bottom: 5
        }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && game.items[move.itemType]![move.itemIndex].id === LandCard.LandGray1
      }
    },
    {
      move: {
        player: me
      }
    },
    {
      move: {
        player: celine,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && game.items[move.itemType]![move.itemIndex].id === LandCard.LandYellow1
      }
    },
    {
      move: {
        player: celine
      }
    },
    {
      move: {
        player: florian,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && game.items[move.itemType]![move.itemIndex].id === LandCard.LandBlue1
      }
    },
    {
      move: {
        player: florian
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.received.r1.1" components={BaseComponents}/>,
        position: { y: -15 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Hand)
            .player(me)
            .id(LandCard.LandYellow1)
        ],
        margin: {
          top: 10,
          bottom: 5
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.hand" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.sun" components={BaseComponents}/>
      }
    },
    {
      move: {
        player: celine,
        filter: (move, game) =>
          isMoveItemType(MaterialType.LandCard)(move) &&
          move.location.x === 0 && move.location.y === -1 &&
          game.items[move.itemType]![move.itemIndex].id === LandCard.LandBlueYellow1
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.place" components={BaseComponents}/>,
        position: { x: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Hand)
            .player(me)
            .id(LandCard.LandGrayBlue1)
        ],
        locations: [
          this.location(LocationType.Tableau)
            .player(me)
            .x(0)
            .y(-1)
            .location
        ],
        margin: {
          top: 5,
          bottom: 5,
          right: 30
        }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.LandCard)(move) &&
          move.location.x === 0 && move.location.y === -1 &&
          game.items[move.itemType]![move.itemIndex].id === LandCard.LandGrayBlue1
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.mountain.score" components={BaseComponents}/>,
        position: { x: 17 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
        ],
        margin: {
          top: 5,
          bottom: 5,
          right: 30
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.mountain.score.2" components={BaseComponents}/>,
        position: { x: 17 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
        ],
        margin: {
          top: 5,
          bottom: 5,
          right: 30
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.water.score" components={BaseComponents}/>,
        position: { x: 17 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
            .id(LandCard.LandGrayBlue1)
        ],
        margin: {
          right: 30,
          top: 8,
          bottom: 10
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.water.warning" components={BaseComponents}/>,
        position: { x: 17 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
            .id(LandCard.LandGrayBlue1)
        ],
        margin: {
          right: 30,
          top: 8,
          bottom: 10
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.play" components={BaseComponents}/>
      }
    },
    {
      move: {
        player: florian,
        filter: (move, game) =>
          isMoveItemType(MaterialType.LandCard)(move) &&
          move.location.x === 0 && move.location.y === -1 &&
          game.items[move.itemType]![move.itemIndex].id === LandCard.LandBlue1
      }
    },
    {
      move: {
        player: celine,
        filter: (move, game) =>
          isMoveItemType(MaterialType.LandCard)(move) &&
          move.location.x === 0 && move.location.y === 1 &&
          game.items[move.itemType]![move.itemIndex].id === LandCard.LandBlue1
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.play" components={BaseComponents}/>,
        position: { x: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Hand)
            .player(me)
            .id(LandCard.LandGreen1)
        ],
        locations: [
          this.location(LocationType.Tableau)
            .player(me)
            .x(1)
            .y(-1)
            .location
        ],
        margin: {
          top: 5,
          bottom: 5,
          right: 35
        }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.LandCard)(move) &&
          move.location.x === 1 && move.location.y === -1 &&
          game.items[move.itemType]![move.itemIndex].id === LandCard.LandGreen1
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.animal.score" components={BaseComponents}/>,
        position: { x: 17 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
            .id(LandCard.LandGreen1)
        ],
        margin: {
          right: 30,
          top: 8,
          bottom: 10
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.play" components={BaseComponents}/>
      }
    },
    {
      move: {
        player: florian,
        filter: (move, game) =>
          isMoveItemType(MaterialType.LandCard)(move) &&
          move.location.x === 0 && move.location.y === -2 &&
          game.items[move.itemType]![move.itemIndex].id === LandCard.Moon
      }
    },
    {
      move: {
        player: celine,
        filter: (move, game) =>
          isMoveItemType(MaterialType.LandCard)(move) &&
          move.location.x === -1 && move.location.y === 0 &&
          game.items[move.itemType]![move.itemIndex].id === LandCard.LandGreenGreen1
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.play.last" components={BaseComponents}/>,
        position: { x: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Hand)
            .player(me)
            .id(LandCard.LandYellow1)
        ],
        locations: [
          this.location(LocationType.Tableau)
            .player(me)
            .x(2)
            .y(-1)
            .location
        ],
        margin: {
          top: 5,
          bottom: 5,
          right: 35
        }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.LandCard)(move) &&
          move.location.x === 2 && move.location.y === -1 &&
          game.items[move.itemType]![move.itemIndex].id === LandCard.LandYellow1,
        interrupt: (move) => isStartRule(move) && move.id === RuleId.DesolationOfTheTzimime
      },
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.swamp.score" components={BaseComponents}/>,
        position: { x: 17 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
            .id(LandCard.LandYellow1)
        ],
        margin: {
          right: 30,
          top: 8,
          bottom: 10
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.portal" components={BaseComponents}/>,
        position: { x: 17 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
            .id(LandCard.LandYellow1),
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
            .id(LandCard.LandGreen1)
        ],
        margin: {
          right: 30,
          top: 8,
          bottom: 10
        }
      }),
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.traveler" components={BaseComponents}/>,
        position: { y: 17 },
        size: { width: 100 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.TravelerCard)
            .location(LocationType.TravelerStack)
        ],
        margin: {
          left: 5,
          right: 5,
          bottom: 15
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.traveler.choose" components={BaseComponents}/>,
        position: { y: 25 }
      },
      focus: (game) =>
        ({
          materials: [
            this.material(game, MaterialType.TravelerCard)
              .location(LocationType.TravelerStack)
              .id((id: Traveler) => id === Traveler.Kark)
          ],
          locations: [
            this
              .location(LocationType.PlayerTraveler)
              .player(me)
              .y(-0.5)
              .x(-1)
              .z(0)
              .location
          ],
          margin: {
            left: 5,
            right: 5,
            bottom: 15
          }
        }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.TravelerCard)(move) &&
          move.location.x === -1 && move.location.y === -0.5 &&
          game.items[move.itemType]![move.itemIndex].id === Traveler.Kark
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.traveler.placement" components={BaseComponents}/>,
        position: { x: 20, y: 20 },
        size: { width: 100 }
      },
      focus: (game) =>
        ({
          materials: [
            this.material(game, MaterialType.TravelerCard).player(me),
            this.material(game, MaterialType.LandCard).location(LocationType.Tableau).player(me),
          ],
          margin: {
            top: 5,
            bottom: 10,
            right: 25
          }
        }),
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.traveler.world" components={BaseComponents}/>,
        position: { x: 20, y: 20 },
        size: { width: 100 }
      },
      focus: (game) =>
        ({
          materials: [
            this.material(game, MaterialType.TravelerCard).player(me),
            this.material(game, MaterialType.LandCard).location(LocationType.Tableau).player(me),
          ],
          margin: {
            top: 5,
            bottom: 10,
            right: 25
          }
        }),
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.play.2" components={BaseComponents}/>
      }
    },
    {
      move: {
        player: florian,
        filter: (move) => isMoveItemType(MaterialType.LandCard)(move) && move.location.y === -1 && move.location.x === 1
      }
    },
    {
      move: {
        player: florian,
        filter: (move, game) =>
          isMoveItemType(MaterialType.TravelerCard)(move) &&
          move.location.x === 2 && move.location.y === -0.5 &&
          game.items[move.itemType]![move.itemIndex].id === Traveler.Boung,
        interrupt: (move) => isStartPlayerTurn(move) && move.id === RuleId.ChooseTurnOrder
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.round.2" components={BaseComponents}/>,
        position: { x: 20}
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FirstPlayerCard)
        ],
        margin: {
          top: 4,
          bottom: 5,
          right: 20
        }
      }),
      move: {}
    },
    {
      move: {
        filter: (move) => isMoveItemType(MaterialType.FirstPlayerCard)(move) && !!move.location.rotation
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.draft.r2.2" components={BaseComponents}/>
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Hand)
            .player(me)
            .id((id: LandCard) => [LandCard.Moon, LandCard.LandYellow1].includes(id))
        ],
        locations: [
          this.location(LocationType.DraftArea).player(celine).id(me).location
        ],
        margin: {
          bottom: 10,
          left: 20,
          right: 20
        }
      }),
      move: {
        player: me,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && [LandCard.Moon, LandCard.LandYellow1].includes(game.items[move.itemType]![move.itemIndex].id)
      }
    },
    {
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Hand)
            .player(me)
            .id((id: LandCard) => [LandCard.Moon, LandCard.LandYellow1].includes(id))
        ],
        locations: [
          this.location(LocationType.DraftArea).player(celine).id(me).location
        ],
        margin: {
          bottom: 10,
          left: 20,
          right: 20
        }
      }),
      move: {
        player: me,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && [LandCard.Moon, LandCard.LandYellow1].includes(game.items[move.itemType]![move.itemIndex].id)
      }
    },
    {
      move: {
        player: me
      }
    },
    {
      move: {
        player: celine,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && game.items[move.itemType]![move.itemIndex].id === LandCard.Moon
      }
    },
    {
      move: {
        player: celine,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && game.items[move.itemType]![move.itemIndex].id === LandCard.LandRedBlue1
      }
    },
    {
      move: {
        player: celine
      }
    },
    {
      move: {
        player: florian,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && game.items[move.itemType]![move.itemIndex].id === LandCard.Moon
      }
    },
    {
      move: {
        player: florian,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && game.items[move.itemType]![move.itemIndex].id === LandCard.LandGreenGreen1
      }
    },
    {
      move: {
        player: florian
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.draft.r2.1" components={BaseComponents}/>
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Hand)
            .player(me)
            .id(LandCard.LandGreenGreen1)
        ],
        locations: [
          this.location(LocationType.DraftArea).player(celine).id(me).location
        ],
        margin: {
          bottom: 10,
          left: 20,
          right: 20
        }
      }),
      move: {
        player: me,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && game.items[move.itemType]![move.itemIndex].id === LandCard.LandGreenGreen1
      }
    },
    {
      move: {
        player: me,
      }
    },
    {
      move: {
        player: celine,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && game.items[move.itemType]![move.itemIndex].id === LandCard.Moon
      }
    },
    {
      move: {
        player: celine
      }
    },
    {
      move: {
        player: florian,
        filter: (move, game) => isMoveItemType(MaterialType.LandCard)(move)
          && game.items[move.itemType]![move.itemIndex].id === LandCard.LandRedGrayGray1
      }
    },
    {
      move: {
        player: florian
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.play.2" components={BaseComponents}/>,
        position: { x: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Hand)
            .player(me)
            .id(LandCard.Moon)
        ],
        locations: [
          this.location(LocationType.Tableau)
            .player(me)
            .x(0)
            .y(-2)
            .location
        ],
        margin: {
          top: 5,
          bottom: 5,
          right: 35
        }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.LandCard)(move) &&
          move.location.x === 0 && move.location.y === -2 &&
          game.items[move.itemType]![move.itemIndex].id === LandCard.Moon
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.moon.score" components={BaseComponents}/>,
        position: { x: 17 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
            .id(LandCard.Moon)
        ],
        margin: {
          right: 30,
          top: 8,
          bottom: 10
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.moon.score.2" components={BaseComponents}/>,
        position: { x: 17 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
            .id((id: LandCard) => [LandCard.Moon, LandCard.LandGrayBlue1, LandCard.StartingGray].includes(id))
        ],
        margin: {
          right: 35,
          top: 5,
          bottom: 5
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.moon.warning" components={BaseComponents}/>,
        position: { x: 17 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
            .id(LandCard.Moon)
        ],
        margin: {
          right: 30,
          top: 8,
          bottom: 10
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.play" components={BaseComponents}/>
      }
    },
    {
      move: {
        player: celine,
        filter: (move, game) =>
          isMoveItemType(MaterialType.LandCard)(move) &&
          move.location.x === 0 && move.location.y === -2 &&
          game.items[move.itemType]![move.itemIndex].id === LandCard.Moon
      }
    },
    {
      move: {
        player: florian,
        filter: (move, game) =>
          isMoveItemType(MaterialType.LandCard)(move) &&
          move.location.x === 1 && move.location.y === -2 &&
          game.items[move.itemType]![move.itemIndex].id === LandCard.Moon
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.play.one" components={BaseComponents}/>,
        position: { x: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Hand)
            .player(me)
            .id(LandCard.LandRedGrayGray1)
        ],
        locations: [
          this.location(LocationType.Tableau)
            .player(me)
            .x(1)
            .y(0)
            .location
        ],
        margin: {
          top: 5,
          bottom: 5,
          right: 32
        }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.LandCard)(move) &&
          move.location.x === 1 && move.location.y === 0 &&
          game.items[move.itemType]![move.itemIndex].id === LandCard.LandRedGrayGray1
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.volcano" components={BaseComponents}/>,
        position: { x: 17 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
            .id(LandCard.LandRedGrayGray1)
        ],
        margin: {
          right: 30,
          top: 8,
          bottom: 10
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.fumarole.play" components={BaseComponents}/>,
        position: { x: 17, y: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
            .id(LandCard.LandGreen1),
          this.material(game, MaterialType.LandCard)
            .location(LocationType.FumaroleStack)
        ],
        margin: {
          top: 8,
          bottom: 8
        }
      }),
      move: {
        filter: (move) => isMoveItemType(MaterialType.LandCard)(move)
          && move.location.x === 1
          && move.location.y === -1
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.fumarole.cover" components={BaseComponents}/>,
        position: { x: 17 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
            .id(LandCard.Fumarole)
        ],
        margin: {
          right: 30,
          top: 8,
          bottom: 10
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.fumarole.warning" components={BaseComponents}/>,
        position: { x: 17 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
            .id(LandCard.Fumarole)
        ],
        margin: {
          right: 30,
          top: 8,
          bottom: 10
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.play" components={BaseComponents}/>
      }
    },
    {
      move: {
        player: celine,
        filter: (move, game) =>
          isMoveItemType(MaterialType.LandCard)(move) &&
          move.location.x === -1 && move.location.y === 1 &&
          game.items[move.itemType]![move.itemIndex].id === LandCard.LandYellow1
      }
    },
    {
      move: {
        player: celine,
        filter: (move, game) => {
          isMoveItemType(MaterialType.TravelerCard)(move) && console.log(move)
          return isMoveItemType(MaterialType.TravelerCard)(move) &&
            move.location.y === 0.5 &&
            game.items[move.itemType]![move.itemIndex].id === Traveler.Burk
        }
      }
    },
    {
      move: {
        player: florian,
        filter: (move, game) =>
          isMoveItemType(MaterialType.LandCard)(move) &&
          move.location.x === -1 && move.location.y === -2 &&
          game.items[move.itemType]![move.itemIndex].id === LandCard.Moon
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.play.last" components={BaseComponents}/>,
        position: { x: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Hand)
            .player(me)
            .id(LandCard.LandRedGrayGray1)
        ],
        locations: [
          this.location(LocationType.Tableau)
            .player(me)
            .x(2)
            .y(0)
            .location
        ],
        margin: {
          top: 5,
          bottom: 5,
          right: 32
        }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.LandCard)(move) &&
          move.location.x === 2 && move.location.y === 0 &&
          game.items[move.itemType]![move.itemIndex].id === LandCard.LandRedGrayGray1
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.fumarole.play.2" components={BaseComponents}/>,
        position: { x: 17, y: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
            .id(LandCard.LandYellow1),
          this.material(game, MaterialType.LandCard)
            .location(LocationType.FumaroleStack)
        ],
        margin: {
          top: 8,
          bottom: 8
        }
      }),
      move: {
        filter: (move) => isMoveItemType(MaterialType.LandCard)(move)
          && move.location.x === 2
          && move.location.y === -1
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.fumarole.dark-city" components={BaseComponents}/>,
        position: { x: 17, y: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandCard)
            .location(LocationType.Tableau)
            .player(me)
            .id(LandCard.Fumarole),
          this.material(game, MaterialType.DarkCityCard)
            .id(DarkCity.DarkCity9)
        ],
        margin: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 5
        }
      }),
      move: {
        
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.dark-city.score" components={BaseComponents}/>,
        position: { x: 17 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.DarkCityCard)
            .location(LocationType.Tableau)
            .player(me)
            .id(DarkCity.DarkCity9)
        ],
        margin: {
          right: 30,
          top: 8,
          bottom: 10
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.end.trigger" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.reminder" components={BaseComponents}/>
      }
    },
    {
      move: {
        player: celine
      }
    },
    {
      move: {
        player: florian,
        filter: (move) => isMoveItemType(MaterialType.LandCard)(move) && move.location.x === 0 && move.location.y === 1
      }
    }
  ]
}
