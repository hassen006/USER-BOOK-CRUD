
import {useState,useEffect} from 'react';
import {db} from '../Firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";

export default function () {
 
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(null);
    const [etatAdd, setEtatAdd] = useState("");
    const [users, setUsers] = useState([]);
    const userCollectionRef = collection(db,"users");
  
    // Create users
    const createUser = async ()=>{
      await addDoc(userCollectionRef, {name: newName,age: Number(newAge)});
      getUsers();
      setNewName("");
      setNewAge("");
      setEtatAdd("User added successfully");
    };

    // Update users
    const updateUser = async (id,age)=>{
      const userDoc = doc(db,"users",id)
      const newFields ={age:age + 1};
      await updateDoc(userDoc,newFields);
      
    };

    // Delete users
    const deleteUser = async (id)=>{
      const userDoc = doc(db,"users",id);
      await deleteDoc(userDoc);
      getUsers();
    };
  
    //! lOAD USERS
    const getUsers = async ()=>{
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc)=>({...doc.data(), id:doc.id })));
    };

    useEffect(()=>{
      getUsers();
    },[]);
  
    return (
      <div className='container mt-3 text-center '>
       <div className='border '>
       <h5  className='text-danger m-2 '>{etatAdd}</h5>
        <div className="input-group flex-nowrap mt-2 mb-2 ">
          
          <input type="text" value={newName} className="form-control mx-1" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" 
          onChange={(event)=>{ setNewName(event.target.value)}} />
          <input type="text" value={newAge} className="form-control" placeholder="Your Age " aria-label="age" aria-describedby="addon-wrapping" 
          onChange={(event)=>{ setNewAge(event.target.value)}} />
        </div>
        <button className='btn btn-primary mb-2' onClick={createUser}>Create User</button>
        </div>
        <hr/>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {users.map((user)=>{
          return (
            <div className="col">
            <div  className="card m-3 " key={user.id}>
              <div className="card-body m-2">
              <h5 className="card-title">Name : {user.name}</h5>
              <p className="card-text">Your Age : {user.age}</p>
              <button className="btn btn-success mx-2"onClick={()=>{updateUser(user.id,user.age);}}>Increase Age</button>
              <button className='btn btn-danger' onClick={()=>{ deleteUser(user.id);}}>Delete User</button>
            </div>
            </div>
            </div>
          );
        })}
        </div>
      </div>
    );
  }