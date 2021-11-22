import test from 'ava';

import * as pos from '../pos'

test.todo('kladjs')

test('rays', t => {

  let drops = pos.fen_drops('6k1/2p2ppp/pnp5/B7/2P3PP/1P2PPR1/r3b2r/3R2K1 w - - 2 30')


  let res = pos.pickups(drops)
    .flatMap(_ => pos.backrank(_, drops))

  t.pass()

})


test('backrank weak interpose', t => {


  let drops = pos.fen_drops('4r1k1/p4ppp/8/8/8/8/PP1R1PPP/K7 b - - 0 21')

  let res = pos.pickups(drops)
  .flatMap(_ => pos.backrank(_, drops))

  console.log(res)

  t.pass()

})


test.only('use moves', t => {
  let _case = '4r1k1/p4ppp/8/8/8/8/PP1b1PPP/K2R4 w - - 0 21,d1d2 e8e1 d2d1 e1d1'

  let [fen, smoves] = _case.split(',')
  let moves = smoves.split(' ').reverse()


  let question_uci = moves.pop()
  if (question_uci) {
    let _drops: pos.Drops | undefined = pos.fen_drops(fen)
    _drops = pos.drops_apply_uci(question_uci, _drops)

    if (!_drops) {
      t.fail(`fail apply uci ${question_uci}`)
      return
    }

    let drops = _drops

    let res = pos.pickups(drops)
      .flatMap(_ => pos.backrank(_, drops))
      .flatMap(_intent => {
        let [attempt, intent] = _intent
        let idrops = pos.drops_apply_pickupanddrop(attempt, drops)

        return pos.pickups(idrops)
          .flatMap(_ => pos.block(_, intent, idrops))
      }).map(_intent =>
        _intent.map(_ => pos.pickupdrop_uci(_)))

    console.log(res)

  }


  t.pass()
})

