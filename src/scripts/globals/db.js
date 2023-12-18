/* eslint-disable max-len */
/* eslint-disable no-undef */
import {
  getDatabase, ref as dbRef, get, child, push, set,
} from 'firebase/database';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

import firebaseApp from './config';

const db = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

const getCultureData = async (callback) => {
  try {
    const cultureRef = dbRef(db, 'culture');
    const snapshot = await get(child(cultureRef, '/'));

    const cultureData = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const data = { id: childSnapshot.key, ...childSnapshot.val().location, ...childSnapshot.val() };
        cultureData.push(data);
      });
    }

    if (callback) {
      callback(cultureData);
    }

    return cultureData;
  } catch (error) {
    console.error('Error getting culture data:', error.message);
    throw error;
  }
};

const getCultureDataById = async (id, callback) => {
  try {
    const cultureRef = dbRef(db, `culture/${id}`);
    const snapshot = await get(cultureRef);

    if (snapshot.exists()) {
      const data = { id: snapshot.key, ...snapshot.val().location, ...snapshot.val() };

      if (callback) {
        callback(data);
      }

      return data;
    }

    console.error('No such document!');
    return null;
  } catch (error) {
    console.error('Error getting culture data by ID:', error.message);
    throw error;
  }
};

const uploadReviewImage = async (cultureId, reviewImageFile) => {
  try {
    const reviewStorageRef = storageRef(storage, `culture/${cultureId}/review_images`);

    // Generate unique file name
    const timestamp = new Date().getTime();
    const imageName = `review_image_${timestamp}`;

    const imageRef = storageRef(reviewStorageRef, imageName);

    // Upload the image to Firebase Storage
    await uploadBytes(imageRef, reviewImageFile);

    // Get the uploaded image URL
    const imageUrl = await getDownloadURL(imageRef);

    return imageUrl;
  } catch (error) {
    console.error('Error uploading review image:', error.message);
    throw error;
  }
};

const addReview = async (cultureId, review) => {
  try {
    // Upload review image to Storage
    const imageUrl = await uploadReviewImage(cultureId, review.reviewImageFile);

    // Add review data to Realtime Database
    const reviewData = {
      addPicture: imageUrl,
      comment: review.comment,
      name: review.name,
    };

    const reviewsRef = dbRef(db, `culture/${cultureId}/review`);
    const newReviewRef = push(reviewsRef);
    await set(newReviewRef, reviewData);

    console.log('Review added successfully');
  } catch (error) {
    console.error('Error adding review:', error.message);
    throw error;
  }
};

export {
  getCultureData, getCultureDataById, addReview, uploadReviewImage,
};
