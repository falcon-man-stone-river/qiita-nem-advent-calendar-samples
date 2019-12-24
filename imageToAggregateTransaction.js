const { NODE_URL, GENERATION_HASH, IMAGE_FILENAME } = process.env;
const { AggregateTransaction, Account, TransactionHttp, TransferTransaction, Deadline, PlainMessage, NetworkCurrencyMosaic, NetworkType } = require('nem2-sdk');
const image2base64 = require('image-to-base64');

// アカウント新規作成
const account = Account.generateNewAccount(NetworkType.MIJIN);

// Base64配列作成
const splitBase64List = async (data, splitSize) => {
  const dataSpread = [...data];
  return new Promise((resolve, reject) => {
    resolve(dataSpread.reduce(
      (acc, c, i) => i % splitSize ? acc : [...acc, dataSpread.slice(i, i + splitSize).join('')], []
    ));
  });
};

// Base64配列からトランザクション作成
const createTransction = (address, message) => {
  return TransferTransaction.create(
    Deadline.create(),
    address,
    [NetworkCurrencyMosaic.createRelative(0)], // 0
    PlainMessage.create(message), // メッセージ
    NetworkType.MIJIN
  );
};

(async() => {
  try {
    const base64Str = await image2base64(IMAGE_FILENAME);
    console.log('image to base64:', IMAGE_FILENAME, base64Str.length);

    // 最大byte数 1023000を超える場合、エラーで終了
    if (base64Str.length > 1023000) {
      throw new Error('file size over');
    }

    // Base64文字列を1023byte分割
    const base64List = await splitBase64List(base64Str, 1023);
    console.log('base64List size:', base64List.length);

    // Base64配列数分、インナートランザクション作成
    const innerTransactions = base64List.map((r) => {
          return createTransction(account.address, r).toAggregate(account.publicAccount);
    });

    // アグリゲートコンプリート トランザクション作成
    const aggregateTransaction = AggregateTransaction.createComplete(
      Deadline.create(),
      innerTransactions, // Base64分割メッセージ格納 インナートランザクション
      NetworkType.MIJIN,
      []
    );

    // アグリゲートトランザクション署名
    const signedTransaction = account.sign(aggregateTransaction, GENERATION_HASH);
    console.log('- signedTransaction hash -');
    console.log(signedTransaction.hash);

    const transactionHttp = new TransactionHttp(NODE_URL);
    console.log('- sendTransaction -');

    // トランザクション送信
    transactionHttp
      .announce(signedTransaction)
      .subscribe(
        (x) => console.log(x.message),
        (err) => console.error(err)
      );
  } catch (e) {
    console.log('ERROR!', e);
    if (NODE_URL === void 0 || GENERATION_HASH === void 0 || IMAGE_FILENAME === void 0) {
      console.log('Please set the environment variable NODE_URL or GENERATION_HASH or IMAGE_FILENAME');
    }
  }
})();
