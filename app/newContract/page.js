"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Popup from '@/components/popup';
import PopupSuccess from '@/components/popupsuccess';
import PopupInfo from '@/components/popupinfo';
import { PeraWalletConnect } from "@perawallet/connect";

const peraWallet = new PeraWalletConnect();

//const axios = require('axios');

//const CoinMarketCap = require('coinmarketcap-api')
 
const apiKey = 'WE99NHIIQC8Z8KDMEGJJ3SPACQ1F8VKD7E'
var api = require('etherscan-api').init(apiKey);
//Mumbai
//const NFTcontract="0x009bB4938f9C8a3290e5FC166D6eF8d1616Ad5e8";
//Goerli

const zillowurl='https://api.bridgedataoutput.com/api/v2/pub/transactions?access_token=d555ec24e3f182c86561b09d0a85c3dc&limit=1&sortBy=recordingDate&order=desc&fields=recordingDate,parcels.apn,parcels.full&documentType=grant&recordingDate.gt=2015-01-01&parcels.apn=';
const zillowurladdress='https://api.bridgedataoutput.com/api/v2/pub/transactions?access_token=d555ec24e3f182c86561b09d0a85c3dc&limit=1&sortBy=recordingDate&order=desc&fields=recordingDate,parcels.apn,parcels.full&parcels.apn=';

const {ethers} = require('ethers');
const axios = require('axios');
var provider;
var MyContract;
var MyContractwSigner;


