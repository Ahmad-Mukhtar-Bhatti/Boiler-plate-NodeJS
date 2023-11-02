const fs = require('fs');

//// Function to create a new file ////
function createFle(){
    // Asynchronously creating and writing to the file
    const fileData = "This is a sample file to compare blocking vs non-blocking code for event loop";
    fs.writeFile('./file.txt', fileData, 'utf8', (writeErr) => {
        if (writeErr) {
            console.error(`Error writing to file: ${writeErr}`);
            callback(`Error writing to file: ${writeErr}`);
            return;
        }
    });
}

//// FOLLOWING IS AN EXAMPLE OF BLOCKING CODE ////
// The code doens't perform the functions asynchronoulsy and hence the file is deleted before it is read //

function performBlockingDemo(callback) {

    fs.readFile('./file.txt', 'utf8', (readErr, data) => {
        if (readErr) {

            console.error(`Error reading file: ${readErr}`);
            // callback(`Error reading file: ${readErr}`);
            return;
        }
    });

    fs.unlink('./file.txt', (unlinkErr) => {
        if (unlinkErr) {
            console.error(`Error unlinking file: ${unlinkErr}`);
            callback(`Error unlinking file: ${unlinkErr}`);
            return;
        }
        else{
            callback(`File has been deleted successfully`);
        }

    });
}




//// FOLLOWING IS AN EXAMPLE OF NON-BLOCKING CODE ////
// The code performs the functions asynchronoulsy and hence the file is only deleted after it is read //

function performNonBlockingDemo(callback) {

    fs.readFile('./file.txt', 'utf8', (readErr, data) => {
        if (readErr) {
            createFle();
            console.error(`Error reading file: ${readErr}`);
            callback(`Error reading file: ${readErr}`);
            return;
        }

        // Perform actions on file content
        console.log(`File content: ${data}`);

        // Asynchronously unlinking the file
        fs.unlink('./file.txt', (unlinkErr) => {
            if (unlinkErr) {
                console.error(`Error unlinking file: ${unlinkErr}`);
                callback(`Error unlinking file: ${unlinkErr}`);
                return;
            }
            console.log('File unlinked successfully');
            callback(null, `File operations completed successfully! File data is as follows: ${data}`);

            // Asynchronously creating and writing to the file
            createFle();
        });
    });
}



/////////////////////////////////////////////////////////////
//// Exporting the functions ////
module.exports = {performEventLoopDemo: performNonBlockingDemo};       
// Change this to performBlockingDemo to see the difference in the output
/////////////////////////////////////////////////////////////
