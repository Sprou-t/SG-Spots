### steps to build

1. setting up project
   rough ref: https://medium.com/@ibrahimhz/creating-your-first-backend-with-node-js-step-by-step-guide-892769af4cb0

2. build starter files to check api works
   build the index.js(listens to port), .env file(contain env var like mongo uri and port no. as well as API key), db.js (function in file uses mongo URI and connects to mongo)

- remember to create a gitignore file in the proj root dir

3. create 3 folders

- model: create our db obj model and schema

* read up on populate to link details of related data obj tgt

- route: contains the specific CRUD operations to perform
- controller: contains the lower level details of each CRUD operations

4. miscalleneous folder

- contains middleware

5. how to set up auth: refer to fso
    - p4d:auth set up,auth based CRUD,expiration time
    - p5d:logout function + conditional rendering based on logged in

### Specific Knowledge

1. db management
   a. mongoose: model vs schema

    - schma is the blueprint that makes the model. model is the interface that provides CRUD methods for database objects. the db obj created will follow the schema prop

    b. hashing password: https://fullstackopen.com/en/part4/user_administration

2. controller files: refer to shopback

3. axios
   a. how to configure header: https://deadsimplechat.com/blog/setting-headers-with-axios-in-nodejs/#:~:text=Way%201%3A%20Setting%20custom%20headers%20in%20a%20request&text=Object%20like%20so-,axios.,logresponse.
   b. what are the types of response properties: https://axios-http.com/docs/res_schema

4. dealing with files

- files are stored and displayed as binary data in their initial form. in various tools, these binary data are displayed in a more human readable hexadecimal format
- since i am using json protocol to transmit file data to frontend or other server, need to transmit the buffer form into base64 string

- stream

    - a type of data that is available in a steady stream. The data is send part by part. eg. data in real-time processing operations: streaming video/audio (honestly for now dkdc)

- Buffer

    - in Computer, a buffer is a temp storage area in mem used to hold data that is being moved from 1 place to another
    - in node, a Buffer class is an implementation of the concept used to provide a way to work w raw binary data in js
    - Buffer.from is a method in node to create a buffer instance(of a class) from var i/p types to interact w binary data

    5. promise and iterables

        - for special functions like map and forEach, each iteration will not wait for previous promise to be resolved bf continuing, thus put all the promises in promise.all where the function waits for all promise fulfillment or the first rejection however, the promises wont be fulfilled in the same order they are executed in.for that, use for loop
