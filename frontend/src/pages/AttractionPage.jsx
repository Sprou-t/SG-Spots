import axios from 'axios'
import React, { useEffect, useState } from 'react'

/* TODO:
1. retrieve info
-multiple images for slideshow
-only use 1 db obj
-style it based on the examples
-NEED TO CHANGE THE FIXED H AND MT okkkkkk
 */

const AttractionPage = () => {
    const [attraction, setAttraction] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:3001/attractions')
            .then(response => {
                setAttraction(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching attractions:', error);
            });
    }, [])
    console.log(attraction)

    return (
        <div className='mt-32 h-96'>
            AttractionPage
            {/*structure:
            -image slideshow
            -title 
            -rating
            -price
            -timing
            -address
            -website
            -description*/}
        </div >
    )
}

export default AttractionPage