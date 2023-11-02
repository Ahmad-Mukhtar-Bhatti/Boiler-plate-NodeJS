const axios = require('axios');


// The following code contains both, A callback code and its equivalent Promise code to compare them
// To differentiate, we have not added the 'toUpperCase' function to the Callback version

// We will be using JSONPlaceholder API to fetch some data and process it



//////////////////////    CALLBACK VERSION   //////////////////////

function fetchDataCallback(callback) {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      const users = response.data;
      callback(null, users);
    })
    .catch(err => {
      console.error('Error getting data:', err);
      callback(err);
    });
}

function processUserDataCallback(users, callback) {
  const mappedUsers = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));
  callback(null, mappedUsers);
}

function simulateAsyncOperationCallback(data, callback) {
  // Simulating an asynchronous operation
  setTimeout(() => {
    console.log('Processed Data:', data);
    callback(null, data);
  }, 1000);
}

function writeDataCallbackHell(data, callback) {
  // Simulating another asynchronous operation
  setTimeout(() => {
    console.log('Data Written:', data);
    callback(null, data);
  }, 1000);
}

// CALLBACK HELL
function processDataCallback(callback) {
  fetchDataCallback((err, users) => {
    if (err) {
      console.error('Error fetching data:', err);
      return callback(err);
    }

    processUserDataCallback(users, (err, processedData) => {
      if (err) {
        console.error('Error processing data:', err);
        return callback(err);
      }

      simulateAsyncOperationCallback(processedData, (err, processedData) => {
        if (err) {
          console.error('Error simulating async operation:', err);
          return callback(err);
        }

        writeDataCallbackHell(processedData, (err) => {
          if (err) {
            console.error('Error writing data:', err);
            return callback(err);
          }

          console.log('Data successfully processed and written!');
          callback(null, processedData);
        });
      });
    });
  });
}





//////////////////////    PROMISE VERSION   //////////////////////

function fetchDataPromise() {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => response.data);
}

function processUserDataPromise(users) {
  return users.map(user => ({
    id: user.id,
    name: user.name.toUpperCase(),
    email: user.email.toUpperCase(),
  }));
}

function simulateAsyncOperationPromise(data) {
  // Simulating an asynchronous operation
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Processed Data:', data);
      resolve(data);
    }, 1000);
  });
}

function writeDataPromise(data) {
  // Simulating another asynchronous operation
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Data Written:', data);
      resolve(data);
    }, 1000);
  });
}

// PROMISE CHAIN
function processDataPromise() {
  return fetchDataPromise()
    .then(processUserDataPromise)
    .then(simulateAsyncOperationPromise)
    .then(writeDataPromise)
    .then(processedData => {
      console.log('Data successfully processed and written!');
      return processedData;
    });
}




////////////////  EXPORT THE VERSION YOU WANT TO CHECK  ////////////////

module.exports = {
  processData: processDataCallback,   // Change this to processDataPromise to use the promise version 
  type: 'callback',                   // Change this to 'promise' to use the promise version
};
