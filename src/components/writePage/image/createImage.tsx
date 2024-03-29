import * as S from "./styleImage";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../index";
import axios from "axios";
import CustomAxios from "../../../axios/customAxios";
import ThumbnailPage from "../../loading/thumbnail";

interface StateProps {
  value: {
    postTitle: string;
    novel: string;
    title: string[];
    event: string[];
    background: string[];
    people: string[];
    keyword: string[];
    userName: string;
  };
}

const CreateImg: React.FC<StateProps> = ({ value }) => {
  const [loding, setLoding] = useState(false);
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  console.log(value.userName === "none");

  const fetchData = async () => {
    try {
      setLoding(true);
      const res = await CustomAxios.post("api/generate/image", {
        genre: value.title,
        key: value.keyword,
        character: value.people,
        event: value.event,
        background: value.background,
      });

      console.log(res.data.result.fileLocation);
      setImg(res.data.result.fileLocation);
      setLoding(false);
    } catch (error) {
      console.log(error);
    }
  };

  const postSaveData = async () => {
    try {
      const res = await CustomAxios.post("api/board", {
        title: value.postTitle,
        novel: value.novel,
        keyword: value.keyword.join(),
        userName: value.userName === "none" ? "익명" : value.userName,
        image: img.substring(12),
        tempImage: [img.substring(12)],
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(); // 래퍼 함수 실행
  }, []);
  return (
    <>
      {loding && <ThumbnailPage></ThumbnailPage>}
      <Header />
      <S.process>3 / 3</S.process>
      <S.mainImgPage>
        <Column type={"space-between"}>
          <S.halfBox>
            <div style={{ textAlign: "center", margin: "-3vh 0 3vh 0" }}>
              썸네일에 포함하고 싶은 키워드를 선택하세요
            </div>
            <S.contentBox>
              <Column type={"end"}>
                <S.lineIndex>장르</S.lineIndex>
                <S.keywordBoxBond>
                  {value.title.map((prev, index) => (
                    <S.keywordBoxChild key={index}>{prev}</S.keywordBoxChild>
                  ))}
                </S.keywordBoxBond>
              </Column>
              <Column type={"end"}>
                <S.lineIndex>키워드</S.lineIndex>
                <S.keywordBoxBond>
                  {value.keyword.map((prev, index) => (
                    <S.keywordBoxChild key={index}>{prev}</S.keywordBoxChild>
                  ))}
                </S.keywordBoxBond>
              </Column>
              <Column type={"end"}>
                <S.lineIndex>사건</S.lineIndex>
                <S.keywordBoxBond>
                  {value.event.map((prev, index) => (
                    <S.keywordBoxChild key={index}>{prev}</S.keywordBoxChild>
                  ))}
                </S.keywordBoxBond>
              </Column>
              <Column type={"end"}>
                <S.lineIndex>등장인물</S.lineIndex>
                <S.keywordBoxBond>
                  {value.people.map((prev, index) => (
                    <S.keywordBoxChild key={index}>{prev}</S.keywordBoxChild>
                  ))}
                </S.keywordBoxBond>
              </Column>
              <Column type={"end"}>
                <S.lineIndex>배경</S.lineIndex>
                <S.keywordBoxBond>
                  {value.background.map((prev, index) => (
                    <S.keywordBoxChild key={index}>{prev}</S.keywordBoxChild>
                  ))}
                </S.keywordBoxBond>
              </Column>
            </S.contentBox>
          </S.halfBox>
          <S.halfLine></S.halfLine>
          <S.halfBox>
            <S.createImgBox img={img}></S.createImgBox>
            <Column
              type={"between"}
              style={{ width: "20vw", margin: "0px auto" }}
            >
              <S.createButton
                ty={true}
                onClick={() => {
                  fetchData();
                }}
              >
                재생성
              </S.createButton>
              <S.createButton
                ty={false}
                onClick={() => {
                  postSaveData();
                }}
              >
                게시
              </S.createButton>
            </Column>
          </S.halfBox>
        </Column>
      </S.mainImgPage>
    </>
  );
};

const Column = styled.div<{ type: string }>`
  display: flex;
  justify-content: ${(prev) => prev.type};
  align-items: center;
  gap: 1em;
`;

export default CreateImg;
