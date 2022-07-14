import './App.css';
import axios from 'axios';
import { useState , useEffect , useRef } from 'react';
import { CSVLink } from "react-csv";

function App() {
  let csvLink = useRef(null);
  const [coins, setCoins] = useState(null);
  const [exchanges, setExchanges] = useState(null);
  const [csvHeaders, setCsvHeaders] = useState([
    ["First Download"]
  ]);
  const [csvData, setCsvData] = useState([
    ["First Download"]
  ]);

  useEffect(() => {
    getCryptoData();
  }, []);

  setTimeout(() =>{
    csvLink.current.link.click();
    document.location.href = "/";
    
  }, 15000);
    
  function formatData(da){
    let exchanges = [];
    let coins = [];
    da.forEach(coin => {
      coins.push(coin.data.Data.CoinInfo.Name);
    });
    da[0].data.Data.Exchanges.forEach(exchange => {
      exchanges.push(Array(exchange.MARKET.toString()));
    });
    exchanges.forEach(exh => {
      da.forEach(coin =>{
        let res = coin.data.Data.Exchanges.find( ({MARKET}) => MARKET === exh[0] );
        if (res == undefined){
          exh.push('N.A');
        }
        else {
          exh.push(res.PRICE.toFixed(2));
        }
      })
    });
    console.log(exchanges);
    setExchanges(exchanges);
    setCoins(coins);
    setCsvHeaders([""].concat(coins));
    setCsvData(exchanges);

  }

  const getCryptoData = () => {

    let endpoints = [
      'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=BTC&tsym=USDT&limit=30',
      'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=ETH&tsym=USDT&limit=30',
      'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=BNB&tsym=USDT&limit=30',
      'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=XRP&tsym=USDT&limit=30',
      'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=ADA&tsym=USDT&limit=30',
      'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=SOL&tsym=USDT&limit=30',
      'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=LUNA&tsym=USDT&limit=30',
      'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=DOT&tsym=USDT&limit=30',
      'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=AVAX&tsym=USDT&limit=30',
      'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=MATIC&tsym=USDT&limit=30',
      'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=LTC&tsym=USDT&limit=30',
      'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=ATOM&tsym=USDT&limit=30',
      'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=TRX&tsym=USDT&limit=30',
      'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=ALGO&tsym=USDT&limit=30',
      'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=FTM&tsym=USDT&limit=30'
    ];
  
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      axios.spread((...allData) => {
        formatData(allData);
        console.log(allData);

      })
    );

    

  }
  
  return (
    <div className="App">
      {coins != null &&
      <div> 
        <table cellpadding="5" cellspacing="10">
          <tbody>
            <tr>
              <th></th>
              {coins.map(coin =>
                <th key = {coin.toString()}>{coin}</th>
              )}
            </tr>
            {exchanges.map(exchange =>
              <tr>
                {exchange.map(exh =>
                  <td>{exh}</td>
                  )}
              </tr>
              )}
          </tbody>
        </table>
        <CSVLink
          headers={csvHeaders}
          data={csvData}
          filename={Date(Date.now()).toString()}
          ref={csvLink}
          target="/"
        >
          Download
        </CSVLink>
      </div>
      }
    </div>
  );
}

export default App;
