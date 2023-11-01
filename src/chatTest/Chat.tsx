import React, { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import styles from './chat.module.css';
import { db } from 'src/scripts/databaseFirebase';
import ChatCard from './ChatCard';
import { objTransArr } from 'src/utils/objectTransformArray';

const Chat = () => {
  const [chat, setChat] = useState('');
  const [chatList, setChatList] = useState<any[] | undefined>([]);

  // 실시간으로 데이터 가져오기
  useEffect(() => {
    const chatRef = collection(db, 'chat', '-random_uuid', '-user_uuid');
    const sortedQuery = query(chatRef, orderBy('createAt', 'asc'));
    onSnapshot(sortedQuery, (querySnapshot) => {
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.data());
      // });
      let chatList: any = [];
      chatList = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), chat_uuid: doc.id };
      });
      setChatList(chatList);
    });

    // onSnapshot(doc(db, 'chat', '-random_uuid'), (doc) => {
    //   const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
    //   // const trans = objTransArr(doc.data(), 'user_uuid');
    //   // setChatList(trans);
    //   console.log(doc.data());
    // });
    // const q = query(collection(db, '-room_uuid'));
  }, []);

  // -room_uuid의 채팅 데이터 가져오기
  useEffect(() => {
    const getMessage = async () => {
      const chatRef = collection(db, 'chat', '-random_uuid', '-user_uuid');
      const sortedQuery = query(chatRef, orderBy('createAt', 'asc'));
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
    const chatRef = await addDoc(
      collection(db, 'chat', '-random_uuid', '-user_uuid'),
      {
        user_uuid: '1',
        text: 'hihiihihihi',
        nickName: 'test합니다',
        createAt: new Date(),
        image: 'URL',
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
              alert('채팅');
            }
          }}
        />
        <button onClick={chatPush}>보내기</button>
      </section>
    </div>
  );
};

export default Chat;
