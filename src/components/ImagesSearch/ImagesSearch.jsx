import { Component } from 'react';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { searchPosts } from '../../api/posts';

import styles from './images-search.module.css';

class ImagesSearch extends Component {
  state = {
    search: '',
    posts: [],
    loading: false,
    error: null,
    page: 1,
    modalOpen: false,
    postDetails: {},
  };

  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (search && (search !== prevState.search || page !== prevState.page)) {
      this.fetchPosts();
    }
  }

  async fetchPosts() {
    const { search, page } = this.state;
    try {
      this.setState({
        loading: true,
      });
      const { data } = await searchPosts(search, page);
      this.setState(({ posts }) => ({
        posts: data?.hits?.length ? [...posts, ...data.hits] : posts,
      }));
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  handleSearch = ({ search }) => {
    this.setState({
      search,
      posts: [],
      page: 1,
    });
  };

  // loadMore = () => {
  //   this.setState(({ page }) => ({ page: page + 1 }));
  // };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }), this.fetchPosts);
  };

  showModal = ({ largeImageURL }) => {
    this.setState({
      modalOpen: true,
      postDetails: {
        largeImageURL,
      },
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      postDetails: {},
    });
  };

  render() {
    const { handleSearch, loadMore, showModal, closeModal } = this;
    const { posts, loading, error, modalOpen, postDetails } = this.state;

    const isPosts = Boolean(posts.length);

    return (
      <>
        <Searchbar onSubmit={handleSearch} />
        {error && <p className={styles.error}>{error}</p>}
        {loading && <Loader />}
        {isPosts && <ImageGallery showModal={showModal} items={posts} />}
        {isPosts && (
          <div className={styles.loadMoreWrapper}>
            <Button onClick={loadMore} type="button">
              Load more
            </Button>
          </div>
        )}
        {modalOpen && (
          <Modal close={closeModal}>
            <img
              className={styles.image}
              src={postDetails.largeImageURL}
              alt="picture big"
            />
          </Modal>
        )}
      </>
    );
  }
}

export default ImagesSearch;
