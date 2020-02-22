import React, { useState, useEffect } from "react";
//import axios from "axios";
import { AxiosWithAuth } from '../util/AxiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    // getData when component mounts
    getData();
  }, []);

  function getData() {
    AxiosWithAuth()
      .get("/colors")
      .then(res => {
        //console.log('getData function in BubblePage component res', res)
        setColorList(res.data)
      })
      .catch(err => {
        console.log('error occurred getting color data', err)
      })

  }
  console.log('colorlist in BubblePage', colorList)
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
