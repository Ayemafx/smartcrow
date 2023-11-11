"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Popup from '@/components/popup';
import PopupSuccess from '@/components/popupsuccess';
import PopupInfo from '@/components/popupinfo';
import { PeraWalletConnect } from "@perawallet/connect";
import * as algosdk from 'algosdk'
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


const MyForm = () => {
  const today = new Date().toISOString().substring(0, 10); // Get today's date in yyyy-mm-dd format
	const [verificationfailed, setVerified] = useState(true);
	const [showPopup, setShowPopup] = useState(false);
	const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [popupHeader, setPopupHeader] = useState("");
	const [popupHeaderSuccess, setPopupHeaderSuccess] = useState("");
  const [popupText, setPopupText] = useState("");
	const [showBalloon,setShowBalloon] = useState(false);
	const [balloonText,setBalloonText] = useState("");
	const [accountAddress, setAccountAddress] = useState(null);
  const [isForSale, setIsForSale] = useState(true);
  const isConnectedToPeraWallet = !!accountAddress;

	useEffect(() => {
		// Reconnect to the session when the component is mounted
		peraWallet
		  .reconnectSession()
		  .then((accounts) => {
			if (peraWallet.isConnected) {
        setAccountAddress(accounts[0]);
        document.getElementById("salesprice").value = 0
			}
	  
		  })
		  .catch((e) => console.log(e));
	  }, []);

	const searchParams = useSearchParams()
  const SelAPN = searchParams.get('SelAPN');
	const Address = searchParams.get('Address');
  const router = useRouter();

	async function callBonus(account) {
		var APN = document.getElementById("parcelid").value;
		var amount = document.getElementById("bonusamount").value;
		var realtor = document.getElementById("receiverwallet").value;
		var Sellby = new Date(document.getElementById("sellbydate").value);
		var selltimestamp = Math.floor(Sellby.getTime()/1000);
		var Startby = new Date(document.getElementById("startdate").value);
		var startdatetimestamp = Math.floor(Startby.getTime()/1000);
    var salesPrice = document.getElementById("salesprice").value;

		const algodToken = '';
		const algodServer = 'https://testnet-api.algonode.cloud';
		const algodPort = undefined;
		const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

		const suggestedParams = await algodClient.getTransactionParams().do();

    salesPrice /= 1e6

		const contract = new algosdk.ABIContract(myabi);
		const atc = new algosdk.AtomicTransactionComposer();

    // Create a payment transaction object with the sender, receiver, amount, and other parameters
    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: account,
      suggestedParams: suggestedParams,
      to: algosdk.getApplicationAddress(469360340),
      amount: amount * 1e6,
    });
    
    atc.addMethodCall({
        appID: 469360340,
        method: algosdk.getMethodByName(contract.methods, 'createFundsInfo'),
        sender: account,
        suggestedParams,
        signer,
        methodArgs: [{ txn: paymentTxn, signer }, APN, realtor, startdatetimestamp, selltimestamp, isForSale, salesPrice * 1e6], // change to APN in production
        boxes: [
          {
            appIndex: 469360340,
            name: new Uint8Array(Buffer.from(APN)) // change to APN in production
          }
        ],
    });
    
		const results = await atc.execute(algodClient, 3);
		console.log(`Contract created ` + results.methodResults[0].returnValue);
		setPopupHeaderSuccess('Contract Initiated!');
		setShowPopupSuccess(true);
	}

  async function signer(unsignedTxns) {
    const signerTransactions = unsignedTxns.map(txn => {
      return {txn, signers: [algosdk.encodeAddress(txn.from.publicKey)]}
    })
    return await peraWallet.signTransaction([signerTransactions])
  }
	
	const createbonusfunc = async () => {
		peraWallet
		.reconnectSession()
		.then((accounts) => {
			if (peraWallet.isConnected) {
				callBonus(accounts[0])
			}
			else {
				login();
			}
		})
		.catch((e) => console.log(e));
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

	const disconnect = async () => {
		peraWallet.disconnect();
		setAccountAddress(null);
	}

	const handleClosePopup = () => {
        setShowPopup(false);
      };

	  const handleClosePopupSuccess = () => {
        setShowPopupSuccess(false);
		    router.push('/');
    };

	  const handleClickBalloon = () => {
		setBalloonText('The amount entered is in Algos. For a conversion to USD, please visit https://www.coinbase.com/converter/algo/usd');
		setShowBalloon(true);
	  }

	  const handleClickBalloon2 = () => {
		setBalloonText('This is the start date of the contract.');
		setShowBalloon(true);
	  }

	  const handleClickBalloon3 = () => {
		setBalloonText('This is the end date of the contract. The real property grant deed must be recorded by this date.');
		setShowBalloon(true);
	  }

	  const handleClickBalloon4 = () => {
		setBalloonText('This is the sender wallet address. This wallet address will fund the contract via PeraWallet.');
		setShowBalloon(true);
	  }

	  const handleClickBalloon5 = () => {
		setBalloonText('This is the receiver wallet address. If contract terms are met, funds will be sent to the receiver wallet address.');
		setShowBalloon(true);
	  }

    const handleClickBalloon6 = () => {
      setBalloonText('This is the sales price of the conract. Add the anticipated, future, greater than or equal to sales price of the real estate/home.');
      setShowBalloon(true);
      }

	  const handleCloseBalloon = () => {
        setShowBalloon(false);
      };

	  const handleChange = async() => {
      const verAPN= document.getElementById("parcelid").value;
      const verAmount= document.getElementById("bonusamount").value;
      const verStartdate= document.getElementById("startdate").value;
      const verSellbydate= document.getElementById("sellbydate").value;
      const verSeller = document.getElementById("senderwallet").value;
      const verRealtor = document.getElementById("receiverwallet").value;
      const salesPrice = document.getElementById("salesprice").value;

      document.getElementById("salesprice").value = localStorage.getItem("lastSalePrice");

      const dateString = localStorage.getItem("lastSaleDate");
      const originalDate = new Date(dateString);

      // Calculate 1 week before and after the original date
      const oneWeekBefore = new Date(originalDate.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtracting milliseconds for 1 week
      const oneWeekAfter = new Date(originalDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Adding milliseconds for 1 week

      // Format the dates as YYYY-MM-DD for the input values
      const formattedDateBefore = oneWeekBefore.toISOString().split('T')[0];
      const formattedDateAfter = oneWeekAfter.toISOString().split('T')[0];

      document.getElementById("startdate").value = formattedDateBefore
      document.getElementById("sellbydate").value = formattedDateAfter

      if (verAPN=="") {
        console.log('Verification failed');
        setVerified(true);
        setPopupHeader('Input verification failed');
        setPopupText('Please check input data');
        setShowPopup(true);
      }
      else if (isForSale) {
        if (verAmount==0 || verStartdate=="" || verSellbydate=="" ||verSeller=="" || verRealtor=="" || salesPrice=="") {
          setVerified(true);
        }
        else {
          setVerified(false);
        }
      }
      else {
        if (verAmount==0 || verStartdate=="" || verSellbydate=="" ||verSeller=="" || verRealtor=="") {
          setVerified(true);
        }
        else {
          setVerified(false);
        }
      }
	  }

    return (
      <div className="min-h-screen">
        <nav className="flex justify-between items-center">
		  <p className="text-black font-bold text-sm md:text-lg m-2">New Contract</p>
        </nav>
        <div className="container mx-auto pb-3">
          <div className="flex flex-col gap-0.5">
            
            <section className="flex mb-8">
      <input
        type="text"
        id="parcelid"
        className="m-2 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input max-w-screen-sm flex-grow"
        defaultValue={SelAPN}
				onChange={handleChange}
        placeholder="APN"
      />
	<button 
	type="button" 
	onClick={handleClickBalloon}
	className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55">
	<FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff" , fontSize: '12px'}} className='m-2 py-0' />
	</button>
    </section>
      <section className="flex-start m-2 mt-0">
      <textarea
        id="addresscheck"
        className="ml-0 resize-none flex-grow max-w-screen-m h-15 px-4 py-4 text-white bg-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
        disabled
        defaultValue={Address}
      ></textarea>
    </section>

      {/*amount algo*/}
      <label htmlFor="bonusamount" className="font-bold mr-4 m-2 text-black">
                Amount (ALGO)
      </label>
      <section className="flex mb-8">
        
      <input
        type="number"
        placeholder='0'
        inputMode='numeric'
        id="bonusamount"
        min="0"
        className="w-60 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input max-w-screen-sm flex-grow"
        onChange={handleChange}
      />
	<button 
	type="button" 
	onClick={handleClickBalloon}
	className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55">
	<FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff" , fontSize: '12px'}} className='m-2 py-0' />
	</button>
    </section>


  {/*dates*/}

  <div className='container flex flex-row'>
        <div className='left-date'>
        <label htmlFor="bonusamount" className="font-bold m-2 text-black">
                Start Date
      </label>
      <div className="flex items-center flex-row p-2">
      <section className="flex mb-8">
        
      <input
        type="date"
        id="startdate"
        className="max-w-screen-m flex-grow py-2 px-3 mt-1 w-60 bg-default-bg rounded focus:outline-offset-0 outline-sky-200 border APN_input"
        defaultValue={today}
        onChange={handleChange}
      />
	<button 
	onClick={handleClickBalloon2}
	className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55">
	<FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff" , fontSize: '12px'}} className='m-2 py-0' />
	</button>
    </section>
  </div>
        </div>

        <div className='right-date ml-12'>
          
      <label htmlFor="bonusamount" className="font-bold m-2 text-black">
                Sold By
      </label>
      <div className="flex items-center flex-row p-2">
      <section className="flex mb-8">
        
      <input
        type="date"
        id="sellbydate"
        className="max-w-screen-m flex-grow py-2 px-3 mt-1 w-60 bg-default-bg rounded focus:outline-offset-0 outline-sky-200 border APN_input"
        defaultValue={today}
        onChange={handleChange}
      />
	<button 
	onClick={handleClickBalloon3}
	className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55">
	<FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff" , fontSize: '12px'}} className='m-2 py-0' />
	</button>
        </section>
      </div>
    </div>
</div>


{/*Add Sales Price*/}
<label htmlFor="bonusamount" className="font-bold m-2 text-black">Add Sales Price: </label>
          <div className="flex items-center flex-row p-2">
            <div className="flex items-center">
              <label className="mr-10 m-2">
                <input
                  type="radio"
                  id="yes"
                  checked={isForSale}
                  onChange={() => {
                    setIsForSale(true)
                    handleChange()
                    console.log("handle change2")
                  }}
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  id="no"
                  checked={!isForSale}
                  onChange={() => {
                    setIsForSale(false)
                    document.getElementById("salesprice").value = 0
                    handleChange()
                    console.log("handle change")
                  }}
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>

{/*Sales Price*/}
 <label htmlFor="bonusamount" className="font-bold mt-4 m-2 text-black">
                Sales Price greater than equals to:
      </label>
      <section className="flex mb-8">
        
      <input
        type="number"
        inputMode='numeric'
        id="salesprice"
        min="0"
        className="w-60 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input max-w-screen-sm flex-grow"
        onChange={handleChange}
        disabled={!isForSale}
      />
	<button 
	type="button" 
	onClick={handleClickBalloon6}
	className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55">
	<FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff" , fontSize: '12px'}} className='m-2 py-0' />
	</button>
    </section>

{/*Sender Wallet*/}
<label htmlFor="senderwallet" className="font-bold mr-4 m-2 text-black">Sender Wallet</label>
      <section className="flex mb-8">
      <input
        type="text"
        id="senderwallet"
        placeholder='1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
        className="w-60 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input max-w-screen-sm flex-grow"
        onChange={handleChange}
      />
	<button 
	type="button" 
	onClick={handleClickBalloon4}
	className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55">
	<FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff" , fontSize: '12px'}} className='m-2 py-0' />
	</button>
    </section>

{/*Receiver Wallet*/}
<label htmlFor="receiverwallet" className="font-bold mr-4 m-2 text-black">Receiver Wallet</label>
      <section className="flex mb-8">
      <input
        type="text"
        id="receiverwallet"
        placeholder='1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
        className="w-60 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input max-w-screen-sm flex-grow"
        onChange={handleChange}
      />
	<button 
	type="button" 
	onClick={handleClickBalloon5}
	className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55">
	<FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff" , fontSize: '12px'}} className='m-2 py-0' />
	</button>
    </section>

            <div className="p-6 flex items-center justify-center">
				
                <button className={`create_blue_btn py-2 px-4 rounded ${
        verificationfailed ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-default-bt text-default-bt-text hover:bg-gr-200 border border-default-border'
      }`} disabled={verificationfailed} onClick={createbonusfunc}>
		  	        Create Contract
		        </button>
				
            </div>
			<div className="p-6 flex items-center justify-center">
				<p className='text-xs text-red-700'>Once Create Contract button is pressed, all entered data is final and cannot be edited. Make sure all entered data is correct.</p>
			</div>
          </div>
        </div>
		
		{showPopup && (
                <Popup header={popupHeader} text={popupText} closeModal={handleClosePopup} isOpen={showPopup}/>
                )}
		{showPopupSuccess && (
                <PopupSuccess header={popupHeaderSuccess} text={""} closeModal={handleClosePopupSuccess} isOpen={showPopupSuccess}/>
                )}
		{showBalloon && (
                <PopupInfo text={balloonText} closeModal={handleCloseBalloon} isOpen={showBalloon}/>
                )}
      </div>
    );
  };
  
  export default MyForm;