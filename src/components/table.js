import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Table from "react-bootstrap/Table";

function TablePage(params) {
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);

  useEffect(() => {
    const ENDPOINT = `wss://stream.binance.com:9443`;
    // const ENDPOINT = `wss://stream.binance.com:9443/ws/stream?streams=USER_STREAM@depth`;
    const socket = io(ENDPOINT);
    socket.on("ORDER_LIST", (response) => {
      console.log(response)
      setBids(response.data.bids);
      setAsks(response.data.asks);
    });
    return () => socket.disconnect();
  }, [params.symbol]);

  useEffect(() => {
    axios
      .get("https://api.binance.com/api/v3/depth", {
        params: {
          symbol: params.symbol,
          limit: 10,
        },
      })
      .then((response) => {
        setBids(response.data.bids);
        setAsks(response.data.asks);
      });
  }, [params.symbol]);

  return (
    <div>
      <Table
        responsive="sm"
        borderless
        hover
        variant="dark"
        className="mb-0 text-white text fnt-12"
      >
        <thead>
          <tr>
            <td>Price(USDT)</td>
            <td className="text-end">Amount(BTC)</td>
            <td className="text-end">Total</td>
          </tr>
        </thead>
        {params.tggMenu1 && params.tggMenu3 ? (
          <tbody>
            {bids.map((bid, index) => (
              <tr key={index}>
                <td>{Number(bid[0] * 1000000).toFixed(0)}</td>
                <td className="text-end">{Number(bid[1]).toFixed(4)}</td>
                <td className="text-end">
                  {Number(bid[0] * 1000).toFixed(1) + Number(bid[1]).toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <></>
        )}

        <thead>
          <tr>
            <td className="fnt-20">6364785.45</td>
            <td>$276782.44</td>
            <td className="text-end">Total</td>
          </tr>
        </thead>
        {params.tggMenu1 && params.tggMenu2 ? (
          <tbody>
            {asks.map((ask, index) => (
              <tr key={index}>
                <td>{Number(ask[0] * 1000000).toFixed(0)}</td>
                <td className="text-end">{Number(ask[1]).toFixed(4)}</td>
                <td className="text-end">
                  {Number(ask[0] * 1000).toFixed(1) + Number(ask[1]).toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <></>
        )}
      </Table>
    </div>
  );
}

export default TablePage;
