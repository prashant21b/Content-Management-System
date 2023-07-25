import React, { useState } from 'react';
import './blog.css';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';
import { LiaEditSolid } from 'react-icons/lia';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const Blog = ({ item, deleteItem }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDeleted, setIsDeleted] = useState(false);

  function clickHandler(event) {
    event.preventDefault();
    navigate('/blogpost', { state: item });
  }
  function editHandler(event) {
    event.preventDefault();
    navigate('/editblog', { state: item });
  }
  async function deleteHandler() {
    try {
      const id = item._id;
      const response = await fetch(`http://localhost:4000/api/v1/delete/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status) {
        // Increment the local 'likes' state by 1
        toast.success('Deleted Successfully');
        setIsDeleted(true);
      } else {
        // Handle error case
        throw new Error('Failed to delete');
      }
    } catch (error) {
      // Handle fetch error
      console.error(error);
    }
  }

  // Split the content into an array of words
  const words = item.content.split(' ');

  // Join the first 50 words back together
  const truncatedContent = words.slice(0, 5).join(' ') + '...';

  if (isDeleted) {
    return null; // Return null if the item is deleted to remove it from the DOM
  }

  return (
    <div className="blog-post">
      <img className="blog-post__image" src={`http://localhost:4000/${item.photo}`} alt="Blog Post" />
      <h5 className="blog-post__title">{item.title}</h5>
      <p className="blog-post__content">
       
        <Link onClick={clickHandler}>
          <span>Read more</span>
        </Link>
      </p>

      <p className="blog-post__category" style={{ color: 'green' }}>
        {item.categories}
      </p>

      <p className="blog-post__likes">Likes: {item.likes}</p>
      <div >
        <LiaEditSolid className="blog-post__like-button"  onClick={editHandler}></LiaEditSolid>
        <MdDelete className="blog-post__like-button" onClick={deleteHandler}></MdDelete>
      </div>
    </div>
  );
};

export default Blog;
