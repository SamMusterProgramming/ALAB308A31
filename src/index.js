// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";


function validateId(id) {
  return !isNaN(id);
}

async function getUserDataUsingThen(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
  try {
    if(validateId(id)){
      return   await   central(id)
      .then((returneDB) => dbs[returneDB](id))
      .then(
      //concatenate id +  two userinfo objects fecthed from one of the dbs + vault
       result => vault(id).then(result1 => result1 = {id:id,...result1,...result})
      ).
      catch(error => console.error(error))
    }else throw new Error("invalid entry , must enter valid number")
  } catch (error) {
    console.log(error)
  }
 
    
}

async function getUserDataUsingAsync(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  const dbValue =  await central(id);
  const userInfoDB = await dbs[dbValue](id) 
  const userInfoVault = await vault(id);
  return {...userInfoVault,...userInfoDB}
}

// const div = document.querySelector("#app");
// const input = document.createElement("input");
// input.setAttribute("placeholder", "enter Id here");
// const submitButton = document.createElement("button");
// submitButton.textContent = "Submitt";
// div.appendChild(input);
// div.appendChild(submitButton);
  
// submitButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   div.textContent = `${getUserData(5)}`;
// });


 (console.log( await getUserDataUsingThen("10")))