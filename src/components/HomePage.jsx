import React from 'react';
import axios from 'axios';
import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from 'react';


const HomePage = (props) => {

    const [foodList, setFoodList ] = useState()
    
    const configuration = new Configuration({
        organization: "org-jnhEcz1WhH5kkmNQ5lphlzWb",
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = async()=>{
        let resp = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Suggest most popular italian foods",
            temperature: 0,
            // max_tokens: 7,
        });

        // console.log(resp)
        setFoodList(resp.data.choices[0].text)
    } 
        
    useEffect(()=>{
        response()
    })

    // const getCultures = async() => {

    //     let url = "https://api.openai.com/v1/completions";
    //     const resp = await axios
    //         .post(url, {
    //             headers: { 
    //                 'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    //                 'Content-Type': 'application/json' 
    //             },
    //             params:{
    //                 model: "text-davinci-beta",
    //                 prompt: "Say this is a test",
    //             }
    //         })
    //         .then((response)=>{
    //             console.log(resp)
    //         })
    //         .catch((error)=>{
    //             console.log(error)
    //         })
    // }

    console.log(foodList)

    return(
        <>
            <div>Welcome to recip3</div>
            {foodList?foodList:""}
        </>
    )

}

export default HomePage