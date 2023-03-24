import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data?.map((elem, index) => {
              let imgUrl = elem.profile_path
                ? url.profile + elem.profile_path
                : avatar;
              return (
                <div key={index} className="listItem">
                  <div
                    className="profileImg"
                    onClick={() => navigate(`/person/${elem?.id}`)}
                  >
                    <Img src={imgUrl} />
                  </div>
                  <div className="name">{elem.name}</div>
                  <div className="character">{elem.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
