import React from 'react';
import styles from './chat.module.css';

const ChatCard = ({ chat }: any) => {
  return (
    <li>
      <div className={`${styles.chatContent} ${styles.myChat}`}>
        {chat.text}
      </div>
    </li>
  );
};

export default ChatCard;
