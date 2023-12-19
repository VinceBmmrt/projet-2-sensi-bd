import React, { useEffect } from 'react';
import { formatRelative } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchDiscussions } from '../../store/reducers/discussions';

//* Composant page affichant les discussions en cours

function DiscussionsPage() {
  const dispatch = useAppDispatch();
  const myID = useAppSelector((state) => state.user.userId);
  const discussions = useAppSelector(
    (state) => state.discussions.discussionsList
  );

  useEffect(() => {
    // Émission de l'intention de récupérer les discussions
    dispatch(fetchDiscussions());
  }, []);

  // fonction de création de la date d'envoie
  const formatTimestampRelative = (timestamp: Date) => {
    return formatRelative(new Date(timestamp), new Date(), { locale: fr });
  };

  return (
    <div>
      <div className="discussionsContainer">
        <h2>Messages</h2>
        <ul>
          {discussions.map((discussion) => {
            return (
              <Link
                to={
                  discussion.receiver_id === myID
                    ? `/messages/${discussion.post_id}/${discussion.sender_id}`
                    : `/messages/${discussion.post_id}/${discussion.receiver_id}`
                }
                key={discussion.post_id}
              >
                <li>
                  <div>{discussion.post_title}</div>
                  <div>
                    envoyé: {formatTimestampRelative(discussion.timestamp)}
                  </div>
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
