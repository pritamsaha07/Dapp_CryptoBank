import './App.css';
import {useState, useEffect } from 'react'; 
import Web3 from 'web3';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const[web3Api, setweb3Api]=useState({
    provider:null,
    web3:null,
    contract:null
  })

  useEffect(() => {
    const loadProvider=async()=>{
      
      let provider=null;
      if(window.ethereum){
        provider=window.ethereum;
      }
      if(window.web3){
        provider=window.web3.currentProvider;
      }
      else if(!process.env.production){
        provider=new Web3.provider.HttpProvider("http://localhost:7545");
      }
      const web3loader=new Web3(provider);
      const abi=[
        {
          "inputs": [],
          "name": "numofffunders",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "transfer",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "withdrawamount",
              "type": "uint256"
            }
          ],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "stateMutability": "payable",
          "type": "receive"
        }
      ]
      const address="0xAF28FdB9b26a5202e138B5f73354b0Ab075D91C5";
      const contract1= await new web3loader.eth.Contract(abi,address); 
      console.log(provider);
      setweb3Api({
        provider:provider,
        web3:web3loader,
        contract:contract1

      })
      console.log(contract1);
    }
  loadProvider();
    
  }, [])
  const[account, setaccount]=useState(null);
  useEffect(() => {
    const getAccount=async()=>{
      const account=await web3Api.web3.eth.getAccounts();
      setaccount(account[0]);
      console.log(account);
    }
    web3Api.web3 && getAccount();
}, [web3Api.web3]);


const[balance,setBalance]=useState(null);
 useEffect(() => {
  const loadbalance=async()=>{
    const balance =await web3Api.web3.eth.getBalance('0xAF28FdB9b26a5202e138B5f73354b0Ab075D91C5');
    setBalance(web3Api.web3.utils.fromWei(balance, "ether"));
    console.log(balance);
  }
  web3Api.contract && loadbalance();
}, [web3Api]);

 function transferFund(){
   window.ethereum.request({ method: 'eth_sendTransaction'})
   web3Api.web3.eth.sendTransaction({
    from: account,
    to: '0xAF28FdB9b26a5202e138B5f73354b0Ab075D91C5',
    value: '1000000000000000'
})
.then(function(receipt){
   console.log(receipt)
});
  };

function withdrawFund(){
const withdrawAmout = '1000000000000000';
 web3Api.contract.methods.withdraw(withdrawAmout).send({ from: account }).then((res)=>{
  console.log("res :>> ", res);
 });
   };

return (
  <>
  <Card> 
    <Card.Body>Pritam's Crypto Bank</Card.Body>
  </Card> 
  <div className='Body'> 
  <Card className='Balance'> <Card.Body>Balance : {balance} ETH</Card.Body>
  </Card>
  <Card className='Account'> <Card.Body>Account : {account ? account :"not connected"}</Card.Body>
  </Card>
  </div> 
  <div className='Button'> 
  <Button variant="danger" onClick={async()=>{
    const account= await window.ethereum.request({method:"eth_requestAccounts"})
    console.log(account);
  }}>Connect to metamask
  </Button>{' '}
 
 <Button variant="success" onClick={transferFund}>Transfer</Button>{' '} 
 <Button variant="warning" onClick={withdrawFund}>Withdraw</Button>{' '} 
 
</div>
  </>
  );
}

export default App;
