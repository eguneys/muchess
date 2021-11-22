type Dir = -2 | -1 | 0 | 1 | 2

type VPos = [Dir, Dir]

type Proj = 1 | 2 | 3 | 4 | 5 | 6 | 7

type VMove = [Array<VPos>, Array<Proj>]

type Epos = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type Pos = [Epos, Epos]


type Ray = {
  orig: Pos,
  target: Pos,
  between: Array<Pos>
}

type Rays = Array<Ray>

type Sliding = 'r' | 'k' | 'q' | 'n' | 'b'
type Pawn = 'p'
type Role = Sliding | Pawn
type Color = 'w' | 'b'

type RoleMap<A> = {
  [key in Role]: A
}


type SlidingMap<A> = {
  [key in Sliding]: A
}

type HasRole = {
  role: Role
}

type HasColor = {
  color: Color
}

type HasOrig = {
  orig: Pos
}


type HasPickup = {
  pickup: Pickup
}

type HasDrop = {
  drop: Drop
}

type PickupAndDropBase = HasOrig & HasColor & HasRole & {}

type Drop = PickupAndDropBase & {} 
type Pickup = PickupAndDropBase & {} 


export type PickupDrop = HasPickup & HasDrop & {
  capture?: Pickup,
  blocks: Array<Drop>,
  nonblocks: Array<Pos>
}

export type Drops = Array<Drop>


type MateIn1Intent = [PickupDrop, PickupDrop]

type BlockIntent = [PickupDrop, PickupDrop]
type OpenIntent = [PickupDrop, PickupDrop]

const vrook: Array<VPos> = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
]

const vbishop: Array<VPos> = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1]
]

const vknight: Array<VPos> = [
  [-2, -1],
  [-2, 1],
  [2, -1],
  [2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2]
]


const vqueen = [...vrook, ...vbishop]
const vking = vqueen

const proj7: Array<Proj> = [1, 2, 3, 4, 5, 6, 7]
const proj1: Array<Proj> = [1]
const proj2: Array<Proj> = [1, 2]


const vmoves: SlidingMap<VMove> = {
  r: [vrook, proj7],
  q: [vqueen, proj7],
  b: [vbishop, proj7],
  n: [vknight, proj1],
  k: [vking, proj1]
}

const eposs: Array<Epos> = [1, 2, 3, 4, 5, 6, 7, 8]

const poss: Array<Pos> = eposs.flatMap(f => eposs.map<Pos>(r => [f, r]))

const roles: Array<Role> = ['p', 'q', 'b', 'n', 'r', 'k']

function opposite(w: Color = 'w') {
  return w === 'w' ? 'b' : 'w'
}
function worb(pre: boolean, w: Color = 'w'): Color {
  return pre ? w : opposite(w)
}

function is_role(_: string): _ is Role {
  return roles.includes(_ as Role)
}

function is_epos(_: number): _ is Epos {
  return 1 <= _ && _ <= 8
}

function is_proj(_: number): _ is Proj {
  return 1 <= _ && _ <= 7
}

function is_sliding(_: Role): _ is Sliding {
  return _ !== 'p'
}

export function equal(pos: Pos, other: Pos): boolean {
  return pos[0] === other[0] && pos[1] === other[1]
}

function apply_vpos(pos: Pos, vpos: VPos): Pos | undefined {
  let f = pos[0] + vpos[0],
    r = pos[1] + vpos[1]

  if (is_epos(f) && is_epos(r)) {
    return [f, r]
  }
}

export function cast_vpos(pos: Pos, vpos: VPos, proj: number): Array<Pos> {
  let next = apply_vpos(pos, vpos)
  let next_proj = proj - 1
  
  if (next && is_proj(proj)) {
    return [pos, ...cast_vpos(next, vpos, next_proj)]
  } else {
    return [pos]
  }

}

