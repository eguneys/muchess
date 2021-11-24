import test from 'ava';

import * as pos from '../pos'

const puzzle100 = `
01lB9,1qkr3r/pp1b2p1/5p2/3Pn2p/2Pp1B2/P2B2P1/1Q3P1P/1R3RK1 w - - 2 21,b2d4 e5f3 g1g2 f3d4 f4b8 c8b8,960,75,100,334,advantage fork long middlegame,https://lichess.org/DAhE0yC8#41
004iZ,r2r2k1/2q1bpp1/3p1n1p/1ppN4/1P1BP3/P5Q1/4RPPP/R5K1 b - - 1 20,f6d5 g3g7,963,85,97,467,kingsideAttack mate mateIn1 middlegame oneMove,https://lichess.org/dQ85JUe1/black#40
00OOp,5rk1/1bR3q1/pQ6/8/6r1/4R2P/P7/6K1 w - - 0 28,h3g4 g7g4 e3g3 g4g3,964,82,92,36,endgame mate mateIn2 short,https://lichess.org/N1WcEYJH#55
01194,5qk1/p1pb2p1/5p2/r2N1P1p/2Pp3Q/2n5/P5PP/R4RK1 w - - 0 25,h4d4 c3e2 g1h1 e2d4,965,76,100,767,crushing fork middlegame short,https://lichess.org/KqOvYIB5#49
00NOI,3r4/2k2p1p/pp2pp2/2p5/3nN3/6P1/PPP2PRP/2K5 w - - 2 23,e4f6 d4e2 c1b1 d8d1,966,89,60,32,backRankMate endgame mate mateIn2 short,https://lichess.org/Z7mmtXNG#45
01Ie5,8/3R3p/6pk/5p2/5PP1/1r5P/r2B1K2/8 b - - 0 46,b3b2 g4g5 h6h5 d7h7,967,76,98,614,deflection endgame mate mateIn2 short,https://lichess.org/MSON3n5v/black#92
01srl,2r1r3/pQ5p/5kp1/1P6/P7/8/5PPP/4R1K1 w - - 1 34,e1e8 c8c1 e8e1 c1e1,967,78,100,1120,backRankMate endgame mate mateIn2 queenRookEndgame short,https://lichess.org/T6cxLj6c#67
00Aae,1R6/1P6/4pkp1/5p2/3P3p/3KP3/8/1r6 b - - 0 43,h4h3 b8f8 f6e7 b7b8q b1b8 f8b8,968,75,87,320,advancedPawn clearance crushing endgame long promotion rookEndgame,https://lichess.org/mLIjph1r/black#86
00tdc,r1bqk1nr/ppppbppp/2n5/8/2P5/4Q3/PP2PPPP/RNB1KBNR w KQkq - 3 5,e3c3 e7b4 c1d2 b4c3,968,80,57,100,crushing opening pin short,https://lichess.org/u6d3aV84#9
00nFD,r4rk1/p1q2pb1/2p1b1pp/3np3/2B1N2P/4BP2/PPP3P1/2KRQ2R w - - 0 16,g2g4 d5e3 c4e6 e3d1,971,76,98,793,advantage master middlegame short,https://lichess.org/FeP6qhNK#31
002E4,8/8/kpq5/p4pQp/P7/7P/3r2P1/4R2K b - - 10 48,c6a4 g5d2,974,92,18,38,crushing endgame hangingPiece oneMove,https://lichess.org/JwMca3Nw/black#96
00puq,4r3/1k3pbp/1pp1q3/p3Npp1/P2P2n1/2PQ4/1P3PPP/2N1R1K1 w - - 6 33,e5f3 e6e1 f3e1 e8e1 d3f1 e1f1,975,100,93,210,crushing fork long middlegame,https://lichess.org/mp138SCG#65
01Lyl,3r1rk1/pp4b1/2p2p2/5P1p/6n1/2N2B2/PPP1Q1Pq/3RR1K1 w - - 2 26,g1f1 h2h1,975,80,97,502,mate mateIn1 middlegame oneMove,https://lichess.org/sZYNjKzl#51
00Fyu,r7/p1qbppbk/2p3p1/2pp4/4PP2/1P1P1N2/P1P3PP/3Q1RK1 b - - 2 16,d7g4 f3g5 h7g8 d1g4,977,245,-100,3,advantage discoveredAttack middlegame short,https://lichess.org/kjeZtnnv/black#32
00Keu,R7/1p3kp1/2pK3p/3p1PP1/1r1B2nP/8/1P6/8 b - - 2 39,b4d4 g5g6 f7f6 a8f8,977,76,100,132,endgame mate mateIn2 short,https://lichess.org/hCWa2OUn/black#78
00YCP,2k3nr/1ppr2pp/p3pp2/2b5/5P2/1N2nN2/PP4PP/1RB1R1K1 b - - 3 15,c5a7 c1e3 a7e3 e1e3,977,77,88,319,advantage middlegame short,https://lichess.org/UMVnTZ8x/black#30
00cud,8/5p2/6p1/1p1N1k2/1PbK4/2P3P1/8/8 b - - 0 48,c4f1 d5e3 f5e6 e3f1,978,85,95,490,crushing endgame fork master short,https://lichess.org/XdT6vR6T/black#96
00jXD,3r2k1/p4pp1/1bN2q1p/8/Q3p3/P3P2P/5PP1/2R3K1 b - - 5 31,d8c8 c6e7 f6e7 c1c8,978,79,92,269,crushing discoveredAttack endgame short,https://lichess.org/JvQRcqwH/black#62
007XE,2kr3r/p1p1bpp1/2p2n1p/8/8/1P6/P1P1RPPP/RNB3K1 w - - 1 16,e2e7 d8d1 e7e1 d1e1,979,144,69,14,backRankMate fork mate mateIn2 middlegame short,https://lichess.org/f4f7UwiT#31
00baZ,r7/8/p1k5/1p1p1pn1/3R3p/2P1P2P/5P2/R5K1 w - - 0 31,d4h4 g5f3 g1g2 f3h4,979,96,95,209,crushing endgame fork short,https://lichess.org/tNXaI1nN#61
`


