
import { collection, addDoc, query, orderBy, limit, getDocs, startAfter, Timestamp, updateDoc, doc } from 'firebase/firestore';
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
      orderBy(sortBy,'desc'),
      limit(pageSize),
      ...(lastVisible ? [startAfter(lastVisible)] : [])
    );

    const commentSnapshot = await getDocs(commentsQuery);
    const comments = commentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );

    return { comments, lastVisible: commentSnapshot.docs[commentSnapshot.docs.length - 1] || null };
  } catch (error) {
    console.error("Error fetching comments from Firestore:", error);
    return { comments: [], lastVisible: null };
  }
};

export const updateCommentLikesDislikes = async (commentId: string, likes: number, dislikes: number) => {
  try {
    const commentRef = doc(db, 'comments', commentId);
    await updateDoc(commentRef, {
      like: likes,
      dislike: dislikes,
      reactCount: likes + dislikes,
    });
  } catch (error) {
    console.error("Error updating comment likes/dislikes:", error);
  }
};



 
