import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

/*TODO: 
1. create a json database to simulate a real database let it have 12 objects
    cover: title, type, image,rating?
    open up: description, pricing, tags, location, opening hours
2. settle the design according to the templates written in the notes WITH THE
DATA RETRIEVED
    -make the items bigger and closer like the sample
    -display each item in a column basis instead of row

3. set up the routings
*/

const AttractionCard = ({ attraction }) => {
    return (
        <div className='border-gray-300 border-solid border-2 flex flex-col gap-4 '>
            <div><img className='w-full max-h-64' src={attraction.imageURL} /></div>
            <div className='p-3 text-center flex flex-col '>
                <h2 className='font-bold text-lg'>{attraction.title}</h2>
                <div className='flex flex-col gap-2'>
                    <p>Type: {attraction.type}</p>
                    <p>Rating: {attraction.rating}</p>
                    <p>{attraction.pricing}</p>
                </div>
            </div>
        </div>
    )
}

const Homepage = () => {
    const [attractions, setAttractions] = useState([])

    useEffect(() => {
        console.log("retrieving data")
        axios.get('http://localhost:3001/attractions').then(response =>
            setAttractions(response.data)
        ).catch(error =>
            console.log(error)
        )


        console.log("successful retrieval!")
    }, [])
    attractions.forEach(attraction => console.log(attraction))

    const attractionElements = attractions.map(attraction => <AttractionCard attraction={attraction} />)

    return (
        <div className=' my-20 w-11/12 m-auto translate-x-9 grid grid-cols-3 gap-20'>
            {attractionElements}
        </div>
    )
}

export default Homepage