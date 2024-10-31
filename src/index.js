// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";


function isNumeric(str) {
  if (typeof str != "string") return false   
  return !isNaN(str) && 
         !isNaN(parseFloat(str))
}

async function getUserDataUsingThen(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
      if(isNumeric(id)) id = parseInt(id,10) // if a string is numeric , convert it to number
      return   await   central(id)
      .then((returneDB) => dbs[returneDB](id))
      .then(
      //concatenate id +  two userinfo objects fecthed from one of the dbs + vault
       result => vault(id).then(result1 => result1 = {id:id,...result1,...result})
      ).
      catch(error => console.error(error))
    
  }

async function getUserDataUsingAsync(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
  try {
    if(isNumeric(id)) id = parseInt(id,10) // if a string is numeric , convert it to number
    const dbValue =  await central(id);
    const userInfoDB = await dbs[dbValue](id) 
    const userInfoVault = await vault(id);
    return {id:id,...userInfoVault,...userInfoDB}
  } catch (error) {
    console.log(error)
  }
  
}

async function getUserDataUsingPromiseAll(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
  if(isNumeric(id)) id = parseInt(id,10) // if a string is numeric , convert it to number
  return   await   central(id).then((returneDB) => 
    Promise.all([dbs[returneDB](id),vault(id)])
  .then(
    ([result1,result2]) => result1 = {id:id,...result1,...result2}
  )).
  catch(error => console.error(error))
  
}



 console.log("get user id=6 using getUserDataUsingThen")
 console.log( await getUserDataUsingThen("6"))

 console.log("get user id=3 using getUserDataUsingAsync")
 console.log( await getUserDataUsingAsync(3))

 console.log("get user id =9 using getUserDataUsingPromiseAll , peomise.all used to minimise the time")
 console.log( await getUserDataUsingPromiseAll(9))