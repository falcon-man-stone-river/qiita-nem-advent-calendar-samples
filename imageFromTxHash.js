const { NODE_URL, TX_HASH } = process.env;
const { TransactionHttp } = require('nem2-sdk');
const fs = require('fs').promises;
const fileType = require('file-type');

(async() => {
  try {
    console.log(NODE_URL);
    console.log(TX_HASH);

    // Transaction内容取得
    console.log('- getTransaction -');
    const resTx = await new TransactionHttp(NODE_URL).getTransaction(TX_HASH).toPromise();

    console.log('txTimestamp: ', new Date(parseInt(resTx.transactionInfo.id.substring(0, 8), 16) * 1000));
    console.log('isConfirmed: ', resTx.isConfirmed());

    // Confirmedチェック
    if (resTx.isConfirmed()) {
      // トランザクションサイズ
      console.log('Transaction size: ', resTx.size);
      const resTxJSON = resTx.toJSON();

      // インナートランザクション内のメッセージを取得
      const txMessages = resTxJSON.transaction.transactions.map((res) => res.transaction.message.payload);

      // decode
      const decode = new Buffer.from(txMessages.join(), 'base64');

      // file Type取得
      const fileExtension = fileType(decode).ext;

      // トランザクションハッシュ名で保存
      const fileName = TX_HASH + '.' + fileExtension;

      console.log('fileName:', fileName);

      console.log('- writeFile -');
      const res = await fs.writeFile(fileName, decode);
    }
  } catch (e) {
    console.log('ERROR!', e);
    if (NODE_URL === void 0 || TX_HASH === void 0) {
      console.log('Please set the environment variable NODE_URL or TX_HASH');
    }
  }
})();
