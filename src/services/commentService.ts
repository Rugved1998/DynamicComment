
import { collection, addDoc, query, orderBy, limit, getDocs, startAfter, Timestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';

const commentsCollection = collection(db, 'comments');

export const addComment = async (commentData: any) => {
  await addDoc(commentsCollection, {
    ...commentData,
    createdAt: Timestamp.now(),
  });
};

export const getComments = async (sortBy: string, lastVisible: any = null, pageSize: number = 8) => {
  try {
    const commentsQuery = query(
      commentsCollection,
      orderBy(sortBy),
      limit(pageSize),
      ...(lastVisible ? [startAfter(lastVisible)] : [])
    );

    const commentSnapshot = await getDocs(commentsQuery);
    const comments = commentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { comments, lastVisible: commentSnapshot.docs[commentSnapshot.docs.length - 1] || null };
  } catch (error) {
    console.error("Error fetching comments from Firestore:", error);
    return { comments: [], lastVisible: null };
  }
};



 
