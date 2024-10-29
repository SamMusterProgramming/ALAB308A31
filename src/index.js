import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };

  return await central(id).then( (returneDB) => 
       dbs[returneDB](id)).then( userinfos =>  userinfos={ ...userinfos,...vault(id)})
}

console.log(getUserData(8))