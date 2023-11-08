"use client";
import { useState, useEffect } from 'react';
import Popup from '@/components/popup';
import PopupSuccess from '@/components/popupsuccess';
import { PeraWalletConnect } from "@perawallet/connect";
import { useSearchParams } from 'next/navigation';
import * as algosdk from 'algosdk'

const zillowurl='https://api.bridgedataoutput.com/api/v2/pub/transactions?access_token=d555ec24e3f182c86561b09d0a85c3dc&limit=1&sortBy=recordingDate&order=desc&fields=recordingDate,parcels.apn,parcels.full&documentType=grant&recordingDate.gt=2015-01-01&parcels.apn=';
const axios = require('axios');
const peraWallet = new PeraWalletConnect();
const myabi = {
  "name": "Sender Funds Contract with Beaker",
  "methods": [
      {
          "name": "createFundsInfo",
          "args": [
              {
                  "type": "pay",
                  "name": "pay"
              },
              {
                  "type": "string",
                  "name": "propertyNumber"
              },
              {
                  "type": "address",
                  "name": "Receiver"
              },
              {
                  "type": "uint64",
                  "name": "startDate"
              },
              {
                  "type": "uint64",
                  "name": "endDate"
              },
              {
                  "type": "bool",
                  "name": "haveExpectedSalesPrice"
              },
              {
                  "type": "uint64",
                  "name": "expectedSalesPrice"
              }
          ],
          "returns": {
              "type": "void"
          }
      },
      {
          "name": "updateSenderFundsItem",
          "args": [
              {
                  "type": "string",
                  "name": "item_name"
              },
              {
                  "type": "bool",
                  "name": "propertySold"
              },
              {
                  "type": "bool",
                  "name": "meetSalesCondition"
              },
              {
                  "type": "bool",
                  "name": "postDeadlineCheck"
              }
          ],
          "returns": {
              "type": "(string,address,address,uint64,uint64,uint64,bool,bool,uint64,bool,bool,bool)"
          }
      },
      {
          "name": "readItem",
          "args": [
              {
                  "type": "string",
                  "name": "item_name"
              }
          ],
          "returns": {
              "type": "(string,address,address,uint64,uint64,uint64,bool,bool,uint64,bool,bool,bool)"
          }
      },
      {
          "name": "readFundsWithdrawnStatus",
          "args": [
              {
                  "type": "string",
                  "name": "item_name"
              }
          ],
          "returns": {
              "type": "bool"
          }
      },
      {
          "name": "WithdrawFundsForReceiver",
          "args": [
              {
                  "type": "string",
                  "name": "item_name"
              }
          ],
          "returns": {
              "type": "(string,address,address,uint64,uint64,uint64,bool,bool,uint64,bool,bool,bool)"
          }
      },
      {
          "name": "WithdrawFundsForSender",
          "args": [
              {
                  "type": "string",
                  "name": "item_name"
              }
          ],
          "returns": {
              "type": "(string,address,address,uint64,uint64,uint64,bool,bool,uint64,bool,bool,bool)"
          }
      }
  ],
  "networks": {}
}


async function callContract(APN, account) {
	const algodToken = '';
	const algodServer = 'https://testnet-api.algonode.cloud';
	const algodPort = undefined;
	const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

	let accountInfo = await algodClient.accountInformation(account).do();

  console.log('accountInfo:', accountInfo);

	const waitForBalance = async () => {
		accountInfo = await algodClient.accountInformation(account).do();
	
		const balance = accountInfo.amount;
	
		if (balance === 0) {
		  await waitForBalance();
		}
	};

	await waitForBalance();

	console.log(`${account} funded!`);

	const suggestedParams = await algodClient.getTransactionParams().do();
  	console.log('suggestedParams:', suggestedParams);

	const contract = new algosdk.ABIContract(myabi);
	const atc = new algosdk.AtomicTransactionComposer();

	atc.addMethodCall({
		appID: 469360340,
		method: algosdk.getMethodByName(contract.methods, 'readItem'),
		sender: account,
		suggestedParams,
		signer: async (unsignedTxns) => {
			const txnGroups = unsignedTxns.map((t) => ({txn: t, signers: [t.from]}));
			return await peraWallet.signTransaction([txnGroups]);
		},
		methodArgs: ["123456789"], // change to APN in production
		boxes: [
			{
				appIndex: 469360340,
				name: new Uint8Array(Buffer.from('123456789')) // change to APN in production
			}
		],
	});

	const results = await atc.execute(algodClient, 3);
  const resultsArray = results.methodResults[0].returnValue
  console.log(`Contract read success ` + results.methodResults[0].returnValue);
	return resultsArray
}

