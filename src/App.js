import logo from './logo.svg';
import './App.css';
import { Auth } from './components/auth';
import { db, auth, storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from "react";
import { upload } from '@testing-library/user-event/dist/upload';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([]);

  // New Movie State
  const [ newMovieTitle, setNewMovieTitle] = useState("") // string title
  const [ newReleaseDate, setNewReleaseDate] = useState(0) // in years
  const [ isAwesome, setIsAwesome] = useState(false) // true or false

  // Update Title State
  const [ updatedTitle, setUpdatedTitle] = useState("")

  // File Upload State
  const [ fileUpload, setFileUpload] = useState(null)

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    // Read the data
    // set the movie list
    try{
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), id: doc.id,
      }));
      setMovieList(filteredData)
    }
    catch (err){
      console.log(err);
    }
  }

  useEffect(() => {
    getMovieList();
  }, [])

  const onSubmitMovie = async () => {
    try{      
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle, 
        releaseDate: newReleaseDate,
        isAwesome: isAwesome,
        userId: auth?.currentUser?.uid,
      });

      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc);
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, {title: updatedTitle});
  };

  const uploadFile = async () => {
    if(!uploadFile) return;
    const filesFolderRef = ref(storage, 'projectFiles/${fileUpload.name}');
    try{
      await uploadBytes(filesFolderRef, fileUpload)
    } catch(err) {
      console.err(err);
    }
  };

  return (
    <div className="App">
      <Auth/>

      <div>
        <input 
        placeholder="Movie Title..." 
        onChange={(e) => setNewMovieTitle(e.target.value)}/>

        <input 
        placeholder="Release Year..." 
        type="number" 
        onChange = {(e) => setNewReleaseDate(Number(e.target.value))}/>

        <input type="checkbox" 
        checked = {isAwesome}
        onChange={(e) => setIsAwesome(e.target.checked)}/>

        <label> isAwesome? </label>
        <button onClick = {onSubmitMovie}> Submit Movie </button>
      </div>

      <div>
      {movieList.map((movie)=> (
        <div>
          <h1 style={{color: movie.isAwesome ? "green" : "red"}}> {movie.title} </h1>
          <p> Release Date: {movie.releaseDate} </p>

          <button onClick={() => deleteMovie(movie.id)}> Delete Movie </button>

          <input 
          placeholder="new Title..." 
          onChange={(e) => setUpdatedTitle(e.target.value)}
          />

          <button onClick={() => updateMovieTitle(movie.id)}> Update Title </button>

        </div>
      ))}
      </div>

      <div>
        <input 
        type="file" 
        onChange={(e) => setFileUpload(e.target.files[0])}/>

        <button onClick={uploadFile}> Upload File </button>
      </div>
    </div>
  );
}

export default App;
