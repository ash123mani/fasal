import firebase from '../firebase'

const fireStoreDb = firebase.firestore()

const setUserData = async (userId, data) => {
    const usersRef = fireStoreDb.collection('users').doc(userId)
    try {
      const result = await usersRef.set({
        ...data,
        updatedAt: new Date(),
        uid: userId,
      })
      return result
    } catch (err) {
      return err
    }
}

export  {
  setUserData,
}
