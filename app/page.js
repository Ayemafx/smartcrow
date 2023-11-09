"use client";
import PopupInfo from '@/components/popupinfo';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PeraWalletConnect } from "@perawallet/connect";
import * as algosdk from 'algosdk'
import _fetch from 'isomorphic-fetch';
import dotenv from 'dotenv';

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


export default function Home() {
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

	async function callContract(APN, account) {
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
			method: algosdk.getMethodByName(contract.methods, 'readFundsWithdrawnStatus'),
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
	
		try {
			const results = await atc.execute(algodClient, 3);
			const active = results.methodResults[0].returnValue
			if (active) {
				setBalloonText('This contract is no longer active');
				setShowBalloon(true);
			}
			else {
				setbuttonExistingContract(false);
				setbuttonNewContract(true);
			}
		} catch (e) {
			console.log(e);
			setbuttonNewContract(false);
			setbuttonExistingContract(true);
		}
	}

	const handleClickBalloon = () => {
		setBalloonText('Check the address of the given APN. If there is no active contract on the given APN, you can create a new contract. If there is an active contract, you can check the details of the existing contract.');
		setShowBalloon(true);
	}

	const handleCloseBalloon = () => {
		setShowBalloon(false);
	};

	async function checkAPN(APN) {
		peraWallet
		.reconnectSession()
		.then((accounts) => {
			if (peraWallet.isConnected) {
				callContract(APN, accounts[0]).then((res) => {
			});
			}
			else {
				login();
			}
		})
		.catch((e) => console.log(e));

	}

	const handleExistingContract = async() => {
		var data = document.getElementById("myAPNInput").value;
		const data2 = document.getElementById("addresscheck").value;
		router.push(`/existingContract?SelAPN=${data}&Address=${data2}`);
	};

	const handleNewContract = async() => {
		var data = document.getElementById("myAPNInput").value;
		const data2 = document.getElementById("addresscheck").value;
		router.push(`/newContract?SelAPN=${data}&Address=${data2}`);
	};

	const checkaddress = async() => {
		var myAPN = document.getElementById("myAPNInput").value;
		dotenv.config()
		const API_KEY = process.env.API_KEY
		if (myAPN != "") {
			const url = `https://api.rentcast.io/v1/properties/${encodeURIComponent(myAPN)}`;

			try {
				const response = await _fetch(url, {
				method: 'GET',
				headers: {
					accept: 'application/json',
					'X-Api-Key': API_KEY,
				},
			});
		
			if (response.ok) {
				const json = await response.json();
				const myText = document.getElementById("addresscheck");
				myText.value = json.addressLine1;
				const lastSaleDate = json.lastSaleDate;
				const lastSalePrice = json.lastSalePrice;
				checkAPN(myAPN);
			} else {
				setBalloonText('No property found for the given ID');
				setShowBalloon(true);
				console.log('No property found for the given ID');
			}
			} catch (error) {
				console.log('Error fetching property information: ' + error.message);
			}
		}
		else {
			setBalloonText('Please enter an APN');
			setShowBalloon(true);
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
			
			<h1 className="text-default-text text-xl font-bold">Please enter your APN ID</h1>
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
