import React from "react";
import { FollowDetail, Repo } from "../../slices/gitUserDetailsSlice";
import axios from "axios";
import { BASE_URL } from "../../config";

const FollowerModal = ({
  follow,
  setShow,
  show,
  setFollow,
  setFollowData,
}: {
  follow: FollowDetail[];
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  setFollow: React.Dispatch<React.SetStateAction<boolean>>;
  setFollowData: React.Dispatch<React.SetStateAction<Repo[]>>;
}) => {
  const handleClose = () => setShow(false);
  async function fetchData(username: string) {
    try {
      const result = await axios.get(`${BASE_URL}/user/${username}`);
      const { data } = result.data;
      setFollowData(data.repos);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const handleClick = async (name: string) => {
    try {
      // Await  data fetching
      await fetchData(name);

      setFollow(true);
      handleClose();
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };

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
                follow.map((follower: any, index: number) => (
                  <div
                    key={index}
                    className="follower-item"
                    onClick={() => handleClick(follower.name)}
                  >
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

export default React.memo(FollowerModal);
