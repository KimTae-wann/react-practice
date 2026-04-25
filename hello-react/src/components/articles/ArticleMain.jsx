/** @format */
// articles.json 파일 불러오기
import { useState } from 'react';
import ArticleHeader from './ArticleHeader.jsx';
import ArticleList from './ArticleList.jsx';
import articleData from './articles.json';
import ArticleWriter from './ArticleWriter.jsx';

const ArticleMain = () => {
  const [
    {
      subject,
      content,
      membersVO: { email, name },
    },
    setNewBoard,
  ] = useState({
    subject: '',
    content: '',
    membersVO: { email: '', name: '' },
  });

  const onSubjectChangeHandler = (event) => {
    setNewBoard((prevData) => ({ ...prevData, subject: event.target.value }));
  };

  const onNameChangeHandler = (event) => {
    setNewBoard((prevData) => ({
      ...prevData,
      membersVO: { ...prevData.memberVO, name: event.target.value },
    }));
  };

  const onEmailChangeHandler = (event) => {
    setNewBoard((prevData) => ({
      ...prevData,
      membersVO: { ...prevData.memberVO, email: event.target.value },
    }));
  };

  const onContentChangeHandler = (event) => {
    setNewBoard((prevData) => ({ ...prevData, content: event.target.value }));
  };

  const [articles, setArticles] = useState(articleData.articles);

  const onSaveButtonClickHandler = () => {
    const lpad = (str, length, defaultChar) => {
      const remainLength = length - (str + '').length;
      return defaultChar.repeat(remainLength) + str;
    };

    const makeDate = (format) => {
      const now = new Date();

      return format
        .replaceAll('YYYY', now.getFullYear())
        .replaceAll('MM', lpad(now.getMonth() + 1, 2, '0'))
        .replaceAll('DD', lpad(now.getDate(), 2, '0'))
        .replaceAll('HH', lpad(now.getHours(), 2, '0'))
        .replaceAll('mm', lpad(now.getMinutes(), 2, '0'))
        .replaceAll('ss', lpad(now.getSeconds(), 2, '0'));
    };

    const makeId = (index) => {
      const seq = lpad(index, 6, '0');
      return `BO-${makeDate('YYYYMMDD-')}${seq}`;
    };

    const newArticle = {
      id: makeId(articles.length + 1),
      subject: subject,
      content: content,
      email,
      viewCnt: parseInt(Math.random() * 10000),
      crtDt: makeDate('YYYY-MM-DD HH:mm:ss'),
      mdfyDt: null,
      fileGroupId: null,
      membersVO: { email, name },
      files: [],
    };

    setArticles((prevArticle) => [...prevArticle, newArticle]);

    onResetButtonClickHandler();
  };

  const onResetButtonClickHandler = () => {
    setNewBoard((prevData) => ({
      ...prevData,
      subject: '',
      content: '',
      membersVO: {
        email: '',
        name: '',
      },
    }));
  };

  return (
    <div className="wrapper">
      <div>{articleData.articles.length}개의 게시글이 검색되었습니다.</div>
      <table>
        <ArticleHeader />
        <ArticleList contents={articles} />
      </table>
      <ArticleWriter
        subject={subject}
        name={name}
        email={email}
        content={content}
        onSubjectChange={onSubjectChangeHandler}
        onNameChange={onNameChangeHandler}
        onEmailChange={onEmailChangeHandler}
        onContentChange={onContentChangeHandler}
        onSaveButtonClick={onSaveButtonClickHandler}
        onResetButtonClick={onResetButtonClickHandler}
      />
    </div>
  );
};
export default ArticleMain;
