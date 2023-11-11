import '@/styles/globals.css'

import Nav from "@/comps/Nav"
import Provider from "@/comps/Provider"

export const metadata = {
  title: "SmartCrow",
  description: "Discover & Create Smart Contracts for Real Estate",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;