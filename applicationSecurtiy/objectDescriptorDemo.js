// objectDescriptorsDemo.js
const readline = require("readline");



function runObjectDescriptorsDemo() {
  
  const user = {
    username: "john_doe",
    age: 25,
  };

  function displayUser() {
    console.log("Current User Object:", user);
  }
  displayUser();




  ////////////////////////////////////////////////////////////////
  // Demonstrating Object Property Descriptors for the username property of the object
  Object.defineProperty(user, "username", {
    writable: true,       // Set to False to make username property read-only. Set to True for Vice Versa
    enumerable: true,     // Set to true to display the username property in for loops. If you turn it to false, you won't even be able to view username object in the display call, since the properties are displayed in a for loop at the backend
    configurable: false,  // Prevent the username property from being deleted
  });
  ////////////////////////////////////////////////////////////////



  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const questionAsync = (prompt) =>
    
    new Promise((resolve) => rl.question(prompt, resolve));

    (async () => {



      ////////////////////////////////////////////////////////////////
      Object.preventExtensions(user); // Comment it to allow object extension
      ////////////////////////////////////////////////////////////////




      const newProperty = await questionAsync(
        "\nEnter a new property for the user object (e.g., email): "
      );
      user[newProperty] = await questionAsync(
        `Enter the value for ${newProperty}: `
      );

      user["username"] = await questionAsync(
        `Enter the value for a new Username: `
      );
      displayUser();
      rl.close();
  })();
}




////////////////////////////////////////////////////
// Route to demonstrate Object Property Descriptors
module.exports = function (app) {
  app.use('/object-descriptor', (req, res) => {
    runObjectDescriptorsDemo();
    res.send('Check the application console for object demonstration.');
  });
};
////////////////////////////////////////////////////

