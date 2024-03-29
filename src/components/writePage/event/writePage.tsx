import React, { useEffect, useState } from "react";
import * as S from "./styleWrite";
import { Header } from "../../index";
import AddButton from "../../../assets/images/addButton";
import { toast, ToastContainer } from "react-toastify";
import CustomAxios from "../../../axios/customAxios";
import "react-toastify/dist/ReactToastify.css";

interface StateProps {
  setState: React.Dispatch<
    React.SetStateAction<{
      page: number;
      postTitle: string;
      novel: string;
      title: string[];
      event: string[];
      background: string[];
      people: string[];
      keyword: string[];
      userName: string;
    }>
  >;
  value: {
    title: string[];
    event: string[];
    background: string[];
    people: string[];
    keyword: string[];
    userName: string;
  };
}

let writeName = 0;

const Write: React.FC<StateProps> = ({ setState, value }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newEvent, setNewEvent] = useState("");
  const [background, setBackground] = useState("");
  const [people, setPeople] = useState("");
  const [keyword, setKeyword] = useState("");
  const notify = () => toast.warning("익명으로 등록할까요?");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await CustomAxios.get("api/user/logincheck");
        console.log(res);
        // 비동기 작업 완료 후 처리할 로직을 여기에 추가할 수 있습니다.
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
        // 오류가 발생한 경우 여기에서 적절한 오류 처리를 수행할 수 있습니다.
      }
    };
    fetchData(); // fetchData 함수를 호출하여 데이터를 가져옵니다.
  }, []); // 의존성 배열이 빈 배열인 경우, useEffect는 컴포넌트가 마운트될 때 한 번만 실행됩니다.

  const checkEnter = (callback: any) => (event: any) => {
    if (event.key === "Enter") {
      callback();
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleEventChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent(event.target.value);
  };

  const handleBackgroundChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setBackground(value);
  };

  const handlePeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeople(event.target.value);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const addTitle = () => {
    if (newTitle.trim() !== "") {
      setState((prevState) => ({
        ...prevState,
        title: [...prevState.title, newTitle],
      }));
      setNewTitle("");
    }
  };

  const addEvent = () => {
    if (newEvent.trim() !== "") {
      setState((prevState) => ({
        ...prevState,
        event: [...prevState.event, newEvent],
      }));
      setNewEvent("");
    }
  };

  const updateBackground = () => {
    if (background.trim() !== "") {
      setState((prev) => ({
        ...prev,
        background: [...prev.background, background],
      }));
      setBackground("");
    }
  };

  const updatePeople = () => {
    if (people.trim() !== "") {
      setState((prev) => ({
        ...prev,
        people: [...prev.people, people],
      }));
    }
    setPeople("");
  };

  const updateKeyword = () => {
    if (keyword.trim() !== "") {
      setState((prev) => ({
        ...prev,
        keyword: [...prev.keyword, keyword],
      }));
      setKeyword("");
    }
  };

  const removePeople = (indexToRemove: any) => {
    setState((prev) => ({
      ...prev,
      people: prev.people.filter((_, index) => index !== indexToRemove),
    }));
  };

  const removeGenre = (indexToRemove: any) => {
    setState((prev) => ({
      ...prev,
      title: prev.title.filter((_, index) => index !== indexToRemove),
    }));
  };

  const removeEvent = (indexToRemove: any) => {
    setState((prev) => ({
      ...prev,
      event: prev.event.filter((_, index) => index !== indexToRemove),
    }));
  };

  const removeBackground = (indexToRemove: any) => {
    setState((prev) => ({
      ...prev,
      background: prev.background.filter((_, index) => index !== indexToRemove),
    }));
  };

  const removeKeyword = (indexToRemove: any) => {
    setState((prev) => ({
      ...prev,
      keyword: prev.keyword.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleCheckEnter = (event: React.KeyboardEvent, callBack: any) => {
    if (event.key === "Enter") {
      if (event.nativeEvent.isComposing) return;
      callBack();
    }
  };

  return (
    <>
      <Header />
      <S.process>1 / 3</S.process>
      <S.Row>
        <S.writeBox>
          <S.Between>
            <p
              style={{
                marginLeft: "1em",
                fontSize: "18px",
                paddingTop: "1em",
                paddingBottom: "1em",
              }}
            >
              <S.nameDiv>
                당신의 이름을 입력해 주세요.&nbsp;
                <S.nameInput
                  placeholder="작가 이름"
                  onChange={(e) => {
                    setState((props) => ({
                      ...props,
                      userName: e.target.value,
                    }));
                  }}
                ></S.nameInput>
              </S.nameDiv>
            </p>
            <div style={{ display: "flex", paddingRight: "1em", gap: "2em" }}>
              <S.boxHeaderButton
                ty={true}
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    keyword: [],
                    event: [],
                    people: [],
                    background: [],
                    title: [],
                  }));
                }}
              >
                초기화
              </S.boxHeaderButton>
              <S.boxHeaderButton
                ty={false}
                onClick={() => {
                  if (writeName === 1 || value.userName !== "none") {
                    setState((prev) => ({
                      ...prev,
                      page: 2,
                    }));
                    writeName--;
                  } else {
                    notify();
                    writeName++;
                  }
                }}
              >
                생성
              </S.boxHeaderButton>
            </div>
          </S.Between>
          <ToastContainer
            position="top-right" // 알람 위치 지정
            autoClose={3000} // 자동 off 시간
            hideProgressBar={false} // 진행시간바 숨김
            closeOnClick // 클릭으로 알람 닫기
            rtl={false} // 알림 좌우 반전
            pauseOnFocusLoss // 화면을 벗어나면 알람 정지
            draggable // 드래그 가능
            pauseOnHover // 마우스를 올리면 알람 정지
            theme="light"
            limit={1} // 알람 개수 제한
          />
          {/* 헤더 */}
          <div
            style={{
              width: "80vw",
              height: 1,
              backgroundColor: "#D9D9D9",
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <S.divBody>
              <div style={{ padding: "10px", width: "40vw" }}>
                <S.Row style={{ gap: "0.5em" }}>
                  <S.genreDiv>
                    <S.marginTop>
                      <div style={{ marginBottom: "0.5vh" }}>장르</div>
                      <S.Row style={{ gap: "0.5em" }}>
                        <S.inputBoxLow
                          type="text"
                          placeholder="장르 추가"
                          value={newTitle}
                          onChange={handleTitleChange}
                          onKeyDown={(e) => {
                            handleCheckEnter(e, addTitle);
                          }}
                        />
                        <div onClick={addTitle}>
                          <AddButton width={30} height={30}></AddButton>
                        </div>
                      </S.Row>
                    </S.marginTop>
                    <S.marginTop>
                      <div style={{ marginBottom: "0.5vh" }}>키워드</div>
                      <S.Row style={{ gap: "0.5em" }}>
                        <S.inputBoxLow
                          type="text"
                          placeholder="키워드 추가"
                          value={keyword}
                          onChange={handleKeywordChange}
                          onKeyDown={(e) => {
                            handleCheckEnter(e, updateKeyword);
                          }}
                        />
                        <div onClick={updateKeyword}>
                          <AddButton width={30} height={30}></AddButton>
                        </div>
                      </S.Row>
                    </S.marginTop>
                  </S.genreDiv>
                </S.Row>
                <S.Row>
                  <S.sageonDiv>
                    <S.marginTop>
                      <div style={{ marginBottom: "0.5vh" }}>사건</div>
                      <S.Row style={{ gap: "0.5em" }}>
                        <S.inputBoxBig
                          type="text"
                          placeholder="사건 추가"
                          value={newEvent}
                          onChange={handleEventChange}
                          onKeyDown={(e) => {
                            handleCheckEnter(e, addEvent);
                          }}
                        />

                        <div onClick={addEvent}>
                          <AddButton width={30} height={30}></AddButton>
                        </div>
                      </S.Row>
                    </S.marginTop>
                  </S.sageonDiv>
                </S.Row>
                <S.Row>
                  <S.personDiv>
                    <S.marginTop>
                      <div style={{ marginBottom: "0.5vh" }}>등장인물</div>
                      <S.Row style={{ gap: "0.5em" }}>
                        <S.inputBoxLow
                          type="text"
                          placeholder="등장인물 추가"
                          value={people}
                          onChange={handlePeopleChange}
                          onKeyDown={(e) => {
                            handleCheckEnter(e, updatePeople);
                          }}
                        />
                        <div onClick={updatePeople}>
                          <AddButton width={30} height={30}></AddButton>
                        </div>
                      </S.Row>
                    </S.marginTop>
                    <S.marginTop>
                      <div style={{ marginBottom: "0.5vh" }}>배경</div>
                      <S.Row style={{ gap: "0.5em" }}>
                        <S.inputBoxLow
                          type="text"
                          placeholder="배경 추가"
                          value={background}
                          onChange={handleBackgroundChange}
                          onKeyDown={(e) => {
                            handleCheckEnter(e, updateBackground);
                          }}
                        />
                        <div onClick={updateBackground}>
                          <AddButton width={30} height={30}></AddButton>
                        </div>
                      </S.Row>
                    </S.marginTop>
                  </S.personDiv>
                </S.Row>
              </div>
            </S.divBody>
            <S.vertical />
            <S.divBody>
              <S.Between>
                <S.insertBody>
                  <S.overContentBond>
                    <S.overContentChild>장르</S.overContentChild>
                    <S.wordBoxBond>
                      {value.title.map((title, index) => (
                        <S.wordBoxChild
                          key={index}
                          onClick={() => removeGenre(index)}
                        >
                          {title}
                        </S.wordBoxChild>
                      ))}
                    </S.wordBoxBond>
                  </S.overContentBond>
                  <S.overContentBond>
                    <S.overContentChild>사건</S.overContentChild>
                    <S.wordBoxBondLong>
                      {value.event.map((event, index) => (
                        <S.wordBoxChild
                          key={index}
                          onClick={() => removeEvent(index)}
                        >
                          {event}
                        </S.wordBoxChild>
                      ))}
                    </S.wordBoxBondLong>
                  </S.overContentBond>
                </S.insertBody>
              </S.Between>
              <S.Between>
                <S.insertBody>
                  <S.overContentBond>
                    <S.overContentChild>키워드</S.overContentChild>
                    <S.wordBoxBond>
                      {value.keyword.map((keyword, index) => (
                        <S.wordBoxChild
                          key={index}
                          onClick={() => removeKeyword(index)}
                        >
                          {keyword}
                        </S.wordBoxChild>
                      ))}
                    </S.wordBoxBond>
                  </S.overContentBond>
                  <S.overContentBond>
                    <S.overContentChild>등장인물</S.overContentChild>
                    <S.wordBoxBond>
                      {value.people.map((people, index) => (
                        <S.wordBoxChild
                          key={index}
                          onClick={() => removePeople(index)}
                        >
                          {people}
                        </S.wordBoxChild>
                      ))}
                    </S.wordBoxBond>
                  </S.overContentBond>
                  <S.overContentBond>
                    <S.overContentChild>배경</S.overContentChild>
                    <S.wordBoxBond>
                      {value.background.map((background, index) => (
                        <S.wordBoxChild
                          key={index}
                          onClick={() => removeBackground(index)}
                        >
                          {background}
                        </S.wordBoxChild>
                      ))}
                    </S.wordBoxBond>
                  </S.overContentBond>
                </S.insertBody>
              </S.Between>
              <S.info>※키워드를 클릭하여 삭제할 수 있습니다.</S.info>
            </S.divBody>
          </div>
        </S.writeBox>
      </S.Row>
    </>
  );
};

export default Write;
