"use client";
import PopupInfo from '@/components/popupinfo';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PeraWalletConnect } from "@perawallet/connect";

const zillowurladdress='https://api.bridgedataoutput.com/api/v2/pub/transactions?access_token=d555ec24e3f182c86561b09d0a85c3dc&limit=1&sortBy=recordingDate&order=desc&fields=recordingDate,parcels.apn,parcels.full&parcels.apn=';
const peraWallet = new PeraWalletConnect();
const axios = require('axios');
const algosdk = require('algosdk');
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

const removeLeadingTrailingBlanksAndDashes = async (str) => {
	// Remove leading and trailing blanks and dashes
	const trimmedStr = str.replace(/(^\s+)|(\s+$)/g, '').replace(/(^-+)|(-+$)/g, '');
	// Remove dashes within the string
	const finalStr = trimmedStr.replace(/-/g, '');
	return finalStr;
};
//290-15-153

const fetch = async(APN) => {
	peraWallet
		.reconnectSession()
		.then((accounts) => {
			if (peraWallet.isConnected) {
				const server = "https://testnet-algorand.api.purestake.io/ps2";
				const port = "";
				const token = {
					'X-API-Key': '<YOUR API KEY>'
				}

				// create an algod client
				let algodClient = new algosdk.Algodv2(token, server, port);

				// define account parameters
				const senderMnemonic = "<YOUR SENDER MNEMONIC>";
				const senderAccount = algosdk.mnemonicToSecretKey(senderMnemonic);

				// define smart contract parameters
				const appId = "";
				const methodName = "increment";
				const methodArgs = []; // no method args needed here

				async function waitForConfirmation(txId) {
					let status = await algodClient.status().do();
					let lastRound = status["last-round"];
					while (true) {
						const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
						if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
							console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
							break;
						}
						lastRound++;
						await algodClient.statusAfterBlock(lastRound).do();
					}
				};

				// call smart contract
				async function callApp() {
					// get node suggested parameters
					let params = await algodClient.getTransactionParams().do();

					// create an instance of AtomicTransactionComposer
					let atc = new algosdk.AtomicTransactionComposer();

					// add a method call to the composer
					atc.addMethodCall({
						appId: appId,
						method: methodName,
						methodArgs: methodArgs,
						sender: senderAccount.addr,
						suggestedParams: params,
						signer: senderAccount.sk
					});

					// execute the composer
					let results = await atc.execute(algodClient);

					// send transaction
					txId = results.txIds[0];
					console.log("Calling app with id: " + txId);
					await algodClient.sendRawTransaction(results.signedTxs).do();

					// wait for confirmation
					await waitForConfirmation(txId);

					console.log("Called app with id: " + appId);
				};
			}
		})
		.catch((e) => console.log(e));
    
    var activeflag = false
    console.log('Active flag = '+activeflag);
    return activeflag;
}


