const express = require('express');
const app = express();

const getSanitizerRegExp = () => new RegExp('<script>');
const getNonSanitizerRegExp = () => new RegExp('aaa');

app.use('/shadow/', (req, res) => {
  const code1 = req.query.code as string;
  const code2 = req.query.code as string;
  const code3 = req.query.code as string;
  const code4 = req.query.code as string;
  const code5 = req.query.code as string;

  const safe1 = code1.replace(/<>/g, " ");
  //SAFE_SINK
  const result1 = res.send(safe1);

  const safe2 = code2.replace(getSanitizerRegExp(), " ");
  //SAFE_SINK
  const result2 = res.send(safe2);

  const unsafe3 = code3.replace(/__TEST_SERVER_PORT__/g, "8080");
  //UNSAFE_SINK
  const result3 = res.send(unsafe3);

  //UNSAFE_SINK
  const result4 = res.send(code4);

  const unsafe5 = code5.replace(getNonSanitizerRegExp(), " ");
  //UNSAFE_SINK
  const result5 = res.send(unsafe5);

});

