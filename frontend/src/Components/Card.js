import React, { useState } from 'react';
import './card.css';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';

const Card = ({ item }) => {
  const navigate = useNavigate();
  const [like, setLike] = useState(item.likes);
  const [hasLiked, setHasLiked] = useState(false);
  function clickHandler(event) {
    event.preventDefault();
    navigate('/blogpost', { state: item });
  }

  async function likeHandler() {
    if (!hasLiked) {
      console.log('Clicked');
      try {
        const id = item._id;
        const response = await fetch(`http://localhost:4000/api/v1/like/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Increment the local 'likes' state by 1
          setLike(like + 1);
          // Set the state to indicate that the user has liked the item
          window.location.reload();
          setHasLiked(true);
        } else {
          // Handle error case
          throw new Error('Failed to update like');
        }
      } catch (error) {
        // Handle fetch error
        console.error(error);
      }
    }

  }

  const words = item.content.split(' ');
  const truncatedContent = words.slice(0, 5).join(' ') + '...';

  return (
    <div className="card">
      <img src={`http://localhost:4000/${item.photo}`} alt="Lago di Braies"/>
      
      <div className="card__details">
        <span className="tag" style={{color:"green"}}>{item.categories}</span>
        <div className="name">{item.title}</div>
        <p>{truncatedContent}{' '}<Link onClick={clickHandler}>
           <span style={{color:"blue"}}>Read more</span>
         </Link> </p>
         <span className="tag">Likes:{like}</span>
      </div>
      <AiFillLike className="blog-post__like-button" onClick={likeHandler} disabled={hasLiked}/>

    </div>
  );
};

export default Card;
