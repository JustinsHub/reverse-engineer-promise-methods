
/* 
  Promise.all: resolved if all promises is resolved or one promise is rejected
  Promise.allSettled: resolved if all promises is resolved or rejecred
  Promise.race: resolved if the first promise is resolved or rejected
*/

/* 
Promise.all
  what: static method of Promise
  why: used to handle multiple promise at the same time
  how: takes an array of promises as argument, return Promise
        the returned promise is going to be fulfilled when all the promise is fulfilled
        rejected if one of the promise is rejected
        pending when one of the promise is pending

*/

const promises = [
  new Promise((res, rej) => rej(1)),
  Promise.resolve(3),
  new Promise((res, rej) => res(2))
];

/* Promise.race(promises)
  .then((res) => console.log("fulfilled", res))
  .catch((err) => console.log("rejected", err)); */

const myAll = function (promises) {
  const arr = [];
  let counter = 0;
  return new Promise((resolve, rejected) => {
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          arr[index] = res;
          counter++;
          if (counter === promises.length) {
            resolve(arr);
          }
        })
        .catch((err) => {
          rejected(err);
        });
    });
  });
};

/* 
  [
    {
      status,
      value/reason
    },
    {},
    {}
  ]

*/

const myAllSettled = function (promises) {
  const arr = [];
  let counter = 0;
  return new Promise((resolve, rejected) => {
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          arr[index] = { status: "fulfilled", value: res };
          counter++;
          if (counter === promises.length) {
            resolve(arr);
          }
        })
        .catch((err) => {
          arr[index] = { status: "rejected", reason: err };
          counter++;
          if (counter === promises.length) {
            resolve(arr);
          }
        });
    });
  });
};

const myRace = function (promises) {
  return new Promise((resolve, rejected) => {
    promises.forEach((promise, index) => {
      promise.then(
        (res) => {
          console.log("then", res);
          resolve(res);
        },
        (err) => {
          console.log("catch", err);
          rejected(err);
        }
      );
    });
  });
};
myRace(promises)
  .then((res) => {
    console.log("resolved", res);
  })
  .catch((err) => console.log("rejected", err));
