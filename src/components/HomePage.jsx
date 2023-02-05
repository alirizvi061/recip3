import React from 'react';
import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from 'react';


const HomePage = (props) => {

    const [foodList, setFoodList ] = useState([])
    const [foodRecipe, setFoodRecipe ] = useState()

    
    const configuration = new Configuration({
        organization: "org-jnhEcz1WhH5kkmNQ5lphlzWb",
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const getFoods = async()=>{
        let resp = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Suggest most popular italian foods",
            temperature: 0,
            max_tokens: 256,
        });

        // console.log(resp)
        let respToArr = resp.data.choices[0].text.split("\n")

        setFoodList(respToArr)
    } 
        
    const getRecipe = async(item)=>{
        console.log(item)
        let resp = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Suggest the best recipe to make ${item}`,
            temperature: 0,
            max_tokens: 256,
        });

        console.log(resp)
        let respToArr = resp.data.choices[0].text.split("\n")

        setFoodRecipe(respToArr)
    } 
    useEffect(()=>{
        getFoods()
    })

    return(
        <>
            <div>Welcome to recip3</div>
            {/* <button></button> */}
            {foodList?foodList.map((item) => {if(item.length > 0){return <button value={item} onClick={(e)=>getRecipe(item)}>{item}</button>}}):""}
            {/* <div>Instructions</div> */}
            {foodRecipe?foodRecipe.map((item) => {return <p>{item}</p>}):""}
        </>
    )

}

export default HomePage