function rays(vmove: VMove): Rays {
  let [vposs, projs] = vmove

  return projs.flatMap(proj =>
    vposs.flatMap(vpos => 
      poss.flatMap(pos => {
        let rays = cast_vpos(pos, vpos, proj) 
        if (rays.length <= proj) {
          return []
        }
        let [orig, ...rest] = rays
        let [target, ...rbetween] = rest.reverse()

        return {
          orig,
          target,
          between: rbetween.reverse()
        } 
      })))
}

export const vrays: SlidingMap<Rays> = objMap(vmoves, (key, vmove) => rays(vmove))

export function drops_pickup(h: HasOrig, drops: Drops): Drops {
  return drops.filter(_ => !equal(_.orig, h.orig))
}

export function drops_drop(drop: Drop, drops: Drops): Drops {
  return [drop, ...drops]
}

export function drops_orig(orig: Pos, drops: Drops): Drop | undefined {
  return drops.filter(_ => equal(_.orig, orig))[0]
}

export function drops_turn(drops: Drops): Drops {
  return drops.map(_ => ({..._, color: opposite(_.color) }))
}

export function drops_apply_pickupanddrop(h: HasPickup & HasDrop, drops: Drops) {

  let { pickup, drop } = h

    let drops2 = drops_pickup(pickup, drops),
      drops3 = drops_drop(drop, drops2),
    drops4 = drops_turn(drops3)

    return drops4
}


export function drops_apply_uci(uci: string, drops: Drops) {
  let orig = uci_pos(uci.slice(0, 2)),
    dest = uci_pos(uci.slice(2, 4))

  if (orig && dest) {

    let pickup = drops_orig(orig, drops)

    if (!pickup) {
      return undefined
    }

    let drop = {
      orig: dest,
      role: pickup.role,
      color: pickup.color
    }
 

    return drops_apply_pickupanddrop({
      pickup,
      drop
    }, drops)
  } 
}

export function uci_pos(uci: string): Pos | undefined {
  let f = files.indexOf(uci[0]) + 1,
    r = ranks.indexOf(uci[1]) + 1

  if (is_epos(f) && is_epos(r)) {
    return [f, r]
  }
}


export function fen_drops(fen: string): Drops {

  let [poss, _scolor] = fen.split(' ')

  let scolor = worb(_scolor === 'w')

  let res = []
  let orig: Pos | undefined = [1, 8]
  let vright: VPos = [1, 0],
    vdown: VPos = [0, -1]

  for (let i = 0; i < poss.length; i++) {
    let _char = poss[i]

    if (_char === '/') {
      orig = orig && apply_vpos(orig, vdown)
      if (orig) orig[0] = 1
      continue
    }

    let idist = _char.charCodeAt(0) - '0'.charCodeAt(0)

    if (1 <= idist && idist <= 8) {
      for (let k = 0; k < idist; k++) {
        let _orig = orig && apply_vpos(orig, vright)
        if (_orig) orig = _orig
      }
      continue
    }

    let role = _char.toLowerCase(),
      color = worb(role !== _char, scolor)

    if (orig && is_role(role)) {
      

      res.push({
        orig,
        role,
        color
      })

      let _orig = orig && apply_vpos(orig, vright)
      if (_orig) orig = _orig
    }

  }

  return res
}


export function pickup_drop(pickup: Pickup, drops:Drops): Array<PickupDrop> {
  let {orig, color, role} = pickup

  if (!is_sliding(role)) {
    return []
  } 


  return vrays[role]
    .filter(_ => equal(_.orig, orig))
    .flatMap(_ => {
      let drop = {
        orig: _.target,
        color,
        role
      }

      let capture = drops_orig(_.target, drops)


      
      let blocks = _.between.flatMap(_ => {
        let res = drops_orig(_, drops)
        return !!res ? [res] : []
      })

      let nonblocks = _.between.flatMap(_ => {
        let res = drops_orig(_, drops)
        return !res ? [_] : []
      })

      return {
        pickup,
        drop,
        capture,
        blocks,
        nonblocks
      }
    })
}

