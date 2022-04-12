import React from 'react';
import AppViews from './views/AppViews';
//import DeployerViews from './views/DeployerViews';
//import AttacherViews from './views/AttacherViews';
import { renderDOM, renderView } from './views/render';
import * as backend from './build/index.main.mjs';
import { loadStdlib } from "@reach-sh/stdlib";
import './index.css';
const reach = loadStdlib(process.env);


const Outcome = ['Bob wins!', 'Draw!', 'Alice wins!'];
const {standardUnit} = reach;
const defaults = {defaultFundAmt: '12', defaultWager: '3', standardUnit};

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {view: 'ConnectAccount', ...defaults};
    }
    
    async componentDidMount() {
      const acc = await reach.getDefaultAccount();
      const balAtomic = await reach.balanceOf(acc);
      const bal = reach.formatCurrency(balAtomic, 4);
      this.setState({acc, bal});
      try {
        const faucet = await reach.getFaucet();
        this.setState({view: 'FundAccount', faucet});
      } catch (e) {
        this.setState({view: 'DeployerOrAttacher'});
      }
    }
    async fundAccount(fundAmount) {
      await reach.transfer(this.state.faucet, this.state.acc, reach.parseCurrency(fundAmount));
      this.setState({view: 'DeployerOrAttacher'});
    }
    async skipFundAccount() { this.setState({view: 'DeployerOrAttacher'}); }
    selectAttacher() { this.setState({view: 'Wrapper', ContentView: Attacher}); }
    selectDeployer() { this.setState({view: 'Wrapper', ContentView: Deployer}); }
    render() { return renderView(this, AppViews); }
}

class Player extends React.Component {

    random() { return reach.hasRandom.random(); }
    async getStep(i,j) { 
      const pa=parseInt(i);
      const po=parseInt(j);
      var step = await new Promise(resolveStep => {
        this.setState({view: 'GetStep', playable: true, pos: pa, oppoPos: po, resolveStep });
      });
      if(step === 1) step = Math.ceil(Math.random()*6);
      this.setState({view: 'WhatYouGot', step});
      return step;
    }
    seePos(i,j,k) {
      const pa=parseInt(i);
      const po=parseInt(j);
      const sa=parseInt(k);
      this.setState({view: 'WaitingForResults', pos: pa, oppoPos: po, step: sa});
    }
    seeOutcome(i,j,k) { 
      const winner=parseInt(i);
      const pa=parseInt(j);
      const pb=parseInt(k);
      this.setState({view: 'Done', outcome: Outcome[winner],pa: pa,pb: pb}); 
    }
    informTimeout() { this.setState({view: 'Timeout'}); }
    rollDice(i) { this.state.resolveStep(i ? 1:0); }
    
}


  
class Deployer extends Player {
    constructor(props) {
        super(props);
        this.state = {view: 'SetWager'};
    }
    setWager(wager) { this.setState({view: 'Deploy', wager}); }
    async deploy() {
        const ctc = this.props.acc.deploy(backend);
        this.setState({view: 'Deploying', ctc});
        this.wager = reach.parseCurrency(this.state.wager); // UInt
        backend.Alice(ctc, this);
        const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2);
        this.setState({view: 'WaitingForAttacher', ctcInfoStr});
    }
    render() { return renderView(this, DeployerViews); }
}
  
class Attacher extends Player {
    constructor(props) {
        super(props);
        this.state = {view: 'Attach'};
    }
    attach(ctcInfoStr) {
        const ctc = this.props.acc.attach(backend, JSON.parse(ctcInfoStr));
        this.setState({view: 'Attaching'});
        backend.Bob(ctc, this);
    }
    async acceptWager(wagerAtomic) {
        const wager = reach.formatCurrency(wagerAtomic, 4);
        return await new Promise(resolveAcceptedP => {
        this.setState({view: 'AcceptTerms', wager, resolveAcceptedP});
        });
    }
    termsAccepted() {
        this.state.resolveAcceptedP();
        this.setState({view: 'WaitingForTurn'});
    }
    render() { return renderView(this, AttacherViews); }
}

renderDOM(<App />);