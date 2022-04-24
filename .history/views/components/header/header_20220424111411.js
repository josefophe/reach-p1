import { useState, useEffect } from 'react'
import { useLocation, useHistory } from "react-router-dom";
import styles from './header.module.scss'
// import io from 'socket.io-client'
import { connect } from "react-redux";
import Actions from '../../action';
import { Button,Popover } from 'antd';
import { GetFormatAddress } from '../../util/baseUtil';
import menuArray from '../../router';
import { loadStdlib } from '@reach-sh/stdlib';

const reach = loadStdlib(process.env);

// const ioClient = io('http://localhost:4')


 function Header({account,getWalletInfo}) {

    // const [account, setAccount] = useState('')

    const { pathname, state } = useLocation();
    const history = useHistory();
    // console.log(useLocation())
    const toRouter = (e, path, currentpath) => {
        e.stopPropagation();
        path !== currentpath && history.push(path);
    };

   useEffect(()=>{
        
    // ioClient.on('message',async(payload)=>{
    //   console.log('我链接上io了吗？',payload)
    // })
   })




    const emitIoMessageHandle=()=>{
        // ioClient.emit('message',{userName:'1',message:'zai?'})
    }

    /**
     * 获取加密钱包信息
     */
    const loginAccountHandle = async () => {
        const account = await reach.getDefaultAccount();
        getWalletInfo(account)
    }

    
    
    

    return <div className={styles.header}>
        <div className={styles.headerBox}>
            <div className={styles.logoView}>
                <span>{'Wish Coin'}</span>
            </div>

            <div className={styles.menuView}>
                {menuArray.map((item, index) => {
                    return <div onClick={(e) => { toRouter(e, item.path, pathname) }} key={index}>
                        <NavItem
                            activeResult={item.path == pathname}
                            data={item} />
                    </div>
                })}
            </div>


            {/* <div className={styles.buyView}>
               <Button type={'primary'} onClick={() => { emitIoMessageHandle() }}>{'io测试'}</Button>
            </div> */}

            <div className={styles.buyView}>
                {Object.keys(account).length ?  <Popover content={<span>
                    {GetFormatAddress(account)}
                </span>}  trigger="hover">
                <span className={styles.account}>{GetFormatAddress(account,true)}</span>
    </Popover> : <Button type={'primary'} onClick={() => { loginAccountHandle() }}>{'Connect'}</Button>}
            </div>

        </div>

    </div>
}

export default connect(state => ({ ...state.home }), { ...Actions })(Header);

function NavItem({ data, activeResult }) {
    return <div
        className={activeResult ? styles.activeNavitem : styles.navitem}>
        <span className={styles.title}>{data.routerName}</span>
    </div>
}