function be_open(h: HasOrig, h2: HasOrig) {
  return equal(h.orig, h2.orig)
}

function be_turn(h: HasColor) {
  return h.color === 'w'
}

function be_direct(blocks: Array<Drop>) {
  return blocks.length === 0
}

function be_king(h: HasRole) {
  return h.role === 'k'
}

function be_opposite(h: HasColor, h2: HasColor) {
  return h.color !== h2.color
}


function be_block(h: Array<Pos>, h2: HasOrig) {
  return h.some(_ => equal(_, h2.orig))
}

function drop_intent(drop: Drop, drops: Drops): Array<PickupDrop> {

  let _drops = drops_drop(drop, drops)
  let pickup = drop

  return pickup_drop(pickup, _drops)
}


export function backrank(pickup: Pickup, drops: Drops): Array<MateIn1Intent> {

  let _drops = drops_pickup(pickup, drops)

  return pickup_drop(pickup, _drops)
    .filter(v =>
      (!v.capture || be_opposite(v.pickup, v.capture)) &&
        be_turn(v.pickup) &&
        be_direct(v.blocks)
    )
    .flatMap(_ => 
      drop_intent(_.drop, _drops)
      .filter(v => 
        be_direct(v.blocks) &&
        v.capture && be_opposite(v.pickup, v.capture) && be_king(v.capture))
      .map<MateIn1Intent>(_2 =>
        [_, _2])
    )
}


export function block(pickup: Pickup,
  pickdrop: PickupDrop,
  drops: Drops): Array<BlockIntent> {

    let _drops = drops_pickup(pickup, drops)

    return pickup_drop(pickup, _drops)
    .filter(v =>
      (!v.capture || be_opposite(v.pickup, v.capture)) &&
      be_turn(v.pickup) &&
      be_direct(v.blocks) &&

      be_block(pickdrop.nonblocks, v.drop)
    ).map(_2 => [_2, pickdrop])

}


export function open(pickup: Pickup,
  intentblock: PickupDrop,
  drops: Drops): Array<OpenIntent> {
    let _drops = drops_pickup(pickup, drops)
  return pickup_drop(pickup, _drops)
    .filter(v =>
      (!v.capture || be_opposite(v.pickup, v.capture)) &&
      be_turn(v.pickup) &&
      be_direct(v.blocks)
    ).flatMap(_ =>
      drop_intent(_.drop, _drops)
      .filter(v =>
        be_direct(v.blocks) &&
        be_open(v.drop, intentblock.drop))
      .map<OpenIntent>(_2 => [_, _2])
    )
  }


export function pickups(drops: Drops) {
  return drops.filter(_ => be_turn(_) && !be_king(_))
}

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8']

function pos_uci(pos: Pos) {
  return files[pos[0] - 1] + ranks[pos[1] - 1]
}

export function pickupdrop_pretty(pickupdrop: PickupDrop) {

  let { pickup, drop, capture } = pickupdrop

  let { orig, role, color } = pickup
  let { orig: dest } = drop
  let s_capture = !!capture?'x':''
  
  return role_uci(color, role) + pos_uci(orig) + s_capture + pos_uci(dest)

}

export function pickupdrop_uci(pickupdrop: PickupDrop) {

  let { pickup, drop, capture } = pickupdrop

  let { orig, role, color } = pickup
  let { orig: dest } = drop

  return pos_uci(orig) + pos_uci(dest)
}

export function ray_uci(ray: Ray) {
  return pos_uci(ray.orig) + '->' +  pos_uci(ray.target)
}

export function role_uci(color: Color, role: Role) {
  return color==='w'?role.toUpperCase(): role
}

export function pickup_uci(pickup: Pickup) {
  return role_uci(pickup.color, pickup.role)
}

function objMap(objs: any, fn: (key: any, value: any) => any): any {
  let res: any = {}

  for (let key in objs) {
    res[key] = fn(key, objs[key])
  }
  return res
}


