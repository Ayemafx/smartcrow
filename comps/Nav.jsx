"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { PeraWalletConnect } from "@perawallet/connect";

import _fetch from 'isomorphic-fetch';


const peraWallet = new PeraWalletConnect();

const Hometwo = () => {
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

  return (
    <nav className='flex-between w-full mb-16 pt-3 m-2'>
      <Link href='https://www.smartcrow.info/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logosmart.png'
          alt='logo'
          width={50}
          height={50}
          className='object-contain'
        />
        <p className='logo_text'>SmartCrow</p>
      </Link>
      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
          <>
                <button
                  type='button'
                  className='black_btn'
                  onClick={isConnectedToPeraWallet ? disconnect : login}>
                  {isConnectedToPeraWallet ? "Disconnect Pera Wallet" : "Connect Pera Wallet"}
                 
                </button>
          </>
      </div>
    </nav>
    
  );
  };
export default Hometwo;
