import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Order.css";
import menu1 from "../assets/menu1.svg";
import menu2 from "../assets/menu2.svg";
import menu3 from "../assets/menu3.svg";

const Order = () => {
  const [symbols, setSymbols] = useState([]);
  const [symbol, setSymbol] = useState("ETHBTC");
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [tggMenu1, setTggMenu1] = useState(true);
  const [tggMenu2, setTggMenu2] = useState(true);
  const [tggMenu3, setTggMenu3] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get(
        "https://api.binance.com/api/v3/exchangeInfo"
      );
      setSymbols(response.data.symbols);
    };
    getOrders();
  }, []);

  useEffect(() => {
    axios
      .get("https://api.binance.com/api/v3/depth", {
        params: {
          symbol: symbol,
          limit: 10,
        },
      })
      .then((response) => {
        setBids(response.data.bids);
        setAsks(response.data.asks);
      });
  }, [symbol]);

  return (
    <div className="container px-0">
      <div className="row mx-0">
        <div className="col-12 w-tab px-0 border my-5">
          <div className="d-flex justify-content-between">
            <div className="ms-1 menu">
              <button
                onClick={(e) => {
                  setTggMenu1(true);
                  setTggMenu2(true);
                  setTggMenu3(true);
                }}
              >
                <img src={menu1} alt="menu1" />
              </button>
              <button
                onClick={(e) => {
                  setTggMenu2(true);
                  setTggMenu3(false);
                }}
              >
                <img src={menu2} alt="menu2" />
              </button>
              <button
                onClick={(e) => {
                  setTggMenu2(false);
                  setTggMenu3(true);
                }}
              >
                <img src={menu3} alt="menu3" />
              </button>
            </div>
            <select
              className="bg-dark text-white select border-0"
              variant="dark"
              onChange={(e) => setSymbol(e.target.value)}
            >
              {symbols.map((item) => (
                <option value={item.symbol}>{item.symbol}</option>
              ))}
            </select>
          </div>
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
            {tggMenu1 && tggMenu3 ? (
              <tbody>
                {bids.map((bid) => (
                  <tr>
                    <td>{Number(bid[0] * 1000000).toFixed(0)}</td>
                    <td className="text-end">{Number(bid[1]).toFixed(4)}</td>
                    <td className="text-end">
                      {Number(bid[0] * 1000).toFixed(1) +
                        Number(bid[1]).toFixed(1)}
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
            {tggMenu1 && tggMenu2 ? (
              <tbody>
                {asks.map((ask) => (
                  <tr>
                    <td>{Number(ask[0] * 1000000).toFixed(0)}</td>
                    <td className="text-end">{Number(ask[1]).toFixed(4)}</td>
                    <td className="text-end">
                      {Number(ask[0] * 1000).toFixed(1) +
                        Number(ask[1]).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <></>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Order;
