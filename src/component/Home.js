
import {useState,useEffect} from 'react';

import {db} from '../Firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";
import { async } from '@firebase/util';
import { storage } from "../Firebase-config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

export default function Home() {

    const [books, setBooks] = useState([]);
    const bookCollectionRef = collection(db,"books");
    const [imageUrls, setImageUrls] = useState([]);
    const imagesListRef = ref(storage, "images/");

    // Update users
    const updateBook = async (id)=>{
      const bookDoc = doc(db,"books",id)
      //const newFields ={age:age + 1};
      //await updateDoc(bookDoc,newFields);
    };

    // Delete users
    const deleteBook = async (id)=>{
      const bookDoc = doc(db,"books",id);
      await deleteDoc(bookDoc);
      getBooks();
    };
  
    //Load Books
    const getBooks = async ()=>{
      const data = await getDocs(bookCollectionRef);
      setBooks(data.docs.map((doc)=>({...doc.data(), id:doc.id })));
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageUrls((prev) => [...prev, url]);
          });
        });
      });

    };
    

    useEffect(()=>{
      getBooks();
    },[]);
  
    return (
      <div className='container mt-3 text-center '>
       

        <hr/>
       

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {books.map((book)=>{
          return (
            
            
            <div className="col" key={book.id}>
            <div  className="card m-3 " >
            <img src={book.url} className="card-img-top" alt="..." />
              <div className="card-body m-2">
              <h3 className="card-title">Book title : {book.title}</h3>
              <p className="card-text">Description : {book.description}</p>
              <p className="card-text">Price : {book.price} $</p>
              <button className="btn btn-success mx-2"onClick={()=>{updateBook(book.id);}}>Update</button>
              <button className='btn btn-danger' onClick={()=>{ deleteBook(book.id);}}>Delete </button>
            </div>
            </div>
            </div>
            
          );
        })}
        </div>
      </div>
    );
  }