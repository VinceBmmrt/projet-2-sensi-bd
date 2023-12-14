import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatRelative } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchMessages,
  sendMessage,
  setMessagesList,
  setSenderId,
  setPostId,
} from '../../store/reducers/messages';
// import dataMessagetest from '../../dataMessageTest';
import './ConversationPage.scss';

function ConversationPage() {
  const dispatch = useAppDispatch();
  const { postId, userId } = useParams();
  const messages = useAppSelector((state) => state.messages.messagesList);

  const [messageContent, setMessageContent] = useState('');
  useEffect(() => {
    // Dispatch l'action pour récupérer les messages
    dispatch(fetchMessages({ postId, userId }));
  }, [dispatch, postId, userId]);

  // const formatTimestampRelative = (timestamp: Date) => {
  //   return formatRelative(new Date(timestamp), new Date(), { locale: fr });
  // };

  const handleSendClick = () => {
    // Assurez-vous que le messageContent n'est pas vide avant de l'envoyer
    if (messageContent.trim() !== '') {
      dispatch(sendMessage({ postId, userId, messageContent }));
      console.log('🚀 ~ messageContent:', messageContent);
      setMessageContent(''); // Réinitialiser le champ après l'envoi
      window.location.reload();
    }
  };
  return (
    <div>
      <div className="messagesContainer">
        <h2>Chat</h2>
        <ul>
          {messages.map((message) => {
            return (
              <li
                key={message.id}
                // className={
                //   message.sender_id === 1 ? 'myMessage' : 'interlocutorMessage'
                // }
              >
                {/* Afficher l'auteur du message */}
                <div className="messageHeader">
                  {/* Auteur:{' '}
                  {message.sender_id === 1
                    ? 'Moi'
                    : `Utilisateur ${message.receiver_id}`} */}
                </div>
                {/* Afficher le contenu du message */}
                <div>{message.content}</div>
                {/* <div>envoyé: {formatTimestampRelative(message.timestamp)}</div> */}
              </li>
            );
          })}
        </ul>
        <div className="inputContainer">
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <button type="submit" onClick={handleSendClick}>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConversationPage;
