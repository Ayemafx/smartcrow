"use client";
import { useState, useEffect } from 'react';
import Popup from '@/components/popup';
import PopupSuccess from '@/components/popupsuccess';
import { PeraWalletConnect } from "@perawallet/connect";
import { useSearchParams, useRouter } from 'next/navigation';
import * as algosdk from 'algosdk'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTransfer} from '@fortawesome/free-solid-svg-icons';

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

	const suggestedParams = await algodClient.getTransactionParams().do();
  console.log('suggestedParams:', suggestedParams);

	const contract = new algosdk.ABIContract(myabi);
	const atc = new algosdk.AtomicTransactionComposer();

  console.log(account)

	atc.addMethodCall({
		appID: 469360340,
		method: algosdk.getMethodByName(contract.methods, 'readItem'),
		sender: account,
		suggestedParams,
		signer: async (unsignedTxns) => {
			const txnGroups = unsignedTxns.map((t) => ({txn: t, signers: [t.from]}));
			return await peraWallet.signTransaction([txnGroups]);
		},
		methodArgs: [APN],
		boxes: [
			{
				appIndex: 469360340,
				name: new Uint8Array(Buffer.from(APN))
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
		methodArgs: [APN],
		boxes: [
			{
				appIndex: 469360340,
				name: new Uint8Array(Buffer.from(APN))
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
		methodArgs: [APN], 
		boxes: [
			{
				appIndex: 469360340,
				name: new Uint8Array(Buffer.from(APN))
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
  const [asalesPrice, setSalesPrice] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [fetching, setFetch] = useState(false);
	const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [popupHeader, setPopupHeader] = useState("");
	const [popupHeaderSuccess, setPopupHeaderSuccess] = useState("");
  const [popupText, setPopupText] = useState("");
  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;

  const searchParams = useSearchParams()
  const router = useRouter();
  const APN = searchParams.get('SelAPN');
	console.log('APN = '+APN);
	const Address = searchParams.get('Address');
  console.log('Address = '+Address);

  useEffect(() => {
		peraWallet
			.reconnectSession()
			.then((accounts) => {
				if (peraWallet.isConnected) {
					setAccountAddress(accounts[0])
				}
			
			})
			.catch((e) => console.log(e));
	}, []);
	

  const disconnect = async () => {
    peraWallet.disconnect();
    setAccountAddress(null);
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

  async function updateContractInfoSeller(appID, APN){
    const apiUrl = 'https://smartcrow-oracle-testnet.onrender.com/update-contract'; 
  
    // Example data to send in the request body
    const requestData = {
      appIndex: appID,
      propertyNumber: APN,
    };
  
    // Set the headers for JSON data
    const headers = {
      'Content-Type': 'application/json',
    };
  
    // Make a POST request using Axios
    axios.post(apiUrl, requestData, { headers })
    .then(response => {
      // Handle the successful response
      console.log('Response:', response.data);
      if (response.data["meetSalesCondition"].condition) {
        withdrawSenderPera(APN, accountAddress)
        setPopupHeaderSuccess('Withdrawal Initiated. ' + response.data["meetSalesCondition"].reason);
        setShowPopupSuccess(true);
        setFetch(false)
        router.push('/');
      }
      else {
        setPopupHeader('Unable to withdraw');
        setPopupText(response.data["meetSalesCondition"].reason);
        setShowPopup(true);
        setFetch(false)
      }
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });
  }
  
  async function updateContractInfoReceiver(appID, APN){
    const apiUrl = 'https://smartcrow-oracle-testnet.onrender.com/update-contract'; 
  
    // Example data to send in the request body
    const requestData = {
      appIndex: appID,
      propertyNumber: APN,
    };
  
    // Set the headers for JSON data
    const headers = {
      'Content-Type': 'application/json',
    };
  
    // Make a POST request using Axios
    axios.post(apiUrl, requestData, { headers })
    .then(response => {
      // Handle the successful response
      console.log('Response:', response.data);
      if (response.data["meetSalesCondition"].condition) {
        withdrawReceiverPera(APN, accountAddress)
        setPopupHeaderSuccess('Withdrawal Initiated. ' + response.data["meetSalesCondition"].reason);
        setShowPopupSuccess(true);
        setFetch(false)
      }
      else {
        setPopupHeader('Unable to withdraw');
        setPopupText(response.data["meetSalesCondition"].reason);
        setShowPopup(true);
        setFetch(false)
      }
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });
  }

  const refresh = async () => {
    console.log(accountAddress)
		peraWallet
			.reconnectSession()
			.then((accounts) => {
				if (peraWallet.isConnected) {
          setAccountAddress(accounts[0])
					handleUpdate();
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
      await updateContractInfoReceiver(469360340, APN);
      setFetch(true)
    }

    const handleWithdrawSeller = async() => {
      await updateContractInfoSeller(469360340, APN);
      setFetch(true)
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

      var salesPrice = resultarray[8];
      setSalesPrice(Number(salesPrice));

      var activeflag = resultarray[10];
      if (activeflag){
        setActiveFlag('NO');
      }
      else {
        setActiveFlag('YES');
      }
  }
    
    return (
      <div className="min-h-screen">
        <div className="mx-auto px-4 py-10">
          <div className="flex flex-col gap-4">
          <div className='container flex flex-row'>
            <div className='left-side'>
                <h2 className="text-black text-2xl font-bold">APN Address: </h2>
                </div>
              <div className='right-side ml-auto'>
                <button 
	                  type="button" 
	                  onClick={refresh}
	                  className="refresh_btn flex flex-row-reverse hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/60 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55">
	              <FontAwesomeIcon icon={faArrowsRotate} style={{color: "#ffffff"}} className='' />
	            </button>
              </div>
			      </div>
      <div>
      <h1 className="text-default-text text-l font-bold bg-white p-2 border border-sky-200 rounded">{APN}</h1>
      </div>
			<textarea
                id="addresscheck"
                className="ml-0 resize-none flex-grow max-w-screen-m h-15 px-4 py-4 text-white bg-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
				defaultValue={Address}
             disabled />
			
            <div className="p-6 rounded border border border-sky-200">
              <div className="flex rounded px-2 py-2">
                <div className="w-1/2">
                 
                  <ul className="list-inside text-black">
                    <li>Amount <span className='text-default-text'>(Algos)</span>: </li>
                    <li>Start date: </li>
                    <li>Sold by: </li>
                    <li>Sender Wallet: </li>
                    <li>Receiver Wallet: </li>
                    <li>Still Active: </li>
                    <li>Sales Price <span className='text-default-text'>$</span>: </li>
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
                    <li>{asalesPrice}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-6 rounded flex justify-between">
				<div className="w-full sm:w-1/2 text-center mr-10">
    				<button className="bg-white border border-sky-200 hover:bg-gray-200 text-white font-semibold py-3 px-6 rounded-lg mb-4" onClick={handleWithdrawSeller}>
            <img src='/assets/images/send.png' className='h-10 w-10'></img>
    				</button>
    				<p className="text-default-text">Withdraw as <span><p>Sender</p></span></p>
  				</div>

          {fetching && (
            <div className="w-full sm:w-1/2 text-center mr-10">
              <p className="text-default-text">Fetching...</p>
            </div>
          )}

				<div className="w-full sm:w-1/2 text-center mr-10">
        <button className="bg-white border border-sky-200 hover:bg-gray-200 text-white font-semibold py-3 px-6 rounded-lg mb-4" onClick={handleWithdrawRealtor}>
            <img src='/assets/images/receive.png' className='h-10 w-10'></img>
    				</button>
    				<p className="text-default-text">Withdraw as <span><p>Receiver</p></span></p>
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