import React, { useEffect, useState } from 'react'
import TopCategoryCard from '../../Cards/TopCategory/TopCategoryCard'
import axios from "../../../axios"


function BrowseTopCategory() {

  const [Categories, setCategories] = useState([])
  const fetchCategories = () => {
    axios.get('company-category/').then((res) => {
      let data = (res.data).reverse()
      setCategories(data)
    })
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className='px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-2xl md:px-24 lg:px-8'>
        <div className='py-20 px-20 text-center'>
            <h1 className='text-4xl font-bold pb-10'>
                Browse From Top Categories
            </h1>
            <p className='text-xl'>
            The automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes. Placeholder text commonly used.
            </p>
            <div className='grid grid-cols-2'>
                {Categories?.map((category, index) => {
                  if(index > 3){
                    return null
                  }else{
                    return(
                      <TopCategoryCard category = {category}/>
                    )
                  }
                  
                })}
              
            </div>
        </div>
    </div>
  )
}

export default BrowseTopCategory