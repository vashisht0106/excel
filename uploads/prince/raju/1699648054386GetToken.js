import React, { useEffect, useState } from 'react';
import axios from 'axios';


const InitRequest = () => {

const [frameUrl , setFrameUrl ] = useState('')

  useEffect(() => {  
    getToket();
  }, []);


const getToket = async() => {
  const config = {
      headers: { Authorization: "Basic " + btoa("altea" + ":" + "test12345") }
    };
    const url = `https://staging.go-blc.com/demo/caspino.php`;
    var form_data = "playerIdent=LocaltestEUR&skin=skin%20test&merchant=MERCHANT%201001&merchantPassword=test&currencyISO=EUR&cat=";
    const windowLocation = window.location;
    const token = windowLocation.href.split('?usr=')[1];
    const env = JSON.parse(localStorage.getItem('env'));
      try {
        const response = await axios.post(url, form_data, config).then(response => {
          console.log('API response:', response.data);
          setFrame(response.data)
        })
      } catch (error) {
        console.error('Error initializing:', error);
      }
    }

   const setFrame = (token)  => {
     const urlParams = `https://staging.go-blc.com/coinpusher/?usr=${token}&serverUrl=https://staging.go-blc.com&machine_name=0&game=Lobby&referrer=https://staging.go-blc.com&lang=en`;
     setFrameUrl(urlParams);
    }

//console.log('urlprams',urlParams)
  return <div id="wrapper">URL CHECK : {frameUrl}
  {/*<iframe id="frameID" src={frameUrl} ></iframe>
  <CustomIframe title='A custom made iframe'  src={frameUrl}>
        <IframeContainer />
      </CustomIframe>*/}
  </div>;
};

export default InitRequest;
