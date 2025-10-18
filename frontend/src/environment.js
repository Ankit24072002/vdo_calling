let IS_PROD = true;
const server = IS_PROD ?
    "https://vdo-calling-4.onrender.com" :

    "http://localhost:8000"


export default server;