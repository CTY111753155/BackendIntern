const fs = require('fs');
const express = require('express');
const app = express();

exports.getIndex = ('/',(req, res, next) => {
    res.json({"msg": "success"});
  });

exports.getCurrency =('/exchange', (req, res, next)=>{
  const source = req.query.source;
  const target = req.query.target;
  const amountString = req.query.amount;
  const amount = Number(amountString.replace(/\D/g, ''));
  fs.readFile('currency.json', 'utf8', (err, data) => {
    if (err) {
      console.error('讀取檔案時發生錯誤:', err);
      return;
    }
  
    try {
      const jsonData = JSON.parse(data);
      const rate = Number(jsonData.currencies[source][target]);
      const currency = Math.round(amount * rate * 100) / 100;
      const newcurrency = currency.toLocaleString();
      console.log('讀取的JSON資料:', currency );
      res.json({
        "msg": "success", 
        "amount": "$"+ newcurrency
        });
    } catch (err) {
      console.error('解析JSON時發生錯誤:', err);
    }
  });
});