export default function Home() {
	const [APN, setAPN] = useState("APN number");
	const [APNaddress, setAPNAddress] = useState("Address to be checked");
	const [showBalloon,setShowBalloon] = useState(false);
	const [balloonText,setBalloonText] = useState("");
	const [buttonNewContract,setbuttonNewContract] = useState(true);
	const [buttonExistingContract,setbuttonExistingContract] = useState(true);
  	const [accountAddress, setAccountAddress] = useState(null);
  	const isConnectedToPeraWallet = !!accountAddress;
  	const router = useRouter();

	useEffect(() => {
		// Reconnect to the session when the component is mounted
		peraWallet
		.reconnectSession()
		.then((accounts) => {
			if (peraWallet.isConnected) {
			peraWallet.connector.on("disconnect", disconnect);
			}
			
			if (accounts.length) {
				console.log(accounts[0])
				setAccountAddress(accounts[0]);
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

	const handleClickBalloon = () => {
		setBalloonText('Check the address of the given APN. If there is no active contract on the given APN, you can create a new contract. If there is an active contract, you can check the details of the existing contract.');
		setShowBalloon(true);
	}

	const handleCloseBalloon = () => {
		setShowBalloon(false);
	};

	const handleExistingContract = async() => {
		var data = document.getElementById("myAPNInput").value;
		data = await removeLeadingTrailingBlanksAndDashes(data);
		const data2 = document.getElementById("addresscheck").value;
		if (data=='Paste clipboard value here...'){
			return 1;
		}
		else {router.push(`/existingContract?SelAPN=${data}&Address=${data2}`);}
	};

	const handleNewContract = async() => {
		var data = document.getElementById("myAPNInput").value;
		data = await removeLeadingTrailingBlanksAndDashes(data);
		const data2 = document.getElementById("addresscheck").value;
		if (data=='Paste clipboard value here...'){
			return 1;
		}
		else {router.push(`/newContract?SelAPN=${data}&Address=${data2}`);}
	};

	const checkaddress = async()=>{
		var myAPN = document.getElementById("myAPNInput").value;
		myAPN = await removeLeadingTrailingBlanksAndDashes(myAPN);
		console.log('myAPN = '+myAPN);
		setAPN(myAPN);
		var finalurl=zillowurladdress+myAPN;
		console.log(finalurl);
		var result = await axios.get(finalurl);
		console.log(result);
		var resultdate2 = await result['data']['bundle'][0]['parcels'][0]['full'];
		console.log(resultdate2);
		setAPNAddress(resultdate2);
		console.log(APNaddress);
		const myText = document.getElementById("addresscheck");
		myText.value = resultdate2;
		var buttonresult = await fetch(myAPN);
		console.log("buttonresult = "+buttonresult)
		if (buttonresult) {
			setbuttonExistingContract(false);
			setbuttonNewContract(true);
		}
		else {
			setbuttonNewContract(false);
			setbuttonExistingContract(true);
		}
	} 

  return (
    <div className="bg-default-bg min-h-screen">
		<header className="flex items-center justify-between px-8 py-4">
			<img src="/assets/images/logo5.png" alt="Smartcrow logo" className="max-w-xs h-auto" />
			<div className="flex flex-col items-end">
				<button className="bg-default-bt text-default-bt-text font-semibold px-4 py-2 rounded border border-default-border" onClick={isConnectedToPeraWallet ? disconnect : login}>
				{isConnectedToPeraWallet ? "Disconnect Pera Wallet" : "Connect Pera Wallet"}
				</button>
				<p className="text-sm text-gray-500 mt-2">*Connect With Pera Mobile*</p>
			</div>
		</header>
		<main className="flex flex-col items-center justify-center py-16">
		  <section className="text-default-text text-center mb-8">
			
			<h1 className="text-default-text text-xl font-bold">Please enter your APN</h1>
		  </section>
		  <section className="flex items-center mb-8">
			<input
			  type="text"
			  id="myAPNInput"
			  className="w-60 bg-default-bg rounded px-4 py-2 focus:outline-none m-2 border border-default-border"
			  placeholder="Paste APN here..."
			/>
			
			</section>
			<section className="flex items-center mb-8">
			<button
			  className="bg-default-bt text-default-bt-text font-semibold px-4 py-2 rounded-full border border-default-border"
			  onClick={checkaddress}
			>
			  Check Address
			</button>
			<button className="bg-white text-blue-500 font-semibold px-2 py-2 rounded-full m-2" onClick={handleClickBalloon}>
			  	<img src="/assets/images/info.png" alt="Paste Image" className="h-5 w-5" /> 
			</button>
			
		  </section>
		  <section className="flex items-center mb-6">
		  	<textarea id="addresscheck" className="resize-none sm:w-96 h-15 px-4 py-4 text-white bg-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center" disabled placeholder='Address Will Display Here'></textarea>
		  </section>
		  <section className="flex justify-center">
		  	<div className="w-full sm:w-1/2 text-center mr-10">
    			<button className={` hover:bg-gray-200 text-white font-semibold py-3 px-6 rounded-lg mb-4  border border-default-border ${buttonNewContract? 'bg-gray-300 cursor-not-allowed' : 'bg-white'}`} onClick={handleNewContract} disabled={buttonNewContract}>
					<img src="/assets/images/newfile.png" alt="New File Image" className="h-12 w-12" />
    			</button>
    			<p className="text-default-text">New Contract</p>
				
  			</div>
  			<div className="w-full sm:w-1/2 text-center">
    			<button className={` hover:bg-gray-200 text-white font-semibold py-3 px-6 rounded-lg mb-4  border border-default-border ${buttonExistingContract? 'bg-gray-300 cursor-not-allowed' : 'bg-default-bg'}`} onClick={handleExistingContract} disabled={buttonExistingContract}>
					<img src="/assets/images/existingfile.png" alt="Existing File Image" className="h-12 w-12" />
    			</button>
    			<p className="text-default-text">Existing Contract</p>
  			</div>
		  </section>
		  <footer className="flex justify-center pt-5">
			<a href='https://www.smartcrow.info' className='font-semibold text-default-bt-text'>About Us</a>
		  </footer>
		</main>
		{showBalloon && (
      <PopupInfo text={balloonText} closeModal={handleCloseBalloon} isOpen={showBalloon}/>
    )}
	  </div>
  )
}