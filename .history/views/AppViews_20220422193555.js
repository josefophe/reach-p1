import React from 'react';
import { Layout } from './components/layout/Layout';
import { Button } from './components/Button/Button';
import { GameRules } from './components/GameRules/GameRules';
import Modal from "./components/Modal/Modal";
import rule from "./css/game.scss";

const exports = {};

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="App">
        <header className="App-header" id="root">
          <h1>Hidden Traitor</h1>
          {content}
        </header>
      </div>
    );
  }
}

exports.ConnectAccount = class extends React.Component {
  render() {
    return (
      <div>
        Please wait while we connect to your account.
      </div>
    )
  }
}

exports.FundAccount = class extends React.Component {
  render() {
    const {bal, standardUnit, defaultFundAmt, parent} = this.props;
    const amt = (this.state || {}).amt || defaultFundAmt;
    return (
      <div>
        <div className={rule.modal}>
          <h2 className={rule.modal_header}>Game Rules</h2>
            <div>
              <p className={rule.modal_text}>
              At the start of a game one player is randomly assigned the traitor role while the other player get the agent role.
              <br />Each player gets to choose one of three actions each turn:
              </p>
              <ul className={rule.modal_text}>
                <li><span>Spy</span>: look at another player's role.</li>
                <li><span>Swap</span>: swap the roles of two players.</li>
                <li><span>Confirm</span>: look at your own role (it might have changed).</li>
              </ul>
              <p className={rule.modal_text}>At the end of turn 3 a voting starts where players vote on who they think the traitor is. If the traitor is the most voted player then the agents win, otherwise the traitor wins.
              </p>
            </div>
        </div>*/
        <Layout>
                <Button link={'/join'} text={'Join game'} color={'#61ca70'}/>
                <Button link={'/create'} text={'Create game'} color={'#f0b448'}/>
                <button className={s.gameRules} onClick={() => toggleModal(true)}>Game Rules</button>
                <Modal isOpen={isModalOpen} toggle={toggleModal}>
                    <GameRules/>
                    <button className={s.modal_button} onClick={() => toggleModal(false)}>Confirm</button>
                </Modal>
            </Layout>
        Balance: {bal} {standardUnit}
        <hr />
        Would you like to fund your account with additional {standardUnit}?
        <br />
        (This only works on testnet)
        <br />
        <br />
        <input
          type='number'
          placeholder={defaultFundAmt}
          onChange={(e) => this.setState({amt: e.currentTarget.value})}
        />&nbsp;&nbsp;
        <button onClick={() => parent.fundAccount(amt)}>Fund Account</button>&nbsp;&nbsp;
        <button onClick={() => parent.skipFundAccount()}>Skip</button>
      </div>
    );
  }
}

exports.DeployerOrAttacher = class extends React.Component {
  render() {
    const {parent} = this.props;
    return (
      <div>
        Please select a role:
        <br />
        <p>
          <button
            onClick={() => parent.selectDeployer()}
          >Deployer</button>
          <br /> Set the wager, deploy the contract.
        </p>
        <p>
          <button
            onClick={() => parent.selectAttacher()}
          >Attacher</button>
          <br /> Attach to the Deployer's contract.
        </p>
      </div>
    );
  }
}

export default exports;