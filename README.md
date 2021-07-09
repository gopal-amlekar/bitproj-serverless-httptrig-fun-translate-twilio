# bitproj-serverless-httptrig-fun-translate-twilio
This repo contains code to run as Azure function. The function will call Fun translation API and get the text translated. Executing a HTTP GET or POST on the Function URL will trigger the function. 

# How to use

## Calling API endpoint
Call the function URL and pass the text to be translated in x-www-form-urlencoded with the key set as *Body* as shown below.

![image](https://user-images.githubusercontent.com/3242003/125094821-32dcbf80-e0f1-11eb-96af-54fcd6ec75cd.png)

## Getting translation via SMS reply
Once the function code is uploaded, get the function URL and configure Twilio incoming SMS webhook with this URL as shown below.

![image](https://user-images.githubusercontent.com/3242003/125095661-0bd2bd80-e0f2-11eb-9573-867c8195ec00.png)

After webhook is configured, sending a SMS to your Twilio number will trigger this function which will translate your message and reply back on the same number from which the message was sent.

## Sending translation via SMS
In addition, the translated text may be sent to a any mobile number as SMS via Twilio.

Configure your environment for the following variables.
TWILIO_ACCOUNT_SID - Your Twilio Account SID
TWILIO_AUTH_TOKEN - Your Twilio Account token
TWILIO_NUMBER - Your Twilio number

With this configured, uncomment the following code in the function which will trigger an outgoing SMS to the configured number in the variable ```MobileNumberToSendTranslation```

```
const MobileNumberToSendTranslation = '';
/*
        client.messages
      .create({
         body: textMessage,
         from: TwilioNumber,
         to: MobileNumberToSendTranslation,
       })
      .then(message => context.log(message.sid));
*/
```


