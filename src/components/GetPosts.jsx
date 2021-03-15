import React, { useEffect, useState } from 'react';
import {useQuery, gql} from '@apollo/client';
import {LOAD_POSTS} from '../GraphQL/Queries';
import { parse } from 'graphql';
import { logDOM } from '@testing-library/dom';
import { collectFields } from 'graphql/execution/execute';
import { Bar } from '@visx/shape';
import BarGraph from './BarGraph';

function convertData(unixtimestamp)  {
    
    const date = new Date(unixtimestamp);

    return date;
}


export default function GetPosts(props) {
    
    const {error, loading, data} = useQuery(LOAD_POSTS)
    const [posts, setPosts] = useState([]);
    const [numberOfPosts, setNumberOfPosts] = useState ([])

    useEffect(() => {
        if (data) {
            setPosts(data.allPosts)
        }
    }, [data])

    const count = {}
    const monthArray = []
    
    
    const postPerMonth = []

    return (
        <div className="bar-graph">
            {" "}
            {  
                posts.map((val,index) => {
                const year = convertData(parseInt(val.createdAt)).getFullYear();
                
                if (year == 2019) {
                    const month = convertData(parseInt(val.createdAt)).getMonth()    
                    monthArray.push(month)    
                }
                      
            })  
            }


            { monthArray.forEach(e => count[e] ? count[e]++ : count[e] = 1 ) } 
        
        { 
            Object.keys(count).map((key,index) => {
                 
                postPerMonth.push(count[key])
                
            })
            
        }

        
        <BarGraph data ={postPerMonth} />
        </div>
        
)    
}

