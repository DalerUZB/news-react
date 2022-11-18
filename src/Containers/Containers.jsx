import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { ClassicSpinner } from "react-spinners-kit";
import styled from "styled-components";
import uuid from "react-uuid";

const Containers = () => {
  const MarkdownPreview = lazy(() => import("../Components/NewsCard"));
  const { news } = useSelector((store) => store);

  return (
    <Container>
      <Suspense
        fallback={
          <span className="spinner">
            <ClassicSpinner size={50} color="#686769" loading={true} />
          </span>
        }
      >
        {news.map((newsItem) => (
          <MarkdownPreview {...newsItem} key={uuid()} />
        ))}
      </Suspense>
    </Container>
  );
};

export default Containers;
const Container = styled.div`
  width: 80%;
  height: 80%;
  min-height: auto;
  margin: 0 auto;
  overflow-y: scroll;
  padding: 12px;
  position: relative;
  .spinner {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
  ::-webkit-scrollbar {
    width: 5px;
    background-color: rgba(255, 255, 255, 255);
  }
  ::-webkit-scrollbar-thumb {
    background: #000000;
    border-radius: 10px;
  }
`;