async function withdrawSenderPera(APN, account) {
	const algodToken = '';
	const algodServer = 'https://testnet-api.algonode.cloud';
	const algodPort = undefined;
	const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

	let accountInfo = await algodClient.accountInformation(account).do();

  	console.log('accountInfo:', accountInfo);

	const waitForBalance = async () => {
		accountInfo = await algodClient.accountInformation(account).do();
	
		const balance = accountInfo.amount;
	
		if (balance === 0) {
		  await waitForBalance();
		}
	};

	await waitForBalance();

	console.log(`${account} funded!`);

	const suggestedParams = await algodClient.getTransactionParams().do();
  	console.log('suggestedParams:', suggestedParams);

	const contract = new algosdk.ABIContract(myabi);
	const atc = new algosdk.AtomicTransactionComposer();

	atc.addMethodCall({
		appID: 469360340,
		method: algosdk.getMethodByName(contract.methods, 'WithdrawFundsForSender'),
		sender: account,
		suggestedParams,
		signer: async (unsignedTxns) => {
			const txnGroups = unsignedTxns.map((t) => ({txn: t, signers: [t.from]}));
			return await peraWallet.signTransaction([txnGroups]);
		},
		methodArgs: ["123456789"], // change to APN in production
		boxes: [
			{
				appIndex: 469360340,
				name: new Uint8Array(Buffer.from('123456789')) // change to APN in production
			}
		],
	});

	const results = await atc.execute(algodClient, 3);
  const resultsArray = results.methodResults[0].returnValue
  console.log(`Contract read success ` + results.methodResults[0].returnValue);
	return resultsArray
}

async function withdrawReceiverPera(APN, account) {
	const algodToken = '';
	const algodServer = 'https://testnet-api.algonode.cloud';
	const algodPort = undefined;
	const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

	let accountInfo = await algodClient.accountInformation(account).do();

  	console.log('accountInfo:', accountInfo);

	const waitForBalance = async () => {
		accountInfo = await algodClient.accountInformation(account).do();
	
		const balance = accountInfo.amount;
	
		if (balance === 0) {
		  await waitForBalance();
		}
	};

	await waitForBalance();

	console.log(`${account} funded!`);

	const suggestedParams = await algodClient.getTransactionParams().do();
  	console.log('suggestedParams:', suggestedParams);

	const contract = new algosdk.ABIContract(myabi);
	const atc = new algosdk.AtomicTransactionComposer();

	atc.addMethodCall({
		appID: 469360340,
		method: algosdk.getMethodByName(contract.methods, 'WithdrawFundsForReceiver'),
		sender: account,
		suggestedParams,
		signer: async (unsignedTxns) => {
			const txnGroups = unsignedTxns.map((t) => ({txn: t, signers: [t.from]}));
			return await peraWallet.signTransaction([txnGroups]);
		},
		methodArgs: ["123456789"], // change to APN in production
		boxes: [
			{
				appIndex: 469360340,
				name: new Uint8Array(Buffer.from('123456789')) // change to APN in production
			}
		],
	});

	const results = await atc.execute(algodClient, 3);
  const resultsArray = results.methodResults[0].returnValue
  console.log(`Contract read success ` + results.methodResults[0].returnValue);
	return resultsArray
}


const formatLongString = (str) => {
	if (str.length > 6) {
	  return str.slice(0, 3) + '...' + str.slice(-3);
	}
	return str;
};

