'reach 0.1';

const [ isHand, SPY, SWAP, CONFIRM ] = makeEnum(3);
const [ isOutcome, B_WINS, DRAW, A_WINS ] = makeEnum(3);

const winner = (handAlice, handBob) =>
  ((handAlice + (4 - handBob)) % 3);

assert(winner(SPY, SWAP) == B_WINS);
assert(winner(SWAP, SPY) == A_WINS);
assert(winner(SPY, SPY) == DRAW);

forall(UInt, handAlice =>
  forall(UInt, handBob =>
    assert(isOutcome(winner(handAlice, handBob)))));

forall(UInt, (hand) =>
  assert(winner(hand, hand) == DRAW));

const Player = {
  ...hasRandom,
  getHand: Fun([], UInt),
  seeOutcome: Fun([UInt], Null),
  informTimeout: Fun([], Null),
};

export const main = Reach.App(() => {
  const Alice = Participant('Alice', {
    ...Player,
    wager: UInt, // atomic units of currency
    deadline: UInt, // time delta (blocks/rounds)
  });
  const Bob   = Participant('Bob', {
    ...Player,
    acceptWager: Fun([UInt], Null),
  });
  init();


// Add third participant

//  const Rex   = Participant('Rex', {
//    ...Player,
//    acceptWager: Fun([UInt], Null),
//  });
//  init();

  const informTimeout = () => {
    each([Alice, Bob], () => {
      interact.informTimeout();
    });
  };

  Alice.only(() => {
<<<<<<< HEAD
    const handAlice = declassify(interact.getStep());
||||||| 51e989c
    const handAlice = declassify(interact.getHand());
=======
    const wager = declassify(interact.wager);
    const deadline = declassify(interact.deadline);
>>>>>>> 0dd3af03a88753487dec39c83c0ce000479d1239
  });
  Alice.publish(wager, deadline)
    .pay(wager);
  commit();

  Bob.only(() => {
<<<<<<< HEAD
    const handBob = declassify(interact.getStep());
||||||| 51e989c
    const handBob = declassify(interact.getHand());
=======
    interact.acceptWager(wager);
>>>>>>> 0dd3af03a88753487dec39c83c0ce000479d1239
  });
  Bob.pay(wager)
    .timeout(relativeTime(deadline), () => closeTo(Alice, informTimeout));

<<<<<<< HEAD
  /*Rex.only(() => {
    const handRex = declassify(interact.getHand());
  });
  Rex.publish(handRex);*/
||||||| 51e989c
  Rex.only(() => {
    const handRex = declassify(interact.getHand());
  });
  Rex.publish(handRex);
=======
  var outcome = DRAW;
  invariant( balance() == 2 * wager && isOutcome(outcome) );
  while ( outcome == DRAW ) {
    commit();

    Alice.only(() => {
      const _handAlice = interact.getHand();
      const [_commitAlice, _saltAlice] = makeCommitment(interact, _handAlice);
      const commitAlice = declassify(_commitAlice);
    });
    Alice.publish(commitAlice)
      .timeout(relativeTime(deadline), () => closeTo(Bob, informTimeout));
    commit();

    unknowable(Bob, Alice(_handAlice, _saltAlice));
    Bob.only(() => {
      const handBob = declassify(interact.getHand());
    });
    Bob.publish(handBob)
      .timeout(relativeTime(deadline), () => closeTo(Alice, informTimeout));
    commit();

    Alice.only(() => {
      const saltAlice = declassify(_saltAlice);
      const handAlice = declassify(_handAlice);
    });
    Alice.publish(saltAlice, handAlice)
      .timeout(relativeTime(deadline), () => closeTo(Bob, informTimeout));
    checkCommitment(commitAlice, saltAlice, handAlice);
>>>>>>> 0dd3af03a88753487dec39c83c0ce000479d1239

    outcome = winner(handAlice, handBob);
    continue;
  }

  assert(outcome == A_WINS || outcome == B_WINS);
  transfer(2 * wager).to(outcome == A_WINS ? Alice : Bob);
  commit();

  each([Alice, Bob], () => {
    interact.seeOutcome(outcome);
  });
});