const puzzle80 = `
01J5O,r4r1k/1pp1NppR/3p4/p3n3/4P3/1PPP2P1/1P1K2P1/3R4 b - - 0 22,h8h7 d1h1,921,114,100,26,anastasiaMate endgame mate mateIn1 oneMove,https://lichess.org/2DUSUcNf/black#44
01gQ1,2kr1b1r/pbp5/1pn1q1pp/3p1p2/3P4/P1P1BQ1B/1P3P1P/R3K1R1 b Q - 1 18,g6g5 h3f5 e6f5 f3f5,925,82,88,85,advantage middlegame pin short,https://lichess.org/4gkLoCF2/black#36
004nd,3q2k1/2r5/pp3p1Q/2b1n3/P3N3/2P5/1P4PP/R6K b - - 0 24,c7d7 e4f6 d8f6 h6f6,926,94,95,125,crushing fork middlegame short,https://lichess.org/IajkZZBp/black#48
01M18,r2qk2r/pp1n1pNp/2p5/2Pp4/3Pn3/1P2P3/PQ4PP/R4RK1 b kq - 0 17,e8f8 g7e6 f8e7 e6d8,927,97,93,167,advantage middlegame pin short,https://lichess.org/NMrHEcbV/black#34
01Bkb,r4rk1/ppp2ppp/3p1q2/2b1p3/2BnP3/2NP2Q1/PPP2PPP/R4RK1 w - - 2 11,c3d5 d4e2 g1h1 e2g3,929,81,96,575,crushing fork middlegame short,https://lichess.org/cdIWRW7I#21
01j49,1Rb2rk1/6p1/p2p2p1/B2P2P1/2Pp4/P6P/4Bb2/6K1 w - - 3 35,g1g2 c8h3 g2h3 f8b8,933,88,91,269,advantage discoveredAttack endgame short,https://lichess.org/CdAXuaxM#69
00IaZ,4R3/1k2R3/3K2p1/1P6/1P6/2rp3r/8/8 b - - 3 45,b7b6 e8b8,935,82,91,412,endgame master mate mateIn1 oneMove rookEndgame,https://lichess.org/MA0bo8dV/black#90
00YhS,7K/8/8/5p2/4kP2/8/6P1/8 w - - 1 62,g2g3 e4f3 h8g7 f3g3 g7f6 g3f4,935,105,54,31,crushing endgame long pawnEndgame,https://lichess.org/JnQJMMAX#123
00i7t,4r2k/p4r1p/2pp1Q2/2p5/3b1P2/3P2R1/PqPB2PP/4RK2 b - - 0 21,d4f6 e1e8 f7f8 e8f8,936,88,90,92,hangingPiece kingsideAttack mate mateIn2 middlegame short,https://lichess.org/fBWee6U4/black#42
00Ru6,3r1r2/p5kp/1p4pP/2p5/2PbBQ2/2q5/P1P1K3/5R2 b - - 0 34,g7h8 f4f8 d8f8 f1f8,938,82,80,68,mate mateIn2 middlegame short,https://lichess.org/SA1K2pZD/black#68
01nhK,4k2r/Bpp1bpp1/3p1nq1/3P4/2P1p1b1/1P3NP1/1P1NQP1P/4R1K1 b k - 1 18,e4f3 e2e7,942,87,98,184,mate mateIn1 middlegame oneMove,https://lichess.org/SMjPCzBT/black#36
01miF,8/pp6/2q1r1kp/P4p2/2p2Q2/2P3P1/5P1K/3R4 b - - 5 35,e6e4 d1d6 c6d6 f4d6,943,75,100,410,advantage endgame fork short,https://lichess.org/Q5rZ5lBG/black#70
012AZ,r1bqk2r/pp1p1ppp/2p5/4p3/1PP3n1/P1NnP1P1/3PKPBP/R1BQ3R w kq - 3 11,e2d3 g4f2 d3c2 f2d1,947,114,67,27,crushing fork middlegame short,https://lichess.org/YsPR7RYU#21
01FCo,1k2r2r/1Pp2pb1/1n1p3p/3Pq1p1/1Q1NP3/2P2P2/P4R1P/R3K3 b Q - 0 22,g7f6 d4c6 b8b7 c6e5,947,84,97,374,crushing fork middlegame short,https://lichess.org/ppE9yTN1/black#44
01MQ3,2r5/1Rb1k3/p3p2p/B5p1/2r1p3/6PP/3R1P2/6K1 b - - 0 37,c8b8 b7c7 c4c7 a5c7,947,79,97,1065,advantage endgame short,https://lichess.org/p97EKhqM/black#74
00CtS,Q5k1/5q2/p2p4/b1p1pr2/P7/6P1/4KP1R/8 b - - 3 38,g8g7 a8h8 g7g6 h8h6,948,76,99,748,endgame mate mateIn2 short,https://lichess.org/yKolw9vl/black#76
008tL,8/7k/pR5p/3p4/5r2/2P1p2P/P5P1/6K1 w - - 0 40,b6a6 e3e2 a6e6 f4f1,952,77,99,847,advancedPawn crushing endgame master rookEndgame short,https://lichess.org/yhNupFCi#79
00MWz,8/8/2B5/4pK2/3k1pPp/5n1P/8/8 b - - 3 57,f3g1 g4g5 g1e2 g5g6,955,76,100,387,crushing endgame quietMove short,https://lichess.org/1sHbVvW6/black#114
00dTO,5q2/5rk1/3p1np1/p1p5/1pP2NP1/3PNp1P/PP5K/3Q4 b - - 1 30,f6d7 f4e6 g7g8 e6f8,957,75,100,882,crushing endgame fork short,https://lichess.org/AQ7wJCy0/black#60
008oX,4r1k1/2R3pp/2p4q/1p1p4/3P4/P7/1PP2R2/1K1N4 b - - 3 32,e8e1 c7c8 e1e8 c8e8,959,75,68,215,endgame mate mateIn2 short,https://lichess.org/APGKH8YH/black#64
`

