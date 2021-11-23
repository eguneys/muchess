import test from 'ava';

import * as pos from '../pos'

test.only('hanging piece', t => {

  let _case = '00kRi,2r1kb1r/p1q2ppp/2p1p3/3pPbP1/Q2P3P/2R2P2/PP1N4/R1B1K3 w Qk - 3 20,c3c6 c7c6 a4c6 c8c6,626,106,86,283,crushing middlegame short,https://lichess.org/KE2mWPfP#39'

  let [fen, _moves] = _case.split(',').slice(1, 3)

  let moves = _moves.split(' ').reverse()
  let drops = pos.fen_drops(fen)


  let quci = moves.pop()!

  let _drops = pos.drops_apply_uci(quci, drops)!

  pos.qxr(_drops)
  
  t.pass()
})


const puzzle20 = `
008Nz,6k1/2p2ppp/pnp5/B7/2P3PP/1P1bPPR1/r6r/3R2K1 b - - 1 29,d3e2 d1d8,600,91,83,204,backRankMate mate mateIn1 middlegame oneMove,https://lichess.org/HNU4zavC/black#58
00fgg,4r1k1/p4ppp/8/8/8/8/PP1b1PPP/K2R4 w - - 0 21,d1d2 e8e1 d2d1 e1d1,600,88,63,175,backRankMate endgame mate mateIn2 rookEndgame short,https://lichess.org/AjVJZKD1#41
00JQS,5r1k/pb3Qpp/2p5/5p2/3P4/8/PPP2PPP/4R1K1 b - - 0 21,f8f7 e1e8 f7f8 e8f8,600,86,100,589,backRankMate endgame mate mateIn2 short,https://lichess.org/jB9KjawU/black#42
00ohT,6rk/3R3p/4P2r/1p3p2/p7/P1P5/1P3RpK/4Q3 w - - 1 42,h2g1 h6h1,600,84,70,89,endgame master mate mateIn1 oneMove queenRookEndgame,https://lichess.org/oJJZtqYa#83
01337,1k1r4/ppp3r1/8/P1b5/4R3/7P/1PP5/R6K b - - 0 25,d8d2 e4e8 d2d8 e8d8,600,90,100,66,backRankMate endgame mate mateIn2 short,https://lichess.org/rf2MrMXn/black#50
01GC2,3b4/pp2kprp/8/1Bp5/4R3/1P6/P4PPP/1K6 b - - 0 22,e7f8 e4e8,600,85,100,121,endgame mate mateIn1 oneMove,https://lichess.org/6c75Zk3T/black#44
01qIp,5rk1/p5pp/2ppp3/4p2R/4N1q1/5Q2/PPP3P1/1K6 w - - 3 22,f3g4 f8f1 g4d1 f1d1,600,90,100,578,backRankMate endgame mate mateIn2 short,https://lichess.org/RquBZOf4#43
01ryh,8/5p2/4n2p/6k1/R4pP1/5P2/4K3/8 w - - 19 66,e2d3 e6c5 d3c3 c5a4,600,82,100,116,crushing endgame fork master short,https://lichess.org/vqxVCamE#131
00dpQ,6k1/5ppp/8/4rP2/1r4P1/2RK3P/8/7B b - - 0 47,b4b5 c3c8 e5e8 c8e8,605,85,83,109,backRankMate endgame mate mateIn2 short,https://lichess.org/8DGDxXX7/black#94
00JS1,2r5/1p2k1pp/4p3/1N3p2/5P2/P2nP3/1R4PP/6K1 w - - 0 24,b2d2 c8c1 d2d1 c1d1,605,94,87,503,endgame mate mateIn2 short,https://lichess.org/ROJJOhHY#47
00o7c,2r3k1/p4ppp/1pb1pq2/1P6/2Q1PP2/6P1/P5BP/2R3K1 b - - 0 24,c6b7 c4c8 b7c8 c1c8 f6d8 c8d8,609,99,93,231,backRankMate endgame long mate mateIn3,https://lichess.org/3D9Cq2HT/black#48
00Xiu,8/pp3Q1p/1n2B1pk/8/6Pq/7P/PPP2P2/2K5 w - - 10 31,f2f4 h4e1,610,84,79,120,endgame mate mateIn1 oneMove,https://lichess.org/cVckB6RZ#61
01Wni,2rn2k1/p2bRppp/8/3B2N1/8/8/P4PPP/R1r3K1 w - - 0 24,a1c1 c8c1 e7e1 c1e1,619,93,83,153,backRankMate mate mateIn2 middlegame short,https://lichess.org/X6p6G1Hi#47
00wVj,5k2/R4p2/P6p/5p1N/r3p3/2p5/2P1R1P1/2K5 w - - 1 44,h5g3 a4a1,621,89,93,298,endgame mate mateIn1 oneMove,https://lichess.org/QYDDNRqv#87
00kRi,2r1kb1r/p1q2ppp/2p1p3/3pPbP1/Q2P3P/2R2P2/PP1N4/R1B1K3 w Qk - 3 20,c3c6 c7c6 a4c6 c8c6,626,106,86,283,crushing middlegame short,https://lichess.org/KE2mWPfP#39
00Rlv,r3k1nr/p1q3pp/1pb1p3/2b2p2/8/N1BQ1P2/PPP3PP/2KR3R b kq - 3 14,a8d8 d3d8 c7d8 d1d8,627,91,73,86,advantage middlegame short,https://lichess.org/DoFZ2KjY/black#28
00kQE,1rb3k1/p5pp/1p6/3R4/2B1p3/8/PP3rPP/1K5R b - - 1 26,g8h8 d5d8 f2f8 d8f8,633,101,95,383,backRankMate endgame mate mateIn2 short,https://lichess.org/X9v1Mn91/black#52
01MPw,3r4/p1k3q1/1p2p2p/2p1n1p1/2P1N3/P2R2Q1/1P3PPP/6K1 w - - 1 29,d3e3 d8d1 e3e1 d1e1,634,95,62,146,backRankMate endgame mate mateIn2 short,https://lichess.org/XVfpxq4Y#57
00A5v,4r1k1/pp1qr1p1/7p/2pPR3/2P2p2/1PQ2P2/P5PP/4R1K1 w - - 3 33,c3d2 e7e5 e1e5 e8e5,635,92,94,202,crushing endgame short,https://lichess.org/1WXk6Mn2#65
00nS6,r4rk1/5ppp/p1p2b2/3q1b2/8/5N1P/PP2QPP1/R1B1R1K1 b - - 1 19,f8e8 e2e8 a8e8 e1e8,641,106,83,83,backRankMate mate mateIn2 middlegame short,https://lichess.org/yDIcwjff/black#38
`

test.only('puzzle 20', t => {
  
  let pzs = puzzle20.trim().split('\n').map(_ => _.split(',').slice(1, 3))

  let correct: any = [],
    extra: any = [],
    none: any = []


  pzs.filter(pz => {
    let [fen, _moves] = pz

    let moves = _moves.split(' ').reverse()
    let drops = pos.fen_drops(fen)

    let question_uci = moves.pop()
    if (question_uci) {
      let _drops = pos.drops_apply_uci(question_uci, drops)!

        if (!_drops) {
          t.fail(`fail apply uci ${question_uci}`)
          return false
        }


      let answer_uci = moves.pop()!
      let info = [fen, _moves].join(',')

      let res = pos.backrank(_drops)
        .map(pos.pickupdrop_uci)


      if (res.length === 1 && res[0] === answer_uci) {
        correct.push(info)
      } else if (res.length > 1 && res.includes(answer_uci)) {
        extra.push(info, res)
      } else {
        none.push(info)
      }
    }

    return true
  })

  console.log(correct.length)
  console.log(extra)
  console.log(none)

  t.pass()


})
