import Loader from './loader/Loader';
import ImageGallery from './imagegallery/ImageGallery';
import Searchbar from './searchbar/Searchbar';
import Button from './button/Button';
import Modal from './modal/Modal';
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [imageArray, setImagearray] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState({ src: '', alt: '' });

  const fetchAPI = query => {
    const API_KEY = '42343056-d970fc336103e47429fc1ac41';
    return fetch(
      `https://pixabay.com/api/?q=${query}&safesearch=true&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
  };

  async function getQueryParams(event) {
    event.preventDefault();
    setQuery(event.target.searchFormInput.value);
    setPage(1);
    setLoader(true);
    const images = await getImages(event.target.searchFormInput.value);
    setImagearray([...images]);
    setLoader(false);
  }
  async function getImages(fetchData) {
    const response = await fetchAPI(fetchData);
    const data = await response.json();
    setTotalHits(data.total);
    setTotalPages(Math.ceil(data.total / 12));
    return data.hits;
  }
  async function updateGallery() {
    setPage(page + 1);
    const newImages = await getImages(query);
    setImagearray([...imageArray, ...newImages]);
  }
  function handleImageView(event) {
    setModal(!modal);
    setImage({
      src: event.target.src || '',
      alt: event.target.alt || '',
    });
  }

  return (
    <div>
      <Searchbar query={getQueryParams}></Searchbar>
      {loader ? (
        <Loader></Loader>
      ) : (
        <ImageGallery images={imageArray} zoom={handleImageView}></ImageGallery>
      )}
      {totalHits > 12 && page < totalPages ? (
        <div className="flex-center">
          <Button nameButton="Load More..." handleButton={updateGallery} />
        </div>
      ) : (
        <></>
      )}
      {modal ? (
        <Modal click={handleImageView} src={image.src} alt={image.alt}></Modal>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