const puzzle60 = `
01Z9a,8/1p6/p3k3/6pp/5n2/P7/1P3K2/5R2 w - - 2 44,f1c1 f4d3 f2e2 d3c1,883,88,81,74,crushing endgame fork short,https://lichess.org/G0KZMdbm#87
00Ozz,3kRr2/3n1B1p/2pP4/p1n5/Ppp5/8/1P3PPP/4R1K1 b - - 8 32,f8e8 e1e8,885,95,88,180,endgame mate mateIn1 oneMove,https://lichess.org/gO3w1uZJ/black#64
01WCP,6k1/p5p1/2R3P1/3pr3/8/4P3/P7/5K2 b - - 0 32,e5e7 c6c8 e7e8 c8e8,886,99,77,44,endgame mate mateIn2 rookEndgame short,https://lichess.org/GEde9LIh/black#64
008P4,8/4k3/1p1p4/rP2p1p1/P2nP1P1/3BK3/8/R7 w - - 0 35,e3d2 d4b3 d2c3 b3a1,887,77,97,395,crushing endgame fork short,https://lichess.org/3GoHPRp3#69
01blK,8/p1P5/3p2k1/P1Pq1p1p/1P3Q1P/6P1/5RK1/1r6 w - - 3 45,g2h2 b1h1,888,83,58,147,endgame mate mateIn1 oneMove,https://lichess.org/gUVg1MDR#89
00uCX,r5k1/5pp1/q3p2p/pp1pP3/Qn1P4/7P/3B1PP1/R3N1K1 w - - 0 25,a4a5 a6a5 a1a5 a8a5,890,96,65,31,advantage middlegame short,https://lichess.org/ccpOygFq#49
01VY5,8/8/4nk1p/1p1p1p2/p2K1P2/P1PB4/1P5P/8 w - - 1 41,d4d5 e6f4 d5d4 f4d3,894,101,96,217,crushing endgame fork short,https://lichess.org/q2mlPixg#81
00rCD,1r4k1/pp3pp1/1b5p/1B3N2/1P2nP1P/P5P1/6K1/2B5 b - - 0 29,b8c8 f5e7 g8f8 e7c8,900,88,77,77,crushing endgame fork short,https://lichess.org/N5DxIuWM/black#58
01DJq,4R3/6p1/5bk1/N6p/8/1P6/6PP/3r1K2 w - - 1 45,e8e1 d1e1 f1e1 f6c3 e1d1 c3a5,902,77,100,962,attraction crushing endgame fork long,https://lichess.org/OAuPLlZG#89
01pTi,r2q2k1/5ppp/p2B4/2p5/1p1n4/6Q1/PPP3PP/2K4R w - - 1 22,d6c5 d4e2 c1b1 e2g3,906,94,95,536,crushing endgame fork short,https://lichess.org/vGBml73p#43
00ISm,5r2/4bp1k/2ppq1p1/4p1Q1/4N2P/3P4/1P1R1P2/4K1R1 b - - 0 29,e7g5 e4g5 h7h6 g5e6,907,88,84,82,crushing endgame fork short,https://lichess.org/Nx7iGvHH/black#58
00ouR,5rk1/5ppp/P2p4/3P3n/P3P3/b4P2/B3N1PP/1R4K1 w - - 2 27,b1b6 a3c5 g1f1 c5b6,908,85,38,48,advantage endgame fork short,https://lichess.org/pNbGlxRb#53
00UgJ,1r1q1rk1/1b4b1/4p1pp/3pP3/p2B2P1/3B3Q/PPP5/2KR3R w - - 0 23,d3g6 d8g5 c1b1 g5g6,911,77,96,910,advantage fork middlegame short,https://lichess.org/9kzSQDr4#45
014KA,r4rk1/5ppp/p3b3/1p2P3/3n1PP1/N6P/PP6/R1B1R1K1 w - - 0 19,c1e3 d4f3 g1f2 f3e1,911,96,94,264,advantage fork middlegame short,https://lichess.org/rYPgnIhY#37
00d5g,2b2rk1/pp4p1/2p5/4r3/2B5/1P6/P4pK1/5R2 b - - 4 32,g8h8 f1h1 c8h3 h1h3 e5h5 h3h5,912,83,93,514,endgame long mate mateIn3,https://lichess.org/Vf4zaDk5/black#64
00KYE,r1b2k1r/pp4p1/2pq2p1/3p4/3p4/1N6/PPP2PPP/R2Q1RK1 w - - 0 17,d1d4 d6h2,913,105,93,164,kingsideAttack mate mateIn1 middlegame oneMove,https://lichess.org/IOpSkMQi#33
00Vt0,1k4r1/pp3p2/3qp3/2N5/1P1bp3/P3P3/5P2/2RR1K2 b - - 1 27,d6e5 c5d7 b8a8 d7e5,917,81,98,256,advantage endgame fork short,https://lichess.org/Slko3RVs/black#54
00TxB,r2qkb1r/pp3ppp/2pp1nn1/8/4PB2/2N2B2/PPP2PPP/R2Q1RK1 w kq - 2 10,f1e1 g6f4,919,75,99,567,advantage hangingPiece oneMove opening,https://lichess.org/J5i5UOW9#19
00nlD,1r2r3/pp3pk1/2pp2p1/1P2p2p/2P1N1nq/3PP3/P2Q1PB1/1R3RK1 w - - 0 23,e4g3 h4h2,920,75,100,314,master mate mateIn1 middlegame oneMove,https://lichess.org/gFXDvLri#45
01YXn,r1bq1rk1/p4pbp/5np1/4p1B1/3p4/2N5/PPPQBPPP/2R2RK1 w - - 0 14,c3e4 f6e4 g5d8 e4d2,920,77,96,520,crushing hangingPiece middlegame short,https://lichess.org/5LNdfjMW#27
`

