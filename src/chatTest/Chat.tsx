import React, { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import styles from './chat.module.css';
import { db } from 'src/scripts/databaseFirebase';
import ChatCard from './ChatCard';

const Chat = () => {
  const [chat, setChat] = useState('');
  const [chatList, setChatList] = useState<any[] | undefined>([]);

  // 실시간으로 데이터 가져오기
  useEffect(() => {
    const chatRef = collection(db, 'chat', '-random_uuid', '-user_uuid');
    const sortedQuery = query(chatRef, orderBy('sentAt', 'asc'));
    onSnapshot(sortedQuery, (querySnapshot) => {
      let chatList: any = [];
      chatList = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), chat_uuid: doc.id };
      });
      setChatList(chatList);
    });
  }, []);

  // -room_uuid의 채팅 데이터 가져오기
  useEffect(() => {
    const getMessage = async () => {
      const chatRef = collection(db, 'chat', '-random_uuid', '-user_uuid');
      const sortedQuery = query(chatRef, orderBy('sentAt', 'asc'));
      const querySnapshot = await getDocs(sortedQuery);

      let chatList: any = [];
      chatList = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), chat_uuid: doc.id };
      });

      setChatList(chatList);
    };
    getMessage();
  }, []);

  // 데이터 추가
  const chatPush = async () => {
    if (chat.trim().length === 0) {
      alert('입력해줘잉');
      return;
    }

    const chatRef = await addDoc(
      collection(db, 'chat', '-random_uuid', '-user_uuid'),
      {
        user_uuid: '상대',
        text: chat,
        nickName: '김배찌',
        sentAt: new Date(),
        image:
          'https://firebasestorage.googleapis.com/v0/b/ggeu-jeok.appspot.com/o/images%2Fuser%2Fbazzi%40naver.com?alt=media&token=2943e28a-cbd2-4a60-be42-2bc69f4df431&_gl=1*1ml8anh*_ga*MTY3Mjk4ODAwOC4xNjgzMjY3ODY3*_ga_CW55HF8NVT*MTY5ODkyMjQyNi41Ny4xLjE2OTg5Mjc4OTguNTUuMC4w',
      }
    );

    alert(chatRef.id);
  };

  return (
    <div className={styles.main}>
      <h2>chat</h2>
      <ul className={styles.chatBodySection}>
        {chatList &&
          chatList.map((item) => <ChatCard key={item.chat_uuid} chat={item} />)}
      </ul>
      <section className={styles.chatInputSection}>
        <input
          value={chat}
          onChange={(e) => {
            setChat(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              chatPush();
            }
          }}
        />
        <button onClick={chatPush}>보내기</button>
      </section>
    </div>
  );
};

export default Chat;
