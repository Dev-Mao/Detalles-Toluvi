import Header from "../components/Header";
import Products from "../components/Products";
import { useState } from "react";
function Wall() {

  const [filter, setFilter] = useState(null)
  const [orderby, setOrderby] = useState(null)

  return (
    <>
        <Header filter = {filter} setFilter = {setFilter} orderby = {orderby} setOrderby = {setOrderby}/>     
        <Products filter = {filter} setFilter = {setFilter} orderby = {orderby} setOrderby = {setOrderby}/>    
    </>
  );
}

export default Wall