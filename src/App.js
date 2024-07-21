import React, {useRef, useState, useEffect} from 'react'
import DaumPostcode from "react-daum-postcode";
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState("");
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [addressModal, setAddressModal] = useState(false);
  const [addressReset, setAddressReset] = useState(false);
  const [link, setLink] = useState("");
  const [imgsrc1, setImgsrc1] = useState("");
  const [imgsrc2, setImgsrc2] = useState("");
  const [isImg1, setIsImg1] = useState(false);
  const [isImg2, setIsImg2] = useState(false);
  const [isYoutube, setIsYoutube] = useState(true);
  

  function isModal() {
    setAddressModal(true);
  };

  function addressInput(data) {
    const {address, zonecode} = data;
    setAddress(address);
    setZonecode(zonecode);    

    setAddressReset(true);
  };

  function reset() {
    setAddressReset(false);
    setAddressModal(false);

    setAddress("");
    setZonecode("");
  }

  const imgRef1 = useRef(null);
  const imgRef2 = useRef(null);

  function inputFile1() {
    imgRef1.current.click();
  }

  function inputFile2() {
    imgRef2.current.click();
  }

  function preview1(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgsrc1(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setIsImg1(true);
  }

    function preview2(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgsrc2(reader.result);
        };
        reader.readAsDataURL(file);
      }
      setIsImg2(true);
    }


  function post() {
    alert('등록이 완료되었습니다.')
    window.location.replace('/');
  };

  return (
    <div className="form">
      <h1>게시물 등록</h1>
      <h4>제목</h4>
      <input
        className="input"
        type="text"
        value={title}
        placeholder="제목을 작성해주세요."
        onChange={(e) => setTitle(e.target.value)}
      />

      <h4>내용</h4>
      <textarea
        className="input"
        type="text"
        style={{ height: "50vh" }}
        value={content}
        placeholder="내용을 작성해주세요."
        onChange={(e) => setContent(e.target.value)}
      />

      <h4>주소</h4>
      <div style={{ width: "100%", alignItems: "center", display: "flex" }}>
        <input
          className="input"
          type="number"
          value={zonecode}
          placeholder="07250"
          disabled={true}
          style={{ width: "5rem" }}
        />
        {addressReset ? (
          <button
            onClick={reset}
            style={{
              margin: "0 0 1rem 2rem",
              padding: "0.5rem 2rem 0.5rem 2rem",
              height: "100%",
              backgroundColor: "lightgray",
              border:"none",
              cursor: "pointer",
            }}
          >
            초기화
          </button>
        ) : (
          <button
            onClick={isModal}
            style={{
              margin: "0 0 1rem 2rem",
              padding: "0.5rem",
              height: "100%",
              color: "white",
              backgroundColor: "black",
              cursor: "pointer",
            }}
          >
            우편번호 검색
          </button>
        )}
      </div>
      {addressModal && <div style={{width:'100%'}}><DaumPostcode onComplete={addressInput} /></div>}
      <input
        className="input"
        type="text"
        value={address}
        disabled={true}
        onChange={isModal}
      />
      <input
        className="input"
        type="text"
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
      />

      <h4>유튜브</h4>
      <input
        type="text"
        className="input"
        value={link}
        placeholder="링크를 복사해주세요."
        onChange={(e) => setLink(e.target.value)}
      />

      <h4>사진 첨부</h4>
      <div style={{ width: "100%", marginBottom: "1rem" }}>
        {isImg1 ? (
          <img
            src={imgsrc1}
            height="100rem"
            width="100rem"
            alt=""
            style={{ marginRight: "2rem" }}
          />
        ) : (
          <img
            src="/photo.png"
            height="100rem"
            alt=""
            onClick={inputFile1}
            style={{ cursor: "pointer", marginRight: "2rem" }}
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => preview1(e)}
          ref={imgRef1}
          style={{ display: "none" }}
        />
        {isImg2 ? (
          <img src={imgsrc2} height="100rem" width="100rem" alt="" />
        ) : (
          <img
            src="/photo.png"
            height="100rem"
            alt=""
            onClick={inputFile2}
            style={{ cursor: "pointer" }}
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => preview2(e)}
          ref={imgRef2}
          style={{ display: "none" }}
        />
      </div>

      <h4>메인 설정</h4>
      <div style={{ alignItems: "start", width: "100%" }}>
        <input
          type="radio"
          name="mainSetting"
          defaultChecked="true"
          onClick={(e) => e.target.checked && setIsYoutube(true)}
        />
        유튜브
        <input
          type="radio"
          name="mainSetting"
          style={{ marginLeft: "2rem" }}
          onClick={(e) => e.target.checked && setIsYoutube(false)}
        />
        사진
      </div>

      <button
        onClick={post}
        style={{
          marginTop: "15vh",
          paddingInline: "3rem",
          paddingBlock: "1rem",
          backgroundColor: "gold",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        등록하기
      </button>
    </div>
  );
}

export default App;
