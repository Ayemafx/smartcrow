"use client";
import { useState, useEffect } from 'react';
import Popup from '@/components/popup';
import PopupSuccess from '@/components/popupsuccess';
import { PeraWalletConnect } from "@perawallet/connect";
import { useSearchParams, useRouter } from 'next/navigation';
import * as algosdk from 'algosdk'
import axios from "axios"

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
				<button className="bg-default-bt text-default-bt-text px-4 py-2 rounded w-42 border border-default-border" onClick={refresh}>
              		Load/Refresh Info
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
                    <li>Still Active</li>
                    <li>Sales Price ($)</li>
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
    				<button className="bg-white border border-default-border hover:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg mb-4" onClick={handleWithdrawSeller}>
						<img src="/assets/images/sender.png" alt="New File Image" className="h-12 w-12" />
    				</button>
    				<p className="text-default-text">Withdraw as Sender</p>
  				</div>

          {fetching && (
            <div className="w-full sm:w-1/2 text-center mr-10">
              <p className="text-default-text">Fetching...</p>
            </div>
          )}

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