# Nodephilipshue
Nodejs web app for controlling Philips Hue smart light bulb.

[Demo on Youtube](https://www.youtube.com/watch?v=D3yi0Y2WkGA)

## prerequisites
- Set up Philips Hue light bulbs and the Philip Hue bridge, make sure you can control philips hue light with mobile apps (iOS or Android)
- Go to https://www.developers.meethue.com/documentation/getting-started to find out the IP address of the bridge on your network. 
- Substitute ```<bridge_ip_address> ``` to the actual ip address and go to ```http://<bridge_ip_address>/debug/clip.html ``` 
- Follow all instructions on https://www.developers.meethue.com/documentation/getting-started to obtain a user name
- Be able to use curl commands to control philip hue lights directly.

## how to run the express server
Open your terminal window, run the following commands:
```
git clone https://github.com/QianXuX/Nodephilipshue/
npm install
node hue-express-new.js
```

## how to use
Open your browser and go to http://localhost:9100/ to start the web app.

<img src="home.png" alt="web app home" width="750">

## functions
- All lights page shows all connected light bulb devices 

<img src="alllights.png" alt="web app home" width="750">

- Browse a particular light bulb by clicking the associated link 

<img src="singlelight.png" alt="web app home" width="750">

  1. View detailed information of a single light bulb
  2. Change the on/off status and the brightness of the light bulb
  3. Choose different scenes by by clicking the corresponding button
