import { useState } from "react";
import "./PostCreate.css";
import { useDispatch } from "react-redux";
import {
  postImageUploadThunk,
  postStoreThunk,
} from "../../store/thunks/postCreateThunk.js";
import { useNavigate } from "react-router-dom";

export default function PostCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState();

  async function handleCreate(e) {
    e.preventDefault();

    try {
      // 파일 업로드 처리
      const resultUpload = await dispatch(postImageUploadThunk(file)).unwrap();
      // 이미지 url 추출
      const image = resultUpload.data.path; // 파일 업로드 URL 획득

      // 게시글 작성
      const resultStore = await dispatch(
        postStoreThunk({ content, image })
      ).unwrap();

      // 작성 게시글 상세로 이동
      return navigate(`/posts/show/${resultStore.data.id}`, { replace: true });
    } catch (error) {
      console.log("게시글 생성", error);
      return alert("게시글 생성 실패");
    }
  }

  // 파일 변경시 처리 함수
  function changeFile(e) {
    // 선택 파일 정보 획득 (1개 파일만 올리는걸 전제)
    const file = e.target.files[0];

    // 미리보기
    const fileReader = new FileReader(); // 파일 읽는 객체
    fileReader.readAsDataURL(file); // 파일 객체 메서드
    fileReader.addEventListener("load", () => {
      setPreview(fileReader.result); // setPreview 스테이트에 결과 저장
    });

    setFile(file);
  }

  return (
    <>
      <form className="post-create-container" onSubmit={handleCreate}>
        <textarea
          className="post-create-textarea"
          name="content"
          placeholder="내용 작성"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <input type="file" onChange={changeFile} accept="image/*" />
        {preview && (
          <div
            className="post-create-image"
            style={{ backgroundImage: `url("${preview}")` }}
          ></div>
        )}
        <button type="submit" className="btn-big bg-gray">
          Write
        </button>
      </form>
    </>
  );
}
