import test from 'ava';

import * as pos from '../pos'

test.todo('kladjs')

test('rays', t => {

  let drops = pos.fen_drops('6k1/2p2ppp/pnp5/B7/2P3PP/1P2PPR1/r3b2r/3R2K1 w - - 2 30')


  let res = pos.pickups(drops)
    .flatMap(_ => pos.backrank(_, drops))
    .map(_ => pos.pickupdrop_uci(_))

  t.pass()

})


test('backrank weak interpose', t => {


  let drops = pos.fen_drops('4r1k1/p4ppp/8/8/8/8/PP1R1PPP/K7 b - - 0 21')

  let res = pos.pickups(drops)
  .flatMap(_ => pos.backrank(_, drops))
  .map(_ => pos.pickupdrop_uci(_))

  console.log(res)

  t.pass()

})
