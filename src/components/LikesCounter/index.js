import 'react-icons';
import React, {useState} from 'react'
import { AiOutlineHeart } from "react-icons/ai";
import './LikesCounter.scss'

function LikesCounter(){

    const [count, setCount] = useState(0);

    return(
        <div className='Likes-Counter'>
            <span className='cypher-likes-counter'>{count}</span>
            <AiOutlineHeart onClick={() => setCount(count+1)} />
        </div>
    );

};

export default LikesCounter;