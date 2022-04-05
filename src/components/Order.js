import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Order.css";
import menu1 from "../assets/menu1.svg";
import menu2 from "../assets/menu2.svg";
import menu3 from "../assets/menu3.svg";
import TablePage from "./table";

const Order = () => {
  const [symbols, setSymbols] = useState([]);
  const [symbol, setSymbol] = useState("ETHBTC");
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
              {symbols.map((item, index) => (
                <option key={index} value={item.symbol}>{item.symbol}</option>
              ))}
            </select>
          </div>
          <TablePage
            symbol={symbol}
            tggMenu1={tggMenu1}
            tggMenu2={tggMenu2}
            tggMenu3={tggMenu3}
          />
        </div>
      </div>
    </div>
  );
};

export default Order;
