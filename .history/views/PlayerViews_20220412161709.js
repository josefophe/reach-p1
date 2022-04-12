import React from 'react';

const exports = {};


exports.GetStep = class extends React.Component {
  render() {
    const {parent, playable, pos, oppoPos, step} = this.props;
    return (
      <div>
        You are at {pos} now.
        <br />Your opponent is at {oppoPos}. 
        <br />
        {!playable ? 'Please wait your opponent roll the dice' : ''}
        {playable ? 'Please roll the dice' : ''}
        <br />
        <button
          disabled={!playable}
          onClick={() => parent.rollDice(1)}
        >Roll The Dice</button>
      </div>
    );
  }
}

exports.WaitingForResults = class extends React.Component {
  render() {
    const {pos, oppoPos, step} = this.props;
    return (
      <div>
        You got a {step}. You are at {pos} now.
        <br />Your opponent is at {oppoPos}. 
        <br />Waiting for your opponent roll the dice
      </div>
    );
  }
}

exports.WhatYouGot = class extends React.Component {
  render() {
    const {step} = this.props;
    return (
      <div>
        You got {step} steps. 
        <br />Waiting for your opponent roll the dice
      </div>
    );
  }
}

exports.Done = class extends React.Component {
  render() {
    const {outcome,pa,pb} = this.props;
    return (
      <div>
        Thank you for playing. The outcome of this game was:
        <br />Alice is at pos {pa}, Bob is at pos {pb}.
        <br />{outcome || 'Unknown'}
      </div>
    );
  }
}

exports.Timeout = class extends React.Component {
  render() {
    return (
      <div>
        There's been a timeout. (Someone took too long.)
      </div>
    );
  }
}

export default exports;