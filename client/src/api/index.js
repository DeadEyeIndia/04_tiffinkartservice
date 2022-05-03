import axios from "axios";

const url = "http://localhost:3010/v1";

const fetch = () => axios.get(url);

export default fetch;
