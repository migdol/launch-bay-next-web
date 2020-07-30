import { UpgradeBase } from '../../../types';

const t: UpgradeBase[] = [
  {
    name: 'Agile Gunner',
    limited: 0,
    xws: 'agilegunner',
    sides: [
      {
        title: 'Agile Gunner',
        type: 'Gunner',
        ability:
          'During the End Phase, you may rotate your [Single Turret Arc] indicator.',
        slots: ['Gunner'],
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/Card_Upgrade_162.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_U_162.jpg',
        ffg: 388,
      },
    ],
    cost: {
      variable: 'size',
      values: { Small: 7, Medium: 6, Large: 5, Huge: 4 },
    },
    hyperspace: true,
    epic: true,
  },
  {
    name: 'BT-1',
    limited: 1,
    xws: 'bt1',
    sides: [
      {
        title: 'BT-1',
        type: 'Gunner',
        ability:
          'While you perform an attack, you may change 1 [Hit] result to a [Critical Hit] result for each stress token the defender has.',
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/Card_Upgrade_140.png',
        slots: ['Gunner'],
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_U_140.jpg',
        ffg: 365,
      },
    ],
    cost: { value: 2 },
    restrictions: [
      { factions: ['Scum and Villainy'], character: ['darthvader'] },
    ],
    hyperspace: true,
    epic: true,
  },
  {
    name: 'Bistan',
    limited: 1,
    xws: 'bistan',
    sides: [
      {
        title: 'Bistan',
        type: 'Gunner',
        ability:
          'After you perform a primary attack, if you are focused, you may perform a bonus [Single Turret Arc] attack against a ship you have not already attacked this round.',
        slots: ['Gunner'],
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/Card_Upgrade_95.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_U_95.jpg',
        ffg: 319,
      },
    ],
    cost: { value: 10 },
    restrictions: [{ factions: ['Rebel Alliance'] }],
    hyperspace: false,
    epic: true,
  },
  {
    name: 'Bossk',
    limited: 1,
    xws: 'bossk',
    sides: [
      {
        title: 'Bossk',
        type: 'Gunner',
        ability:
          'After you perform a primary attack that misses, if you are not stressed, you must receive 1 stress token to perform a bonus primary attack against the same target.',
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/Card_Upgrade_139.png',
        slots: ['Gunner'],
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_U_139.jpg',
        ffg: 364,
      },
    ],
    cost: { value: 9 },
    restrictions: [{ factions: ['Scum and Villainy'] }],
    hyperspace: true,
    epic: true,
  },
  {
    name: 'Dengar',
    limited: 1,
    xws: 'dengar',
    sides: [
      {
        title: 'Dengar',
        type: 'Gunner',
        ability:
          'After you defend, if the attacker is in your firing arc, you may spend 1 [Charge]. If you do, roll 1 attack die unless the attacker chooses to remove 1 green token. On a [Hit] or [Critical Hit] result, the attacker suffers 1 [Hit] damage.',
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/Card_Upgrade_141.png',
        slots: ['Gunner'],
        charges: { value: 1, recovers: 1 },
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_U_141.jpg',
        ffg: 366,
      },
    ],
    cost: { value: 6 },
    restrictions: [{ factions: ['Scum and Villainy'] }],
    hyperspace: true,
    epic: true,
  },
  {
    name: 'Ezra Bridger',
    limited: 1,
    xws: 'ezrabridger',
    sides: [
      {
        title: 'Ezra Bridger',
        type: 'Gunner',
        ability:
          'After you perform a primary attack, you may spend 1 [Force] to perform a bonus [Single Turret Arc] attack from a [Single Turret Arc] you have not attacked from this round. If you do and you are stressed, you may reroll 1 attack die.',
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/Card_Upgrade_96.png',
        slots: ['Gunner'],
        force: { value: 1, recovers: 1, side: ['light'] },
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_U_96.jpg',
        ffg: 320,
      },
    ],
    cost: { value: 12 },
    restrictions: [{ factions: ['Rebel Alliance'] }],
    hyperspace: false,
    epic: true,
  },
  {
    name: 'Fifth Brother',
    limited: 1,
    xws: 'fifthbrother',
    sides: [
      {
        title: 'Fifth Brother',
        type: 'Gunner',
        ability:
          'While you perform an attack, you may spend 1 [Force] to change 1 of your [Focus] results to a [Critical Hit] result.',
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/Card_Upgrade_122.png',
        slots: ['Gunner'],
        force: { value: 1, recovers: 1, side: ['dark'] },
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_U_122.jpg',
        ffg: 348,
      },
    ],
    cost: { value: 12 },
    restrictions: [{ factions: ['Galactic Empire'] }],
    hyperspace: true,
    epic: true,
  },
  {
    name: 'Greedo',
    limited: 1,
    xws: 'greedo',
    sides: [
      {
        title: 'Greedo',
        type: 'Gunner',
        ability:
          'While you perform an attack, you may spend 1 [Charge] to change 1 [Hit] result to a [Critical Hit] result. While you defend, if your [Charge] is active, the attacker may change 1 [Hit] result to a [Critical Hit] result.',
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/Card_Upgrade_142.png',
        slots: ['Gunner'],
        charges: { value: 1, recovers: 1 },
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_U_142.jpg',
        ffg: 367,
      },
    ],
    cost: { value: 1 },
    restrictions: [{ factions: ['Scum and Villainy'] }],
    hyperspace: false,
    epic: true,
  },
  {
    name: 'Han Solo',
    limited: 1,
    xws: 'hansolo',
    sides: [
      {
        title: 'Han Solo',
        type: 'Gunner',
        ability:
          'During the Engagement Phase, at initiative 7, you may perform a [Single Turret Arc] attack. You cannot attack from that [Single Turret Arc] again this round.',
        slots: ['Gunner'],
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/Card_Upgrade_97.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_U_97.jpg',
        ffg: 321,
      },
    ],
    cost: { value: 12 },
    restrictions: [{ factions: ['Rebel Alliance'] }],
    hyperspace: false,
    epic: true,
  },
  {
    name: 'Han Solo',
    limited: 1,
    xws: 'hansolo-gunner',
    sides: [
      {
        title: 'Han Solo',
        type: 'Gunner',
        ability: 'Before you engage, you may perform a red [Focus] action.',
        slots: ['Gunner'],
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/Card_Upgrade_163.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_U_163.jpg',
        ffg: 389,
      },
    ],
    cost: { value: 10 },
    restrictions: [{ factions: ['Scum and Villainy'] }],
    hyperspace: false,
    epic: true,
  },
  {
    name: 'Hotshot Gunner',
    limited: 0,
    xws: 'hotshotgunner',
    sides: [
      {
        title: 'Hotshot Gunner',
        type: 'Gunner',
        ability:
          'While you perform a [Single Turret Arc] attack, after the Modify Defense Dice step, the defender removes 1 focus or calculate token.',
        slots: ['Gunner'],
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/Card_Upgrade_49.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_U_49.jpg',
        ffg: 278,
      },
    ],
    cost: { value: 7 },
    hyperspace: false,
    epic: true,
  },
  {
    name: 'Luke Skywalker',
    limited: 1,
    xws: 'lukeskywalker',
    sides: [
      {
        title: 'Luke Skywalker',
        type: 'Gunner',
        ability:
          'At the start of the Engagement Phase, you may spend 1 [Force] to rotate your [Single Turret Arc] indicator.',
        slots: ['Gunner'],
        force: { value: 1, recovers: 1, side: ['light'] },
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/Card_Upgrade_98.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_U_98.jpg',
        ffg: 322,
      },
    ],
    cost: { value: 26 },
    restrictions: [{ factions: ['Rebel Alliance'] }],
    hyperspace: false,
    epic: true,
  },
  {
    name: 'Skilled Bombardier',
    limited: 0,
    xws: 'skilledbombardier',
    sides: [
      {
        title: 'Skilled Bombardier',
        type: 'Gunner',
        ability:
          'If you would drop or launch a device, you may use a template of the same bearing with a speed 1 higher or lower.',
        slots: ['Gunner'],
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/Card_Upgrade_50.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_U_50.jpg',
        ffg: 279,
      },
    ],
    cost: { value: 2 },
    hyperspace: false,
    epic: true,
  },
  {
    name: 'Special Forces Gunner',
    limited: 0,
    xws: 'specialforcesgunner',
    sides: [
      {
        title: 'Special Forces Gunner',
        type: 'Gunner',
        ability:
          'While you perform a primary [Front Arc] attack, if your [Single Turret Arc] is in your [Front Arc], you may roll 1 additional attack die. After you perform a primary [Front Arc] attack, if your [Single Turret Arc] is in your [Rear Arc], you may perform a bonus primary [Single Turret Arc] attack.',
        slots: ['Gunner'],
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/en/d3aed19c7eb6f9ebc2352ac49cdd6b87.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/b87bf63d7db6195febd879edc4880f13.jpg',
        ffg: 470,
      },
    ],
    cost: { value: 9 },
    restrictions: [{ factions: ['First Order'] }],
    hyperspace: true,
    epic: true,
  },
  {
    name: 'Veteran Tail Gunner',
    limited: 0,
    xws: 'veterantailgunner',
    sides: [
      {
        title: 'Veteran Tail Gunner',
        type: 'Gunner',
        ability:
          'After you perform a primary [Front Arc] attack, you may perform a bonus primary [Rear Arc] attack.',
        slots: ['Gunner'],
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/Card_Upgrade_51.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_U_51.jpg',
        ffg: 280,
      },
    ],
    cost: { value: 4 },
    restrictions: [{ arcs: ['Rear Arc'] }],
    hyperspace: true,
    epic: true,
  },
  {
    name: 'Veteran Turret Gunner',
    limited: 0,
    xws: 'veteranturretgunner',
    sides: [
      {
        title: 'Veteran Turret Gunner',
        type: 'Gunner',
        ability:
          'After you perform a primary attack, you may perform a bonus [Single Turret Arc] attack using a [Single Turret Arc] you did not already attack from this round.',
        slots: ['Gunner'],
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/Card_Upgrade_52.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/Card_art_XW_U_52.jpg',
        ffg: 281,
      },
    ],
    cost: {
      variable: 'size',
      values: { Small: 12, Medium: 9, Large: 7, Huge: 7 },
    },
    restrictions: [{ action: { type: 'Rotate Arc' } }],
    hyperspace: false,
    epic: true,
  },
  {
    name: 'Finn',
    limited: 1,
    xws: 'finn',
    sides: [
      {
        title: 'Finn',
        type: 'Gunner',
        ability:
          'While you defend or perform a primary attack, if the enemy ship is in your [Front Arc], you may add 1 blank result to your roll (this die can be rerolled or otherwise modified).',
        slots: ['Gunner'],
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/en/79477be319935f42270f1712cd269dff.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/7d5d0c76d3c8fdbb5ec893c270eec7b2.jpg',
        ffg: 476,
      },
    ],
    cost: { value: 10 },
    restrictions: [{ factions: ['Resistance'] }],
    hyperspace: false,
    epic: true,
  },
  {
    name: 'Paige Tico',
    limited: 1,
    xws: 'paigetico',
    sides: [
      {
        title: 'Paige Tico',
        type: 'Gunner',
        ability:
          'After you perform a primary attack, you may drop 1 bomb or rotate your [Single Turret Arc]. After you are destroyed, you may drop 1 bomb.',
        slots: ['Gunner'],
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/en/9dc15f634233b5daba107a07aa63d04c.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/a34ab7a76083f91577110d31d20b6e14.jpg',
        ffg: 477,
      },
    ],
    cost: { value: 7 },
    restrictions: [{ factions: ['Resistance'] }],
    hyperspace: false,
    epic: true,
  },
  {
    name: 'Rey',
    limited: 1,
    xws: 'rey-gunner',
    sides: [
      {
        title: 'Rey',
        type: 'Gunner',
        ability:
          'While you defend or perform an attack, if the enemy ship is in your [Single Turret Arc], you may spend 1 [Force] to change 1 of your blank results to a [Evade] or [Hit] result.',
        slots: ['Gunner'],
        force: { value: 1, recovers: 1, side: ['light'] },
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/en/e11aec8ae6ec855694947bc2f9d1917e.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/ab5eea679d5ca9369cd122bc65001119.jpg',
        ffg: 478,
      },
    ],
    restrictions: [{ factions: ['Resistance'] }],
    cost: { value: 14 },
    hyperspace: false,
    epic: true,
  },
  {
    name: 'Ahsoka Tano',
    limited: 1,
    xws: 'ahsokatano',
    sides: [
      {
        title: 'Ahsoka Tano',
        type: 'Gunner',
        ability:
          'After you execute a maneuver, you may spend 1 [Force] and choose a friendly ship at range 1-3 in your firing arc. If you do, it may perform a red [Focus] action, even while stressed.',
        slots: ['Gunner'],
        force: { value: 1, recovers: 1, side: ['light'] },
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/en/bdc101788f827aeaf2f50a513b59aa7e.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/ab5eea679d5ca9369cd122bc65001119.jpg',
        ffg: 615,
      },
    ],
    restrictions: [{ factions: ['Galactic Republic'] }],
    cost: { value: 12 },
    hyperspace: false,
    epic: true,
  },
  {
    name: 'Seventh Fleet Gunner',
    limited: 0,
    xws: 'seventhfleetgunner',
    sides: [
      {
        title: 'Seventh Fleet Gunner',
        type: 'Gunner',
        slots: ['Gunner'],
        ability:
          'While another friendly ship performs a primary attack, if the defender is in your firing arc, you may spend 1 [Charge]. If you do, the attacker rolls 1 additional die, to a maximum of 4. During the System Phase, you may gain 1 disarm token to recover 1 [Charge].',
        charges: { value: 1, recovers: 0 },
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/en/a532c1de311e8d0a288af8232495a007.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/8461a9f5c79195b802e8b04da922809f.jpg',
        ffg: 553,
      },
    ],
    restrictions: [{ factions: ['Galactic Republic'] }],
    cost: { value: 9 },
    hyperspace: true,
    epic: true,
  },
  {
    name: 'Clone Commander Cody',
    limited: 1,
    xws: 'clonecommandercody',
    sides: [
      {
        title: 'Clone Commander Cody',
        type: 'Gunner',
        slots: ['Gunner'],
        ability:
          'After you perform an attack that missed, if 1 or more [Hit]/[Critical Hit] results were neutralized, the defender gains 1 strain token.',
        image:
          'https://sb-cdn.fantasyflightgames.com/card_images/en/1da8e9de468d456f724d0c1f37e90d28.png',
        artwork:
          'https://sb-cdn.fantasyflightgames.com/card_art/209d0df0333dc348c74c0e8a760ca741.jpg',
        ffg: 552,
      },
    ],
    restrictions: [{ factions: ['Galactic Republic'] }],
    cost: { value: 4 },
    hyperspace: false,
    epic: true,
  },
];

export default t;
