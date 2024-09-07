import React, { useState } from 'react';
import { FollowDetail } from '../../slices/gitUserDetailsSlice';


const FollowerModal = ({ follow,setShow,show }:{follow:FollowDetail[],setShow:React.Dispatch<React.SetStateAction<boolean>>,show:boolean}) => {

  const handleClose = () => setShow(false);

  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={handleClose}>
              &times;
            </span>
            <h2>Follower List</h2>
            <div className="follower-list">
              {follow.length > 0 ? (
                follow.map((follower:any, index:number) => (
                  <div key={index} className="follower-item">
                    <img
                      src={follower.avatar}
                      alt={`${follower.name} avatar`}
                      className="follower-avatar"
                    />
                    <span className="follower-name">{follower.name}</span>
                  </div>
                ))
              ) : (
                <p>No data to show.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FollowerModal;
