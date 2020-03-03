import * as React from 'react';
import { useParams } from 'react-router-dom'



export const KudoTest = () => {
    const { id } = useParams(); // toto berie z react routera, nasledne sa na toto id da zavolat nejaky api call napr. ;0 
    console.log('params: ', id);
    return (
  <h1 className="big">
    soske mange more URL PARAMETER PRE KUDO HASH JE: {id}
  </h1>
)};
