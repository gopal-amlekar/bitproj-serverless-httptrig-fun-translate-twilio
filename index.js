const fetch = require('node-fetch');
require('dotenv').config();
const qs = require("querystring")

const accountSid = process.env["TWILIO_ACCOUNT_SID"];
const authToken = process.env["TWILIO_AUTH_TOKEN"];
const TwilioNumber = process.env["TWILIO_NUMBER"];

const MobileNumberToSendTranslation = '';
const translationBaseURL = 'https://api.funtranslations.com/translate/yoda?text=';

const client = require('twilio')(accountSid, authToken);

module.exports = async function (context, req) {

  // context.log(accountSid);
  // context.log(authToken);
        
  try {
    context.log('JavaScript HTTP trigger function processed a request.');

    const formValues = qs.parse(req.body);
    //context.log("formValues: " + formValues);

    const textToTransLate = formValues.Body;
    context.log("Text to Translate: " + textToTransLate);

    var responseMessage = "Input Text: " + textToTransLate;

    await fetch(translationBaseURL + textToTransLate)
        .then(response => response.json())
        .then(jsonResponse => {
            context.log(jsonResponse);
            responseMessage = jsonResponse;
        });

        

        try {

          if (responseMessage.error != null)
          {
              textMessage = responseMessage.error.message;
          }
          else
          {
            textMessage = responseMessage.contents.translation;
          }
            
            
        } catch (error) {
          context.log(error);          
        }
    

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

    // Uncomment the following code to additionally send translations to any mobile number
/*
        client.messages
      .create({
         body: textMessage,
         from: TwilioNumber,
         to: MobileNumberToSendTranslation,
       })
      .then(message => context.log(message.sid));
*/
    

  } catch (error) {
    
    context.log(error);
    
  }


}