# callUploaderLambdaFn

Follow these steps to run the sever  locally: 

- create .env file and put these variables on it 

  ACCESS_KEY_ID='some value'

  SECRET_ACCESS_KEY='value'

- and run node index.js 


To test the process follow these steps : 

- Open postman
- put this in the url : http://34.229.141.42:3000/media

- make the http method (POST) 

- and the body multipart/form-data 

- and the key in the body is (image) and choose any image of type(jpeg/png)

or try this curl request 

curl -X POST \
  http://34.229.141.42:3000/media \
  -H 'cache-control: no-cache' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -H 'postman-token: 639dfdc3-3450-9170-ff5d-8b6841fdccad' \
  -F image=@image.jpg


  notes : 

  - the image must be less than 2MB 
  - only one image allowed to send 

  - the key is image in the multipart/form-data body


