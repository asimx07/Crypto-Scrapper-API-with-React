function Cointable(props) {
    const exchanges = props.value;
    const coin = props.coin;
    
    return (
      <div className="table">
          <table>
              <tbody>
              <tr>
                <th colSpan={2}>{coin.Name}</th>
              </tr>
            {exchanges != null && exchanges.map((exchange) =>
            <tr key={exchange.MARKET.toString()}>
                <td>{exchange.MARKET}</td>
                <td>{exchange.PRICE.toFixed(2)}</td>
            </tr>
            )}
            </tbody>
        </table>
      </div>
    );
  }

  export default Cointable;