import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: "Enter the URL to get its corresponding QR Code >> "
        }
    ])
    .then((answers) => {
        fs.writeFile("googleURL.txt", answers.url, err => { // change the File name here
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('URL which was input is saved to googleURL.txt'); // change text afetr "saved to" to you txt File name
            }
        });
        const URL = answers.url;
        var qr_jpg = qr.image(URL, {type: 'png'});
        qr_jpg.pipe(fs.createWriteStream("Google.png")); // change the QR image name here
        console.log('URL entered >> ', answers.url);

    })
    .catch((error) => {
        if(error.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment >> " + error);
        }
        else{
            console.log("Something else went wrong with prompting >> ", error);
        }
       
    });
