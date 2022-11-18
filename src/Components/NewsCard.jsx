import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClassicSpinner } from "react-spinners-kit";
import styled from "styled-components";
import NoImage from "../assets/noImage.png";
const NewsCard = ({ urlToImage, title, description }) => {
  const { loader } = useSelector((store) => store);
  const [image, setImage] = useState(urlToImage);
  useEffect(() => {
    setImage(urlToImage);
  }, [urlToImage]);
  return (
    <Wrapper>
      <div className="imageDiv">
        {loader ? (
          <span className="Spinner">
            <ClassicSpinner size={50} color="#686769" loading={loader} />
          </span>
        ) : (
          <img src={image ? image : NoImage} alt={"noIMage"} />
        )}
      </div>
      <div className="titleDescriptionDiv">
        <span className="title">{title}</span>
        <span className="description">{description}</span>
      </div>
    </Wrapper>
  );
};

export default NewsCard;

const Wrapper = styled.div`
  min-height: 214px;
  max-height: auto;
  display: flex;
  align-items: center;
  max-width: 1343px;
  border-radius: 0px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 20px 0;
  @media only screen and (max-width: 600px) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .imageDiv {
    max-width: 350px;
    height: 172px;
    text-align: center;
    position: relative;
    .Spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    img {
      width: 100%;
      height: 172px;
      object-fit: cover;
    }
  }

  .titleDescriptionDiv {
    min-height: 118px;
    max-height: auto;
    max-width: 682px;
    border-radius: nullpx;
    display: flex;
    flex-direction: column;
  }
  .title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    margin: 22px 0 11px;
    padding: 0 10px;
    word-break: break-all;
  }
  .description {
    padding: 0 10px;

    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 34px;
    word-break: break-all;
  }
`;
