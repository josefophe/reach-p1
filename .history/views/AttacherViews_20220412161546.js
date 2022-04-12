import React from 'react';
import PlayerViews from './PlayerViews';
const exports = {...PlayerViews};

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="Attacher">
        <h2>Attacher (Bob)</h2>
        {content}

        <button className="square">5</button><button className="square">6</button><button className="square">7</button><button className="square">8</button><button className="square">9</button><br/>
        <button className="square">4</button><button className="square">19</button><button className="square">20</button><button className="square">21</button><button className="square">10</button><br/>
        <button className="square">3</button><button className="square">18</button><button className="square">E</button><button className="square">22</button><button className="square">11</button><br/>
        <button className="square">2</button><button className="square">17</button><button className="square">24</button><button className="square">23</button><button className="square">12</button><br/>
        <button className="square">S</button><button className="square">16</button><button className="square">15</button><button className="square">14</button><button className="square">13</button><br/>
        </div>
    );
  }
}

exports.Attach = class extends React.Component {
  render() {
    const {parent} = this.props;
    const {ctcInfoStr} = this.state || {};
    return (
      <div>
        Please paste the contract info to attach to:
        <br />
        <textarea spellcheck="false"
          className='ContractInfo'
          onChange={(e) => this.setState({ctcInfoStr: e.currentTarget.value})}
          placeholder='{}'
        />
        <br />
        <button
          disabled={!ctcInfoStr}
          onClick={() => parent.attach(ctcInfoStr)}
        >Attach</button>
      </div>
    );
  }
}

exports.Attaching = class extends React.Component {
  render() {
    return (
      <div>
        Attaching, please wait...
      </div>
    );
  }
}

exports.AcceptTerms = class extends React.Component {
  render() {
    const {wager, standardUnit, parent} = this.props;
    const {disabled} = this.state || {};
    return (
      <div>
        The terms of the game are:
        <br /> Wager: {wager} {standardUnit}
        <br />
        <button
          disabled={disabled}
          onClick={() => {
            this.setState({disabled: true});
            parent.termsAccepted();
          }}
        >Accept terms and pay wager</button>
      </div>
    );
  }
}

exports.WaitingForTurn = class extends React.Component {
  render() {
    return (
      <div>
        Waiting for the other player...
        <br />Pray for good luck...
      </div>
    );
  }
}

export default exports;