const MyPage = () => {
  const [aseller, setSeller] = useState("");
  const [arealtor, setRealtor] = useState("");
  const [acontractamount, setAmount] = useState("");
  const [asellbydate, setSellbydate] = useState("");
  const [astartdate, setStartdate] = useState("");
  const [aactiveflag, setActiveFlag] = useState("");
  const [showPopup, setShowPopup] = useState(false);
	const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [popupHeader, setPopupHeader] = useState("");
	const [popupHeaderSuccess, setPopupHeaderSuccess] = useState("");
  const [popupText, setPopupText] = useState("");
  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;

  const searchParams = useSearchParams()
  const APN = searchParams.get('SelAPN');
	console.log('APN = '+APN);
	const Address = searchParams.get('Address');
  console.log('APN = '+Address);

  var notTwice = true;
	

  useEffect(() => {
		peraWallet
			.reconnectSession()
			.then((accounts) => {
				if (peraWallet.isConnected && notTwice){
          console.log(0);
          notTwice = false
					handleUpdate();
				}
				
				if (accounts.length) {
					setAccountAddress(accounts[0]);
				}
			})
			.catch((e) => console.log(e));
	}, []);

  const disconnect = async () => {
    peraWallet.disconnect();
    setAccountAddress(null);
  }

  const withdrawseller = async(APN, account) => {
    var resultarray = await callContract(APN, account)
  
    console.log('Withdraw funds');
    const today = new Date();
    console.log('Today = '+today);
    const todaytimestamp = Math.floor(today.getTime()/1000);
    console.log('Today timestamp = '+todaytimestamp);
    var finalurl=zillowurl+APN;
    var result = await axios.get(finalurl);
    console.log('Total = '+result['data']['total']);
    try{
      var resultdate=result['data']['bundle'][0]['recordingDate'];
    }
    catch{
      var resultdate='1/1/2000'
    }
    
    var resultdate2 = new Date(resultdate);
    
    var resulttimestamp = Math.floor(resultdate2.getTime()/1000);
    
    console.log(resulttimestamp);
  
    var myactive = resultarray[10]
    var mystartdate = resultarray[4]
    var mysellbydate = resultarray[5]
    var myslackdate = parseInt(mysellbydate, 10) + (30*24*3600);
    console.log('sellbydate = '+mysellbydate);
    console.log('slackdate = '+myslackdate);
  
      if (todaytimestamp<myslackdate) {
        console.log('slack time not yet passed');
        return 4;
      }
      else if (myactive==false){
        console.log('contract no longer active');
        return 3;
      }
      else if (resulttimestamp<mysellbydate && resulttimestamp>mystartdate){
        console.log('Property sold on time');
        return 5;
      }
      else {
        try {
          var receipt = await withdrawSenderPera(APN, account)
          console.log(receipt);
          return 9;
        }
        catch{
          console.log('Action cancelled');
        }
      }
  }
  
  const withdrawrealtor = async(APN, account) =>{
    console.log(APN)
    console.log(account)
    var resultarray = await callContract(APN, account)
    console.log('Withdraw funds');
    
    var finalurl=zillowurl+APN;
    var result = await axios.get(finalurl);
    
    try{
      var resultdate=result['data']['bundle'][0]['recordingDate'];
    }
    catch{
      var resultdate='1/1/2000'
    }
  
    var resultdate2 = new Date(resultdate);
    var resulttimestamp = Math.floor(resultdate2.getTime()/1000);
    
    console.log('Timestamp = '+resulttimestamp);
  
    var myactive = resultarray[10]
    var mystartdate = Number(resultarray[4])
    var mysellbydate = Number(resultarray[5])
    console.log('sellbydate = '+mysellbydate);
    console.log('slackdate = '+mystartdate);
          
      if (resulttimestamp < mystartdate) {
        console.log('record date earlier than startdate');
        return 1;
      }
      else if (resulttimestamp > mysellbydate) {
        console.log('record date later than sellbydate');
        return 2;
      }
      else if (myactive==false){
        console.log('contract no longer active');
        return 3;
      }
      else {
        try
        {
          var receipt = await withdrawReceiverPera(APN, account)
          console.log(receipt);
          return 9;
        }
        catch {
          console.log('Action cancelled');
        }
      }
  }

	const login = async () => {
		peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on("disconnect", disconnect);

        setAccountAddress(newAccounts[0]);
      })
      .catch((error) => {
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          console.log(error);
        }
      });
	}

  const refresh = async () => {
		peraWallet
			.reconnectSession()
			.then((accounts) => {
				if (peraWallet.isConnected) {
					handleUpdate();
				}
				
				if (accounts.length) {
					setAccountAddress(accounts[0]);
				}
			})
			.catch((e) => console.log(e));
	}

    const handleClosePopup = () => {
        setShowPopup(false);
      };

	  const handleClosePopupSuccess = () => {
        setShowPopupSuccess(false);
      };

    const handleWithdrawRealtor = async() => {
        var result = await withdrawrealtor(APN, accountAddress);
        console.log(result);
        if (result==1){
            setPopupHeader('Unable to withdraw');
            setPopupText('Last public record date is before contract start date');
            setShowPopup(true);
        }
		else if (result==2){
            setPopupHeader('Unable to withdraw');
            setPopupText('Last record date later than sell by date');
            setShowPopup(true);
        }
		else if (result==3){
            setPopupHeader('Unable to withdraw');
            setPopupText('Contract no longer active');
            setShowPopup(true);
        }
		else if (result==4){
            setPopupHeader('Unable to withdraw');
            setPopupText('Earliest withdraw date is 30 days after sell by date and if contract terms not met');
            setShowPopup(true);
        }
		else if (result==9){
            setPopupHeaderSuccess('Withdrawal Initiated. Final withdrawal confirmation will come from Metamask');
            setShowPopupSuccess(true);
        }
    }

	const handleWithdrawSeller = async() => {
    var result = await withdrawseller(APN, accountAddress);
    console.log(result);
    if (result==1){
      setPopupHeader('Unable to withdraw');
      setPopupText('Last public record date is before contract start date');
      setShowPopup(true);
    }
		else if (result==2){
            setPopupHeader('Unable to withdraw');
            setPopupText('Last recorded date is later than sell by date');
            setShowPopup(true);
        }
		else if (result==3){
            setPopupHeader('Unable to withdraw');
            setPopupText('Contract is no longer active');
            setShowPopup(true);
        }
		else if (result==4){
            setPopupHeader('Unable to withdraw');
            setPopupText('Earliest withdraw date is 30 days after sell by date due to processing times with county recording office');
            setShowPopup(true);
        }
		else if (result==5){
            setPopupHeader('Unable to withdraw');
            setPopupText('Last recorded date meets terms of the contract.');
            setShowPopup(true);
        }
		else if (result==9){
            setPopupHeaderSuccess('Withdrawal Initiated.');
            setShowPopupSuccess(true);
        }
    }

    const handleUpdate = async() =>{
      var resultarray = await callContract(APN, accountAddress)

      setSeller(resultarray[1]);
      setRealtor(resultarray[2]);
      setAmount(Number(resultarray[3]) / 1e6);
      var resultdate = new Date(Number(resultarray[4])*1000);
      startdate = new Date(resultdate.getTime()+36000000);
      resultarray[4]=startdate;
      var startdate = resultarray[4].toLocaleString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setStartdate(startdate);

      var resultdate2 = new Date(Number(resultarray[5])*1000);
      sellbydate = new Date(resultdate2.getTime()+36000000);
      resultarray[5]=sellbydate;
      var sellbydate = resultarray[5].toLocaleString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setSellbydate(sellbydate);

      var activeflag = resultarray[10];
      if (activeflag){
        setActiveFlag('YES');
      }
      else {
        setActiveFlag('NO');
      }
    }
    
    return (
      <div className="bg-default-bg min-h-screen">
        <nav className="bg-default-bg p-4">
          <div className="flex items-center justify-between">
		  	
            <a href="/" className="text-white font-bold text-2xl hover:text-gray-300">
				<img src="/assets/images/logo5.png" alt="Smartcrow logo" className="max-w-xs h-auto " />
			</a>
          	
      <div className="flex flex-col items-end">
				<button className="bg-default-bt text-default-bt-text font-semibold px-4 py-2 rounded border border-default-border" onClick={isConnectedToPeraWallet ? disconnect : login}>
				{isConnectedToPeraWallet ? "Disconnect Pera Wallet" : "Connect Pera Wallet"}
				</button>
				<p className="text-sm text-gray-500 mt-2">*Connect With Pera Mobile*</p>
			</div>
        </div>
        </nav>
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col gap-4">
		  	<div className="flex justify-between items-center">
            	<h2 className="text-default-text text-2xl font-bold">APN# {APN}</h2>
				<button className="bg-default-bt text-default-bt-text px-4 py-2 rounded w-32 border border-default-border" onClick={refresh}>
              		Refresh info
            	</button>
			</div>
			<textarea
                id="addresscheck"
                className="border-gray-300 bg-gray-700 text-white text-center border rounded w-full py-2 px-3 mt-1"
				defaultValue={Address}
                rows={2}
             disabled />
			
            <div className="p-6 rounded border border-default-border">
              <div className="flex  rounded px-2 py-2">
                <div className="w-1/2">
                 
                  <ul className="list-inside text-default-text">
                    <li>Amount (Algos)</li>
                    <li>Start date</li>
                    <li>Sell by</li>
                    <li>Sender Wallet</li>
                    <li>Receiver Wallet</li>
                    <li>Still active</li>
                  </ul>
                </div>
                <div className="w-1/2 text-right text-default-text">
                  
                  <ul className="list-inside">
                    <li id="contractamount">{acontractamount}</li>
                    <li>{astartdate}</li>
                    <li>{asellbydate}</li>
                    <li>{formatLongString(aseller)}</li>
                    <li>{formatLongString(arealtor)}</li>
                    <li>{aactiveflag}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-6 rounded flex justify-between">
				<div className="w-full sm:w-1/2 text-center mr-10">
    				<button className="bg-white border border-default-border hover:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg mb-4" onClick={handleWithdrawSeller}>
						<img src="/assets/images/sender.png" alt="New File Image" className="h-12 w-12" />
    				</button>
    				<p className="text-default-text">Withdraw as Sender</p>
  				</div>
				<div className="w-full sm:w-1/2 text-center mr-10">
    				<button className="bg-white border border-default-border hover:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg mb-4" onClick={handleWithdrawRealtor}>
						<img src="/assets/images/receiver.png" alt="New File Image" className="h-12 w-12" />
    				</button>
    				<p className="text-default-text">Withdraw as Receiver</p>
  				</div>
              
            </div>
          </div>
        </div>
        {showPopup && (
                <Popup header={popupHeader} text={popupText} closeModal={handleClosePopup} isOpen={showPopup}/>
                )}
		{showPopupSuccess && (
                <PopupSuccess header={popupHeaderSuccess} text={""} closeModal={handleClosePopupSuccess} isOpen={showPopupSuccess}/>
                )}
      </div>
    );
  };
  
  export default MyPage;