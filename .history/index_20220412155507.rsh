'reach 0.1';

const Player = {
  getHand: Fun([], UInt),
  seeOutcome: Fun([UInt], Null),

};

export const main = Reach.App(() => {
const Alice =
      { ...Player,
        wager: UInt };
const Bob =
      { ...Player,
        acceptWager: Fun([UInt], Null) };

// const Rex = Participant('Rex', {
//    ...Player,
//  });
//  init();

  Alice.only(() => {
    const handAlice = declassify(interact.getHand());
  });
  Alice.publish(handAlice);
  commit();

  Bob.only(() => {
    const handBob = declassify(interact.getHand());
  });
  Bob.publish(handBob);
  commit();

  Rex.only(() => {
    const handRex = declassify(interact.getHand());
  });
  Rex.publish(handRex);

 

  const outcome = (handAlice + (4 - handBob)) % 3;
  commit();

  each([Alice, Bob, Rex], () => {
    interact.seeOutcome(outcome);
  });
});
