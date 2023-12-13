import axios from 'axios';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../Post/Post';
import Loader from '../Loader/Loader';
import './Posts2.scss';

function Posts2() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('Component mounted');

    if (items.length === 0) {
      // Fetch initial data only if items is empty
      axios
        .get(`http://localhost:3000/posts?page=${index}&pageSize=10`)
        .then((res) => setItems(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  const fetchMoreData = async () => {
    if (isLoading || !hasMore) {
      return; // Avoid fetching more data if a request is already in progress or there's no more data to fetch
    }

    setIsLoading(true);

    try {
      console.log(index);
      const response = await axios.get(
        `http://localhost:3000/posts?page=${index + 1}&pageSize=10`
      );
      const newData = response.data ?? [];

      setItems((prevItems) => prevItems.concat(newData));
      setHasMore(newData.length > 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIndex((prevIndex) => prevIndex + 1);
      setIsLoading(false);
    }
  };
  console.log(items);

  return (
    <InfiniteScroll
      className="posts"
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Loader />}
    >
      {items &&
        items.map((item) => (
          <Post
            post={item}
            key={item.id}
            isLoading={isLoading}
            id={item.id}
            user_id={item.user_id}
          />
        ))}
    </InfiniteScroll>
  );
}

export default Posts2;
