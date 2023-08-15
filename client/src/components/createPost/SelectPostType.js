import React from 'react';
import {Link} from 'react-router-dom';
import './createPost.css';

const SelectPostType = () => {
    return <div className='container'>
        <div className='container-box'>
            <div className='header-select-type'>Select type of your post</div>
            <div className='create-post-btn-wrapper'>
            <Link className="selectPostTypebtn create-tweet-btn" to="/createpost/tweet">Tweet</Link>
            <Link className="selectPostTypebtn" to="/createpost/photo">Photo</Link>
            </div>
       </div>
    </div>
}

export default SelectPostType;