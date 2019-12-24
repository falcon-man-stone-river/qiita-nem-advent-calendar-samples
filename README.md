# Qiita mijin Catapult AggregateTransaction Samples

## Overview

#### Sample code for "Qiita nem Advent Calender 2019"
https://qiita.com/Hishikawa/private/403f22af69891ee78870

## Description

### imageToAggregateTransaction.js
send image data file to "mijin Catapult blockchain".
![data_to_aggregateTransaction__.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/253638/7015847b-8824-3aa6-4136-ce845951fac0.png)

### imageFromTxHash.js
get image data file from "mijin Catapult blockchain".
![data_from_TxHash.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/253638/e17bec19-0559-f2de-6b03-fb102abda1ea.png)

## Dependency

```
Node js v12.14.0
npm 6.13.4
```

## Usage
### git clone and enter the 'qiita-samples' directory
```bash
$ git clone https://github.com/falcon-man-stone-river/qiita-nem-advent-calendar-samples.git
$ cd qiita-samples
```

### Install requirements library

```bash
$ npm install
```

### set the environment variables.

```shell
$ export NODE_URL=http://lb-7qvhzx74i6vzy.japaneast.cloudapp.azure.com:3000
$ export GENERATION_HASH=13C3F1DEFCE3ECFC9018E8A75261068C55F0315528B778D83320BFD7660497AA
$ export IMAGE_FILENAME=CatapultChristmas2019.jpg
```



### imageToAggregateTransaction.js
send image data file to "mijin Catapult blockchain".
```bash
$ node imageToAggregateTransaction.js
image to base64: CatapultChristmas2019.jpg 1022384
base64List size: 1000
- signedTransaction hash -
CBE54B229FBDAAAFB194E71C36EB1625019429A878B64A3505DA48E946608835
- sendTransaction -
packet 9 was pushed to the network via /transaction
```

### imageFromTxHash.js
get image data file from "mijin Catapult blockchain".
### set the TX_HASH environment variable

```bash
$ export TX_HASH=CBE54B229FBDAAAFB194E71C36EB1625019429A878B64A3505DA48E946608835
```

```bash
$ node imageFromTxHash.js
http://lb-7qvhzx74i6vzy.japaneast.cloudapp.azure.com:3000
CBE54B229FBDAAAFB194E71C36EB1625019429A878B64A3505DA48E946608835
- getTransaction -
txTimestamp:  2019-12-22T10:51:09.000Z
isConfirmed:  true
Transaction size:  1119552
innerTransaction count:  1000
fileName: CBE54B229FBDAAAFB194E71C36EB1625019429A878B64A3505DA48E946608835.jpg
- writeFile -
complete.
```

### Open the created image file from blockchain
#### for mac os

```bash
$ qlmanage -p CBE54B229FBDAAAFB194E71C36EB1625019429A878B64A3505DA48E946608835.jpg
```

# Author
* Hishikawa

# License
[MIT license](https://en.wikipedia.org/wiki/MIT_License).
