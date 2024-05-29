# mightybyte-backend-challenge


This app utilizes socket.io (websocket) to send a shortened url for a Client: POST request http://localhost:3000/url params: {"url": "classcalc.com", clientId: [socket id]}

## Starting Express sever
To install dependencies run:

`yarn install`

To start the server execute 
`yarn run dev`


## Testing

Via browser client. Go to "http://localhost:3000/" and enter url you want the server to shorten. 

![Screenshot 2024-05-27 at 11 59 38 PM](https://github.com/niccololampa/mightybyte-backend-challenge/assets/37615906/ce635887-131a-43a8-b55c-d9e191e9fd7b)


Can also use postman but make sure to provide clientId: socket.id for socket.io to emit to. Once posted it will update the client with the clientID(socket.id) connection. 

![Screenshot 2024-05-28 at 12 04 14 AM](https://github.com/niccololampa/mightybyte-backend-challenge/assets/37615906/8c5952bc-23d2-437e-931e-d120bb1ef1ab)
![Screenshot 2024-05-28 at 12 04 22 AM](https://github.com/niccololampa/mightybyte-backend-challenge/assets/37615906/278ee493-5ece-47e2-916f-4c8925ae4d4d)


## Client Acknowledgement that short URL is received

The client will send an acknowldgement to the server if url is received via sockets. 

The server will try to send the url as long as it does not receive the acknowldgement. Default is to send every 1000ms for 10 times. 

![Screenshot 2024-05-28 at 8 34 17 PM](https://github.com/niccololampa/mightybyte-backend-challenge/assets/37615906/d1d9b371-eed6-4e24-b2b1-c27499732227)
