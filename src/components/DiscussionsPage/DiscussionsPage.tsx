import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatRelative } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchDiscussions } from '../../store/reducers/discussions';

function DiscussionsPage() {
  const dispatch = useAppDispatch();
  const myID = useAppSelector((state) => state.user.userId);

  const discussions = useAppSelector(
    (state) => state.discussions.discussionsList
  );

  useEffect(() => {
    // Dispatch l'action pour récupérer les discussions
    dispatch(fetchDiscussions());
  }, []);

  // const formatTimestampRelative = (timestamp: Date) => {
  //   return formatRelative(new Date(timestamp), new Date(), { locale: fr });
  // };

  return (
    <div>
      <div className="discussionsContainer">
        <h2>Discussions</h2>
        <ul>
          {discussions.map((discussion, index) => {
            return (
              <Link
                to={
                  discussion.receiver_id === myID
                    ? `/messages/${discussion.post_id}/${discussion.sender_id}`
                    : `/messages/${discussion.post_id}/${discussion.receiver_id}`
                }
                key={index}
              >
                <li>
                  <div>{discussion.post_title}</div>
                  {/* <div>envoyé: {formatTimestampRelative(message.timestamp)}</div> */}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default DiscussionsPage;
