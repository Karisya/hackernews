import { useEffect, useState } from "react";
import { List, Button, Skeleton } from "antd";
import { fetchNewsIds, fetchNewsItem } from "../../api/newsApi"; 
import './style.css'

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const newsIds = await fetchNewsIds();
      const news = await Promise.all(
        newsIds.map(async (id) => {
          const story = await fetchNewsItem(id);
          return story;
        })
      );
      setNewsList(news);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleFetch = () => {
    fetchNews();
  };

  return (
    <div className="list">
      <Button type="primary" onClick={handleFetch} style={{ marginBottom: 16 }}>
        Обновить
      </Button>
      {loading ? (
        <Skeleton active />
      ) : (
        <List
          bordered
          dataSource={newsList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<a className="list__title" href={item.url}>{item.title}</a>}
                description={`Автор: ${item.by}, Рейтинг: ${item.score}`}
              />
              <div>{new Date(item.time * 1000).toLocaleString()}</div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default NewsList;
