import React from 'react'
import { useAppSelector } from '../app/hooks'
import { Navigate } from 'react-router-dom';

const UserDetails = () => {
  const {data} = useAppSelector(data => data.gitUser);
  return (
    <section className='UserDetails'>
      <div className='userdetails-top'>
        <img src={data.avatar} alt="avatar" />
        <div>
            <h4>{data.public_repos}</h4>
            <p>Repos</p>
        </div>
        <div>
        <h4>{data.followers}</h4>
        <p>Followers</p>
        </div>
        <div>
        <h4>{data.following}</h4>
        <p>Following</p>     
        </div>
      </div>
      <div className='userdetails-bottom'>
        <h4>Name : {data.username}</h4>
        <p>Bio :{data.bio ? data.bio : 'Hey I am a self taught dev'}</p>
        <p>Blog : {data.blog ? data.blog : "https://github.blog" }</p>
      </div>
    </section>
  )
}

export default UserDetails
