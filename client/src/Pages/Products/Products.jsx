import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import List from '../../Components/List/List'
import useFetch from '../../hooks/useFetch'
import "./Products.scss"

export const Products = () => {

  const catId = parseInt(useParams().id)
  const [maxPrice,setMaxPrice] = useState(1000)
  const [sort,setSort] = useState("asc")
  const [selectedSubCats,setSelectedSubCats] = useState([])

  const {data,loading,error} = useFetch(`/sub-categories?[filters][categories][id][$eq]=${catId}`)

  console.log("cat id" + catId)

  const handleChange = (e)=>{
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(isChecked? [...selectedSubCats,value] : selectedSubCats.filter(item=>item !==value))

  }
  console.log(selectedSubCats)
  return (
    <div className='products'>
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          {data?.map(item=>(
            <div className="inputItem" key={item.id}>
            <input type="checkbox" id={item.id} value={item.id} onChange={handleChange}/>
            <label htmlFor={item.id}>{item.attributes.title}</label>
          </div>
          
          ))}
          
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <span>0</span>
          <input type="range" min={1} max={1000} onChange={(e)=> setMaxPrice(e.target.value)} className="range"/>
          <span>{maxPrice}</span>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input type="radio" id='asc' value='asc' name="price" onChange={(e)=>setSort("asc")}></input>
            <label htmlFor='asc'>Price (Lowest First)</label>
          </div>
          <div className="inputItem">
            <input type="radio" id='desc' value='desc' name="price" onChange={(e)=>setSort("desc")}></input>
            <label htmlFor='desc'>Price (Highest First)</label>
          </div>
          
        </div>
      </div>
      <div className="right">
        <img className='catImg' src="/img/banner.jpg" alt="" />
        <List catId={catId} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats}/>
      </div>
    </div>
  )
}
