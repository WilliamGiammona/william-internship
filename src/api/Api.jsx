import React, { useState, useEffect } from "react";
import axios from "axios";

const Api = () => {
  const [apiData, setApiData] = useState([]);

  async function fetchData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setApiData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return <div>api</div>;
};

export default Api;