//test
const formatLongString = (str) => {
	if (str.length > 6) {
	  return str.slice(0, 3) + '...' + str.slice(-3);
	}
	return str;
  };

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
  	const isConnectedToPeraWallet = !!accountAddress;

	useEffect(() => {
		// Reconnect to the session when the component is mounted
		peraWallet
		  .reconnectSession()
		  .then((accounts) => {
			if (peraWallet.isConnected) {
			  peraWallet.connector.on("disconnect", disconnect);
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

	const router = useRouter();
	const searchParams = useSearchParams()
  	const SelAPN = searchParams.get('SelAPN');
	const Address = searchParams.get('Address');
	

	const createbonusfunc = async () => {
	var APN = document.getElementById("parcelid").value;
	var Amount = document.getElementById("bonusamount").value;
	var Realtor = document.getElementById("receiverwallet").value;
	var Sellby = new Date(document.getElementById("sellbydate").value);
	
	var Selltimestamp = Math.floor(Sellby.getTime()/1000);
	var Startby = new Date(document.getElementById("startdate").value);
	var Startdatetimestamp = Math.floor(Startby.getTime()/1000);
	setPopupHeaderSuccess('Contract Initiated. Final contract confirmation will come from PeraWallet');
	setShowPopupSuccess(true);
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

	/*const checkprice = async () =>{
		console.log('check ETH price')
		//client.getQuotes({symbol: 'USD,ETH'}).then(console.log).catch(console.error)
		//var response = axios.get(coinurl, {coinparameters})
		var response = api.
		var balance = api.account.balance('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae');
		balance.then(function(balanceData){
  		console.log(balanceData);});
		//console.log(response);

	}*/

	useEffect(()=>{
        peraWallet
			.reconnectSession()
			.then((accounts) => {
				if (peraWallet.isConnected) {
				peraWallet.connector.on("disconnect", disconnect);
				}
		
				if (accounts.length) {
				setAccountAddress(accounts[0]);
				}
			})
			.catch((e) => console.log(e));
        //checkprice();
    })

	const handleClosePopup = () => {
        setShowPopup(false);
      };

	  const handleClosePopupSuccess = () => {
        setShowPopupSuccess(false);
		router.push('/');
      };

	  const handleClickBalloon = () => {
		setBalloonText('The amount entered is in Algos. For a conversion to USD, please visit https://www.coinbase.com/converter/algo/usd Conversion can be up to five decimal points e.g. 0.00001');
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

	  const handleCloseBalloon = () => {
        setShowBalloon(false);
      };


	const copyToClipboardseller = async () => {
		// Logic to copy value to clipboard
		//const valueToCopy = "Hello, clipboard!";
		//navigator.clipboard.writeText(valueToCopy);
		let clipboardresult = await navigator.clipboard.readText();
		
		const myInput = document.getElementById("senderwallet");
		//console.log(APN);
		myInput.value=clipboardresult;
		
	  };

	  const copyToClipboardreceiver = async () => {
		// Logic to copy value to clipboard
		//const valueToCopy = "Hello, clipboard!";
		//navigator.clipboard.writeText(valueToCopy);
		let clipboardresult = await navigator.clipboard.readText();
		
		const myInput = document.getElementById("receiverwallet");
		//console.log(APN);
		myInput.value=clipboardresult;
		
	  };

	  //verify input data
	  const verifydata = async() => {
		const verAPN= document.getElementById("parcelid").value;
		const verAmount= document.getElementById("bonusamount").value;
		const verStartdate= document.getElementById("startdate").value;
		const verSellbydate= document.getElementById("sellbydate").value;
		const verSeller= document.getElementById("senderwallet").value;
		const verRealtor= document.getElementById("receiverwallet").value;

		if (verAPN=="" || verAmount==0 || verStartdate=="" || verSellbydate=="" ||verSeller=="" || verRealtor=="") {
			console.log('Verification failed');
			setVerified(true);
			setPopupHeader('Input verification failed');
			setPopupText('Please check input data');
			setShowPopup(true);
		}
		else{
			console.log('Verification ok');
			setVerified(false);
		}

	  }

	  //verify input data
	  const handleChange = async() => {
		const verAPN= document.getElementById("parcelid").value;
		const verAmount= document.getElementById("bonusamount").value;
		const verStartdate= document.getElementById("startdate").value;
		const verSellbydate= document.getElementById("sellbydate").value;
		const verSeller= document.getElementById("senderwallet").value;
		const verRealtor= document.getElementById("receiverwallet").value;

		if (verAPN=="" || verAmount==0 || verStartdate=="" || verSellbydate=="" ||verSeller=="" || verRealtor=="") {
			console.log('Verification failed');
			setVerified(true);
			//setPopupHeader('Input verification failed');
			//setPopupText('Please check input data');
			//setShowPopup(true);
		}
		else{
			console.log('Verification ok');
			setVerified(false);
		}

	  }

    return (
      <div className="bg-default-bg min-h-screen">
        <nav className="flex justify-between items-center bg-default-bg p-4">
		<a href="/" className="text-white font-bold text-2xl hover:text-gray-300">
			<img src="/assets/images/logo5.png" alt="Smartcrow logo" className="max-w-xs h-auto " /> 
		</a>
		  <p className="text-default-text font-bold text-sm md:text-lg">New Contract</p>
          <div className="flex flex-col items-end">
				<button className="bg-default-bt text-default-bt-text font-semibold px-4 py-2 rounded border border-default-border" onClick={isConnectedToPeraWallet ? disconnect : login}>
				{isConnectedToPeraWallet ? "Disconnect Pera Wallet" : "Connect Pera Wallet"}
				</button>
				<p className="text-sm text-gray-500 mt-2">*Connect With Pera Mobile*</p>
			</div>
        </nav>
        <div className="container mx-auto pb-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center flex-row p-2">
              <label htmlFor="parcelid" className="font-bold mr-4 w-24 text-default-text">
                APN
              </label>
              <input
                type="text"
                id="parcelid"
                className="border-default-border border rounded py-2 px-3 mt-1 max-w-screen-sm flex-grow"
				defaultValue={SelAPN}
				onChange={handleChange}
              />
            </div>
            <div className="flex items-center flex-row p-2">
			<label htmlFor="parcelid" className="font-bold mr-4 w-24 text-default-text">
                
              </label>
              <textarea
                id="addresscheck"
                className="border-gray-300 bg-gray-700 text-white text-center border rounded flex-grow max-w-screen-sm py-2 px-3 mt-1"
				defaultValue={Address}
                rows={2}
				disabled
              />
            </div>
            <div className="flex items-center flex-row p-2">
              <label htmlFor="bonusamount" className="font-bold mr-4 w-24 text-default-text">
                Amount (Algos)
              </label>
              <input
                type="text"
				inputMode='numeric'
                id="bonusamount"
                className="border-default-border border rounded max-w-screen-sm flex-grow py-2 px-3 mt-1"
				onChange={handleChange}
              />
			  <button className="bg-white text-blue-500 font-semibold px-2 py-2 rounded-full mr-2" onClick={handleClickBalloon}>
			  	<img src="/assets/images/info.png" alt="Paste Image" className="h-5 w-5" /> 
			</button>
            </div>
            <div className="flex items-center flex-row p-2">
              <label htmlFor="startdate" className="font-bold mr-4 w-24 text-default-text">
                Start Date
              </label>
              <input
                type="date"
                id="startdate"
                className="border-default-border border rounded py-2 px-3 mt-1 max-w-screen-sm flex-grow"
                defaultValue={today}
				onChange={handleChange}
              />
			  <button className="bg-white text-blue-500 font-semibold px-2 py-2 rounded-full mr-2" onClick={handleClickBalloon2}>
			  	<img src="/assets/images/info.png" alt="Paste Image" className="h-5 w-5" /> 
			</button>
            </div>
            <div className="flex items-center flex-row p-2">
              <label htmlFor="sellbydate" className="font-bold mr-4 w-24 text-default-text">
                Sell By
              </label>
              <input
                type="date"
                id="sellbydate"
                className="border-default-border border rounded max-w-screen-sm flex-grow py-2 px-3 mt-1"
				onChange={handleChange}
              />
			  <button className="bg-white text-blue-500 font-semibold px-2 py-2 rounded-full mr-2" onClick={handleClickBalloon3}>
			  	<img src="/assets/images/info.png" alt="Paste Image" className="h-5 w-5" /> 
			</button>
            </div>
            <div className="flex items-center flex-row p-2">
              <label htmlFor="senderwallet" className="font-bold mr-4 w-24 text-default-text">
                Sender Wallet
              </label>
              <input
                type="text"
                id="senderwallet"
                className="border-default-border border rounded max-w-screen-sm flex-grow py-2 px-3 mt-1"
				onChange={handleChange}
              />
			  
			<button className="bg-white text-blue-500 font-semibold px-2 py-2 rounded-full mr-2" onClick={handleClickBalloon4}>
			  	<img src="/assets/images/info.png" alt="Paste Image" className="h-5 w-5" /> 
			</button>
            </div>
            <div className="flex items-center flex-row p-2">
              <label htmlFor="receiverwallet" className="font-bold mr-4 w-24 text-default-text">
                Receiver Wallet
              </label>
              <input
                type="text"
                id="receiverwallet"
                className="border-default-border border rounded max-w-screen-sm flex-grow py-2 px-3 mt-1"
				onChange={handleChange}
              />
			  
			<button className="bg-white text-blue-500 font-semibold px-2 py-2 rounded-full mr-2" onClick={handleClickBalloon5}>
			  	<img src="/assets/images/info.png" alt="Paste Image" className="h-5 w-5" /> 
			</button>
            </div>
            <div className="p-6 flex items-center justify-center">
				
                <button className={`py-2 px-4 rounded ${
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