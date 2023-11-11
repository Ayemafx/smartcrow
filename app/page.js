"use client";
import PopupInfo from '@/components/popupinfo';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PeraWalletConnect } from "@perawallet/connect";
import * as algosdk from 'algosdk'
import _fetch from 'isomorphic-fetch';
import dotenv from 'dotenv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';


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

const Home = () => {
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
			if (!active) {
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
		const API_KEY = process.env.NEXT_PUBLIC_API_KEY
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
				console.log(json)
				const lastSaleDate = json.lastSaleDate;
				const lastSalePrice = json.lastSalePrice;
				console.log(lastSaleDate);
				console.log(lastSalePrice)
				localStorage.setItem("lastSaleDate", lastSaleDate);
				localStorage.setItem("lastSalePrice", lastSalePrice);
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
<section className='contract-wrapper'>
	<div className='mb-2 pb-20 container flex space-between flex-end'>
		<div className='flex-col flex-start pt-4 pb-0 contract-left'>
		<section className="text-left mb-4">
      <h1 className="text-xl font-bold m-2">Please Enter Your APN ID</h1>
    </section>
    <section className="flex mb-8">
      <input
        type="text"
        id="myAPNInput"
        className="w-60 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input"
        placeholder="Enter APN" required
      />
	   <button
                  type='button'
                  className='my-2 blue_btn about px-4 py-2'
				  onClick={checkaddress}
                >
                  Check Address
                </button>
	<button 
	type="button" 
	onClick={handleClickBalloon}
	className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55">
	<FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff" , fontSize: '12px'}} className='m-2 py-0' />
	</button>
    </section>
	
    <section className="flex-start mb-6 mt-0 w-120">
      <textarea
        id="addresscheck"
        className="resize-none m-2 sm:w-96 h-15 px-4 py-4 text-white bg-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
        disabled
        placeholder="Address Will Display Here"
      ></textarea>
    </section>
    <section className="flex-start">
      <div className="w-full sm:w-1/2 text-center mr-10 m-2">
        <button
          className={` hover:bg-gray-200 text-white font-semibold py-3 px-6 rounded-lg mb-4  border border-sky-200 ${buttonNewContract ? 'bg-white cursor-not-allowed' : 'bg-white'}`}
          onClick={handleNewContract}
          disabled={buttonNewContract}
        >
          <img src="/assets/images/newfile.png" alt="New File Image" className="h-12 w-12" />
        </button>
        <p className="text-default-text">New <span><p>Contract</p></span></p>
      </div>
      <div className="w-full sm:w-1/2 text-center m-2">
        <button
          className={` hover:bg-gray-200 text-white font-semibold py-3 px-6 rounded-lg mb-4  border border-sky-200 ${buttonExistingContract ? 'bg-white cursor-not-allowed' : 'bg-default-bg'}`}
          onClick={handleExistingContract}
          disabled={buttonExistingContract}
        >
          <img src="/assets/images/existingfile.png" alt="Existing File Image" className="h-12 w-12" />
        </button>
        <p className="text-default-text">Existing <span><p>Contract</p></span></p>
      </div>
    </section>
    <footer className="flex justify-start pt-5">
      <a href="https://www.smartcrow.info" className="m-2 font-semibold text-default-bt-text hover:underline">
        About Us
      </a>
    </footer>
	{showBalloon && <PopupInfo text={balloonText} closeModal={handleCloseBalloon} isOpen={showBalloon} />}
		</div>

		<div className='flex justify-center contract-right'>
			<div className='image-container overflow-hidden ml-40'>
				<img src='/assets/images/reals.jpg' className="border border-gray-500 opacity-85" style={{width: "30rem", height: "35rem", borderRadius: "15rem 15rem 0 0"}}></img>
			</div>
		</div>

	</div>
</section>
  )
}

export default Home;
