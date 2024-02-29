const fs = require('fs');


exports.getIndex = ('/',(req, res, next) => {
    res.json({"msg": "success"});
  });

exports.getCurrency =('/exchange', (req, res, next)=>{
  const source = req.query.source;
  const target = req.query.target;
  const amountString = req.query.amount;
  const amount = Number(amountString.replace(/[^\d.]/g, ''));
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
      res.json({
        "msg": "success", 
        "amount": "$"+ newcurrency
        });
    } catch (err) {
      console.error(err);
    }
  });
});