const puzzle0 = `
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

const puzzle20 = `
009tE,6k1/6pp/p1N2p2/1pP2bP1/5P2/8/PPP5/3K4 b - - 1 28,f6g5 c6e7 g8f7 e7f5,650,105,90,239,crushing endgame fork short,https://lichess.org/fUV1iXBx/black#56
019yp,5r1k/p1q3pp/2p1Q1p1/8/8/5RN1/P1P3P1/6K1 b - - 1 26,f8f3 e6e8 f3f8 e8f8,650,96,76,90,endgame mate mateIn2 short,https://lichess.org/gLC1NwZX/black#52
01bbw,4R3/8/2n3pp/pp6/1k6/1P1P3P/P3KP2/8 w - - 6 50,e8e6 c6d4 e2e3 d4e6,662,94,82,138,crushing endgame fork short,https://lichess.org/sDSfDAKO#99
01Egl,2k5/r5p1/2K2p1p/8/7P/p7/8/4R3 b - - 7 61,a3a2 e1e8,663,86,71,158,endgame mate mateIn1 oneMove rookEndgame,https://lichess.org/HRglcTgk/black#122
005N7,r6k/2q3pp/8/2p1n3/R1Qp4/7P/2PB1PP1/6K1 b - - 0 32,e5c4 a4a8 c7b8 a8b8,665,83,99,761,backRankMate endgame hangingPiece mate mateIn2 short,https://lichess.org/jxZhmGhg/black#64
008GK,1k1r4/ppp3p1/8/1P5p/8/P3n2P/2P1r1P1/B3NRK1 b - - 4 31,d8d1 f1f8 d1d8 f8d8,668,100,95,337,backRankMate endgame mate mateIn2 short,https://lichess.org/9vFFDYsH/black#62
0042j,3r2k1/4nppp/pq1p1b2/1p2P3/2r2P2/2P1NR2/PP1Q2BP/3R2K1 b - - 0 24,d6e5 d2d8 b6d8 d1d8,669,88,100,38,backRankMate mate mateIn2 middlegame short,https://lichess.org/DuM2FZjg/black#48
01nEK,3Q3k/1pb2rpp/p5q1/3Q3n/8/1PN1P2P/1PP3P1/R6K b - - 0 30,c7d8 d5d8 f7f8 d8f8,681,103,83,105,mate mateIn2 middlegame short,https://lichess.org/fe38YKSa/black#60
00GRa,1r3rk1/2p1Nppb/p2nq3/1p2p1Pp/4Qn1P/2P1N3/PPB2P1K/3R2R1 b - - 5 28,e6e7 e4h7,689,105,90,285,kingsideAttack mate mateIn1 middlegame oneMove,https://lichess.org/QiJhfG8J/black#56
009L0,6k1/pb2r1pN/1n4Bp/3p4/1P2pR2/P7/3R1PPP/2r3K1 w - - 2 30,d2d1 c1d1,706,146,18,18,backRankMate hangingPiece mate mateIn1 middlegame oneMove,https://lichess.org/SAhQtou2#59
0061g,6k1/pp3pp1/2p1q1Pp/3b4/8/6Q1/PB3Pp1/3RrNK1 b - - 2 27,e1d1 g3b8 e6e8 b8e8,710,91,72,247,endgame mate mateIn2 short,https://lichess.org/dJ3xEKJK/black#54
01Vbe,2r5/3Qnk1p/8/4B2b/Pp2p3/1P2P3/5PPP/3R2K1 w - - 3 32,d1d6 c8c1 d6d1 c1d1 d7d1 h5d1,716,80,100,264,advantage endgame fork long,https://lichess.org/b334W1Ga#63
00Bn4,1k6/pp6/4nNp1/P6p/3pr3/7P/3R1PPK/8 b - - 0 40,e4e5 f6d7 b8c7 d7e5,719,90,91,134,crushing endgame fork short,https://lichess.org/jvMUtZF5/black#80
01749,2r3k1/5ppp/4p3/3n4/2QB4/1r4P1/5PKP/R2q4 b - - 1 32,c8c4 a1a8 b3b8 a8b8 c4c8 b8c8,719,94,94,492,endgame long mate mateIn3,https://lichess.org/OVh3Rgxm/black#64
01Jrn,5rk1/3q1r1p/1p1bQ1p1/8/1P4R1/7P/3N2P1/5R1K w - - 5 34,e6d7 f7f1 d2f1 f8f1,732,79,100,399,mate mateIn2 middlegame short,https://lichess.org/eRVQUz9d#67
01tUB,8/8/p4k2/P2p3p/3P1K1P/8/8/8 w - - 4 48,f4f3 f6f5 f3e3 f5g4,736,102,85,266,crushing endgame pawnEndgame short zugzwang,https://lichess.org/g3LPb3Po#95
01i3C,6k1/2p2pp1/4p1np/1R6/3Pb3/2P2NB1/5PPP/r5K1 w - - 1 24,f3e1 a1e1,739,91,78,312,endgame hangingPiece mate mateIn1 oneMove,https://lichess.org/30wb4u3H#47
00DPQ,2k4r/pp3pp1/4pn2/2np2p1/8/1B1P1Pq1/PPPN1R2/R2Q3K w - - 6 20,f2h2 g3h2,743,100,84,92,kingsideAttack mate mateIn1 middlegame oneMove,https://lichess.org/AKiNfVd0#39
01h0o,5rk1/p2b3p/qp1Q1pp1/3N3n/4P3/5P2/P3N1PP/1Rr4K w - - 0 28,e2c1 a6f1,746,79,100,199,mate mateIn1 middlegame oneMove,https://lichess.org/k3tzWcrQ#55
01Dtr,b4rk1/2pn2p1/1p4q1/6N1/7Q/4B3/1P3PPP/3R2K1 w - - 6 27,d1d7 g6b1 e3c1 b1c1 d7d1 c1d1,748,79,100,210,long mate mateIn3 middlegame,https://lichess.org/ZvCTnCI7#53
`

const puzzle40 = `
00VC1,1k2r3/p2r1R2/2Q5/1p5p/P1P3p1/8/6PP/7K w - - 2 44,c6d7 e8e1 f7f1 e1f1,757,124,82,21,backRankMate endgame mate mateIn2 queenRookEndgame short,https://lichess.org/EjJXrCqs#87
0139J,r2q2rk/pp3pbn/2p1b3/3p3P/3P1Q2/2NB1P2/PPP3P1/2KR3R b - - 2 21,g7h6 f4h6 d8g5 h6g5,766,93,48,99,advantage hangingPiece middlegame short,https://lichess.org/Yv8XOEuW/black#42
010Jc,rnb1k2r/bpqp1pp1/p3p3/7p/4P1n1/1NNB3P/PPP2PP1/R1BQ1R1K w kq - 1 11,d1e2 c7h2,768,78,100,368,master mate mateIn1 oneMove opening,https://lichess.org/zDw0FRz2#21
00Ui0,r5k1/5pp1/2p5/P1N4p/2Pp1n2/1P3P2/5P1P/3R2K1 w - - 1 26,d1d4 f4e2 g1f1 e2d4,781,79,94,800,crushing endgame fork short,https://lichess.org/R2pJ0rIG#51
01P8L,3r3r/4bk2/1RQ1p3/3pP2p/P2n4/5p1P/6P1/R5K1 w - - 0 31,c6c3 d4e2 g1h2 e2c3,787,87,96,595,crushing fork middlegame short,https://lichess.org/rkvIhbCW#61
01PoF,1r4k1/1pp4p/p2p2p1/8/4r3/2b2B1P/P1P4P/1R3RK1 b - - 1 22,e4c4 f3d5 g8h8 d5c4,791,79,100,817,advantage endgame fork short,https://lichess.org/NhFPQ8Tz/black#44
01mGq,8/8/p1k3p1/P1P2p2/2K3Pp/7P/8/8 w - - 0 51,g4f5 g6f5 c4d4 f5f4,801,98,81,79,crushing defensiveMove endgame pawnEndgame short,https://lichess.org/ROGXECAH#101
01TXv,Q1bk3r/2p2pNp/8/3PP3/2p3q1/B1P5/6BP/7K w - - 3 33,a8c6 g4d1 g2f1 d1f1,804,85,78,314,mate mateIn2 middlegame short,https://lichess.org/WeILnMLY#65
00xMV,1k1r1br1/ppp5/3p1q2/4BP2/6P1/3Q1P1p/PPP5/3RR1K1 b - - 0 26,d6e5 d3d8 f6d8 d1d8,822,113,71,40,backRankMate mate mateIn2 middlegame short,https://lichess.org/WWJj7s9K/black#52
00MS3,rn1qr1k1/1p2bppp/2p2B2/p2p4/3P4/2N2N2/PPP1QPPP/2KRR3 b - - 0 12,e7f6 e2e8 d8e8 e1e8,824,83,81,120,backRankMate mate mateIn2 middlegame short,https://lichess.org/Eia6KIcR/black#24
00OPk,6rk/7p/R2N3P/1r6/1P5K/P7/8/8 b - - 4 50,b5d5 d6f7,826,79,100,664,endgame mate mateIn1 oneMove,https://lichess.org/aDJVIeGE/black#100
00Rcs,3k4/ppp2p1r/4p2P/5n2/3Pp1N1/2P2K2/P1P3P1/7R w - - 0 30,f3e4 f5g3 e4f4 g3h1,829,76,100,611,crushing endgame fork short,https://lichess.org/6z8dEdCK#59
00Ec4,2rq1r1k/p5pp/8/1p1BpPb1/2Pp2Q1/P2P2R1/6PP/R5K1 b - - 3 25,c8c7 g4g5 d8g5 g3g5,837,94,85,339,crushing middlegame short,https://lichess.org/HUFGdjKK/black#50
00KVO,4r3/p1R3p1/4r2p/3k1n2/3p4/P5B1/1P4PP/4R1K1 w - - 2 28,c7a7 e6e1 g3e1 e8e1,838,92,75,44,crushing endgame short,https://lichess.org/4wKfUa8h#55
01H0Y,r1b2rk1/p2p1pp1/1p3q1p/3Np3/1P2P3/P4P2/4Q1PP/R4R1K b - - 1 19,f6g6 d5e7 g8h7 e7g6,853,92,76,58,crushing fork middlegame short,https://lichess.org/4RkoQDEf/black#38
00X1l,5r1k/Q6p/1pb3p1/4q3/4p3/1BP2p1P/PP4P1/5RK1 b - - 0 30,f3g2 f1f8,856,93,94,291,endgame hangingPiece mate mateIn1 oneMove,https://lichess.org/IPGWdtue/black#60
00f9k,1b1r2k1/4pp1p/p1N3p1/1p6/8/PP2BN1P/6P1/6K1 b - - 0 27,d8c8 c6e7 g8f8 e7c8,858,88,84,71,crushing endgame fork short,https://lichess.org/IGibUvcX/black#54
01KQc,r1bqr1k1/1pp2ppp/1p1p4/3Ppn2/1P6/2PB1N2/P1Q2PPP/R4RK1 b - - 2 15,d8e7 d3f5 c8f5 c2f5,858,176,67,6,advantage middlegame short,https://lichess.org/elRWrVit/black#30
01382,r6k/5qp1/2pb3p/1p2P3/3P4/2P3Q1/1P4PP/5R1K w - - 0 29,f1f7 a8a1 g3e1 a1e1 f7f1 e1f1,860,110,67,30,backRankMate endgame long mate mateIn3,https://lichess.org/0nSum8Dd#57
019YE,1r5r/p1p1kppp/4p3/4P3/2B1n1K1/4P3/PP3PPP/R2R4 w - - 7 20,b2b3 e4f2 g4f3 f2d1,876,92,91,188,advantage endgame fork short,https://lichess.org/bseg167I#39
`


test('intent flee choose capture', t => {
  solve2(puzzle80, '01MQ3')
  t.pass()
})

test('puzzle 0', t => {
  solve2(puzzle0)
  t.pass()
})


test('puzzle 20', t => {
  solve2(puzzle20)
  t.pass()
})  

test('puzzle 40', t => {
  solve2(puzzle40)
  t.pass()
})  

test('puzzle 60', t => {
  solve2(puzzle60)
  t.pass()
})  

test('puzzle 80', t => {
  solve2(puzzle80)
  t.pass()
})  

test('puzzle 100', t => {
  solve2(puzzle100)
  t.pass()
})  


let puzzles = [
  puzzle0,
  puzzle20,
  puzzle40,
  puzzle60,
  puzzle80,
  puzzle100,
].map(_ => _.trim()).join('\n')
test.only('puzzles', t => {
  solve2(puzzles, '00ohT')
  t.pass()
})

function solve2(puzzle20: string, filterid?: string) {
  let pzs = puzzle20.trim().split('\n').map(_ => _.split(',').slice(0, 3))

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
        tactic = 'backrank'
        _res = pos.backrank(_drops)
      }
      
      if (_res.length === 0) {
        tactic = 'pin'
        _res = pos.pin(_drops)
      }


      if (_res.length === 0) {
        tactic = 'fork'
        _res = pos.fork(_drops)
          .filter(_ =>
            pos.c_capture(_, _drops).length === 0
          )
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
  console.log('None ', none.length, none.slice(0, 4))
  console.log('Miss ', miss.length/2, miss.slice(0, 4))
  console.log('Correct ', correct.length, tactics)
}
