import React, { useEffect, useState } from "react";
import "./style.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import Img from "../../components/lazyLoadImage/Img";
import { useSelector } from "react-redux";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import dayjs from "dayjs";

Img;
const Person = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(`/person/${id}`);

  const { url } = useSelector((state) => state.home);
  return (
    <>
      <div className="personBanner">
        {!loading ? (
          <>
            {!!data && (
              <React.Fragment>
                {data?.profile_path && (
                  <React.Fragment>
                    <div className="backdrop-img">
                      <Img src={url.backdrop + data?.profile_path} />
                    </div>
                    <div className="opacity-layer"></div>
                  </React.Fragment>
                )}
                <ContentWrapper>
                  <div className="content">
                    <div className="left">
                      {data.profile_path ? (
                        <Img
                          className="posterImg"
                          src={url.backdrop + data.profile_path}
                        />
                      ) : (
                        <Img className="posterImg" src={avatar} />
                      )}
                    </div>
                    <div className="right">
                      <div className="title">{data?.name}</div>
                      <div className="subtitle">{data?.also_known_as}</div>
                      <div className="overview">
                        <div className="heading">Biography</div>
                        <div className="description">{data?.biography}</div>
                      </div>
                      <div className="info">
                        {data.known_for_department && (
                          <div className="infoItem">
                            <span className="text bold">Known For: </span>
                            <span className="text">
                              {data.known_for_department}
                            </span>
                          </div>
                        )}
                        {data.birthday && (
                          <div className="infoItem">
                            <span className="text bold">Born in: </span>
                            <span className="text">
                              {dayjs(data.birthday).format("MM D, YYYY")}
                            </span>
                          </div>
                        )}
                        {data.place_of_birth && (
                          <div className="infoItem">
                            <span className="text bold">Place Of Birth: </span>
                            <span className="text">{data.place_of_birth}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ContentWrapper>
              </React.Fragment>
            )}
          </>
        ) : (
          <div className="detailsBannerSkeleton">
            <ContentWrapper>
              <div className="left skeleton"></div>
              <div className="right">
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
              </div>
            </ContentWrapper>
          </div>
        )}
      </div>
    </>
  );
};

export default Person;
