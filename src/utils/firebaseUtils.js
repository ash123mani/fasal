import firebase from '../firebase'

const fireStoreDb = firebase.firestore()

const setUserData = async (userId, data) => {
    const usersRef = fireStoreDb.collection('users').doc(userId)
    const finalData = {
      ...data,
      updatedAt: new Date(),
      uid: userId,
    }
    try {
      const result = await usersRef.set(finalData)
      return result
    } catch (err) {
      return err
    }
}

const getUserData = async () => {
  const user = firebase.auth().currentUser
  const userId = user.uid
  const userRef = fireStoreDb.collection('users').doc(userId)
  try {
    const doc = await userRef.get()
    return doc.data()
  } catch(err) {
    return err
  }
}

const addUserFasal = async (fasalId, data) => {
  const user = firebase.auth().currentUser
  const userId = user.uid
  const userFasalRef = fireStoreDb.collection('allFasal').doc(userId).collection('fasal').doc(fasalId)
  console.log("final", data)
  data.uid = userId
  data.updatedAt = new Date()
  data.fasalId = fasalId
  try {
    const result = await userFasalRef.set(data)
    console.log("result", result)
    return result
  } catch (err) {
    console.log("err", err)
    return err
  }
}


const getFasals = async () => {
  const user = firebase.auth().currentUser
  const userId = user.uid
  let fasals = []

  const doc =  await fireStoreDb.collection('allFasal').doc(userId).collection('fasal').get()
  doc.forEach((d) => {
    if(d.exists) {
      fasals.push(d.data())
    }
  })

  return fasals
}

const logOut = async () => {
  try {
    await firebase.auth().signOut()
  } catch (err) {
    console.log("error while logout", err)
  }
}

export  {
  setUserData,
  addUserFasal,
  getFasals,
  getUserData,
  logOut,
}
