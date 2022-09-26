import './book.css'
import {useState,useEffect} from 'react';

import {db} from '../Firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";
import { async } from '@firebase/util';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../Firebase-config";
import { v4 } from "uuid";

export default function Book() {


    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPrice, setNewPrice] = useState(0);
    const [imageUpload, setImageUpload] = useState("");
    const [imageUrls, setImageUrls] = useState("");
    const [etatUpload, setEtatUpload] = useState(false);
    const [upOk, setUpOk] = useState("");

    const bookCollectionRef = collection(db,"books");
    const imagesListRef = ref(storage, "images/");

      // !Upload Image
      const uploadFile = async ()=>{
        
        if(imageUpload){
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        await uploadBytes(imageRef, imageUpload)
                    .then((snapshot) => {getDownloadURL(snapshot.ref)
                      .then((url) => { 
                        setImageUrls(url.toString());
                        setEtatUpload(true);
                        alert("Image Uploaded ...");
                 });
          })
      }
    }

    // !Add Books
    const createBook = async ()=>{
      
        if( newTitle.trim().length>0 && newDescription.trim().length>0 && newPrice.trim().length>0){
          if(etatUpload ){
                await addDoc(bookCollectionRef, {
                title: newTitle,
                description: newDescription,
                url: imageUrls,
                price: Number(newPrice)
                })
              setUpOk("Your Book created successfully");
              setEtatUpload(false);
              setNewTitle("");
              setNewDescription("");
              setNewPrice("");
              setImageUpload("");
        }else{alert("Please upload your image")}
      }else{ setUpOk("Please Fill All Information")}
      
      
      
    };

   //! Reset
   const reset =  ()=>{
    setEtatUpload(false);
    setNewTitle("");
    setNewDescription("");
    setNewPrice(0);
    setImageUpload("");
    }

  return (
    
    <div className='container mt-5 img w-50 ' >
      <h3 className='text-danger'> {upOk}</h3>
       <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Title Book ..." aria-describedby="addon-wrapping" 
          onChange={(event)=>{ setNewTitle(event.target.value)}} value={newTitle}/>
          </div>
          
          <div className="input-group mb-3">
            <span className="input-group-text">Description</span>
            <textarea className="form-control" aria-label="With textarea" onChange={(event)=>{ setNewDescription(event.target.value)}} value={newDescription}/>
          </div>
            <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input type="text" className="form-control" aria-label="Price "  onChange={(event)=>{ setNewPrice(event.target.value)}} value={newPrice}/>
                <span className="input-group-text">.00</span>
            </div>
            <div className="input-group mb-3">
                <input className="form-control" disabled={etatUpload} type="file" onChange={(event) => {setImageUpload(event.target.files[0]); }}/>
                <button className=" btn btn-warning w-20" disabled={etatUpload} onClick={uploadFile}> Upload Image</button>
            </div>
            <div className='text-center '>
                <button className='btn btn-success mx-2' onClick={createBook}>Create Book</button>
                <button className='btn btn-info' onClick={reset}>Reset</button>
            </div>
    </div>
  )
}
