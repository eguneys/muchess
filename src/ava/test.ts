import test from 'ava';

import * as pos from '../pos'
import fs from 'fs'
import * as pzs from './_fixture'


function readPuzzles(): Promise<string> {
  return new Promise(resolve =>
    fs.readFile('../data/puzzle1000sorted.csv', 'utf8', (err, data) => {
      resolve(data)
    })
  )
}



test.only('all puzzles', t => {
  return readPuzzles().then((data: string) => {

    let puzzles = data.trim()
      .split('\n')
      .map(_ => _.split(',').slice(0, 3))
      .slice(100, 200)

    solve2(puzzles, '001om')

    t.pass()
  })
})


function solve2(pzs: Array<Array<string>>, filterid?: string) {

  let crash: any = [],
    correct: any = [],
    extra: any = [],
    none: any = [],
    miss: any = []

  let tactics: any = {}

  pzs.filter(pz => {
    let [id, fen, _moves] = pz

    let moves = _moves.split(' ').reverse()
    let drops = pos.fen_drops(fen)


    let question_uci = moves.pop()
    let answer_uci = moves.pop()!
    let info = [id, fen, _moves].join(',')
    let tactic: string = ''

    if (filterid && id !== filterid)return false

    if (question_uci) {

      let pd = pos.uci_pickupdrop(question_uci, drops)

      if (!pd) {
        crash.push(`fail pickupdrop question ${info}`)
        return false
      }

      let _drops = pos.drops_apply_pickupdrop(pd, drops)

      let _res: Array<pos.PickupDrop> = []

      if (_res.length === 0) {
        tactic = 'qonk'
        _res = pos.qonk(_drops)
      }

      if (_res.length === 0) {
        tactic = 'backrank'
        _res = pos.backrank(_drops)
      }

      if (_res.length === 0) {
        tactic = 'bmate'
        _res = pos.bmate(_drops)
      }



      if (_res.length === 0) {
        tactic = 'nmate'
        _res = pos.nmate(_drops)
      }




      if (_res.length === 0) {
        tactic = 'fork'
        _res = pos.fork(_drops)
          .filter(_ =>
            pos.c_capture(_, _drops).length === 0
          )
      }


      if (_res.length === 0) {
        tactic = 'xp'
        _res = pos.xp(_drops)
      }


      if (_res.length === 0) {
        tactic = 'intentx'
        _res = pos.intent_capture(pd, drops)
          .flatMap(intent => {
            let pickup = pos.intent_flee(intent, _drops)

            let __res: Array<pos.PickupDrop> = []
            if (pickup) {
              if (__res.length === 0) {
                __res = pos.fork(_drops, pickup) 
                  .filter(_ =>
                    pos.c_capture(_, _drops)
                    .filter(__ => {
                      let __drops = pos.drops_apply_pickupdrop(_, _drops)
                      return pos.c_capture(__, __drops).length > 0
                    }).length > 0
                  )
              }
            }
            return __res
          })
      }

      if (_res.length === 0) {
        tactic = 'pin'
        _res = pos.pin(_drops)
      }


      if (_res.length === 0) {
        tactic = 'discover'
        _res = pos.discover(_drops)
      }


      let res = _res.map(pos.pickupdrop_uci)

      if (res.length === 1 && res[0] === answer_uci) {
        tactics[tactic] |= 0 
        tactics[tactic]++

        correct.push(info)
      } else if (res.length > 1 && res.includes(answer_uci)) {
        extra.push(info, res)
      } else if (res.length === 0) {
        none.push(info)
      }else {
        miss.push(info, res)
      }

      return true
    }
  })

  console.log('Crash ', crash.length, crash.slice(0, 4))
  console.log('Extra ', extra.length/2, extra.slice(0, 2))
  console.log('None ', none.length, none.slice(0, 7))
  console.log('Miss ', miss.length/2, miss.slice(0, 4))
  console.log('Correct ', correct.length, tactics)
}
