import React, { useEffect, useState } from 'react';
import {
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
  // useEffect(() => {
  //   onSnapshot(doc(db, 'messages', 'room_uuid'), (doc) => {
  //     // const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
  //     const trans = objTransArr(doc.data(), 'user_uuid');
  //     setChatList(trans);
  //   });
  // }, []);

  // room_uuid의 채팅 데이터 가져오기
  useEffect(() => {
    const getMessage = async () => {
      // const q = query(collection(db, '-NhjsZ_lKhVCASCHgxoc'));
      // 데이터 정렬
      const chatRoomCollectionRef = collection(db, '-NhjsZ_lKhVCASCHgxoc');
      const sortedQuery = query(
        chatRoomCollectionRef,
        orderBy('createAt', 'desc')
      );
      const querySnapshot = await getDocs(sortedQuery);

      console.log(querySnapshot.docs);

      querySnapshot.docs.map((doc) => console.log(doc.data()));
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.data());
      // });
      // const chatRef = doc(db, 'messages', 'room_uuid');
      // const docSnap = await getDoc(chatRef);
      // if (!docSnap.data()) return;
      // const trans = objTransArr(docSnap.data(), 'user_uuid');
      // setChatList(trans);
    };

    getMessage();
  }, []);

  // 데이터 추가
  const chatPush = async () => {
    // const chatRef = doc(db, 'messages', 'room_uuid2');
    const chatRef = doc(db, '-NhjsZ_lKhVCASCHgxoc', '-NhjsZ_random333');
    setDoc(
      chatRef,
      {
        text: 'testtest',
        nickName: 'test4444',
        createAt: new Date(),
        image: 'URL',
      },
      { merge: true }
    );

    alert('보냄');
  };

  return (
    <div className={styles.main}>
      <h2>chat</h2>
      <ul className={styles.chatBodySection}>
        {chatList && chatList.map((item, index) => <ChatCard chat={item} />)}
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
