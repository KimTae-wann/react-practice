export const fetchArticleList = async (pageNo = 0, listSize = 10) => {
  try {
    const articleResponse = await fetch(
      `http://192.168.211.11:8081/api/articles?pageNo=${pageNo}&listSize=${listSize}`,
    );

    const articleList = await articleResponse.json();

    return articleList;
  } catch (e) {
    return {
      result: { count: 0, result: [] },
      pagination: {},
      error: '서비스가 잠시 중단되었습니다. 잠시 후 다시 시도해주세요',
    };
  }
};

export const fetchJsonWebToken = async (email, password) => {
  try {
    const tokenResponse = await fetch(
      'http://192.168.211.11:8081/api/authorization',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    const tokenResult = await tokenResponse.json();
    return tokenResult;
  } catch (e) {
    return {
      token: {},
      error: '인증해줘',
    };
  }
};

// 인증 정보 필요
export const fetchAddArticle = async (jwt, subject, content, attachFile) => {
  try {
    const formData = new FormData(); // request body가 없을 때
    formData.append('subject', subject);
    formData.append('content', content);
    // attachFile ==> FileList 배열.
    // FileList 내에 존재하는 파일 객체들을 attachFile로 하나씩 할당
    for (const file of attachFile) {
      formData.append('attachFile', file);
    }
    // formData.append('attachFile', attachFile);

    const fetchResult = await fetch('http://192.168.211.11:8081/api/articles', {
      method: 'post',
      headers: {
        Authorization: jwt,
      },
      body: formData,
    });
    const addResult = await fetchResult.json();
    return addResult;
  } catch (e) {
    return {
      result: false,
      error: '서비스가 잠시 중단되었습니다. 잠시 후 다시 시도해주세요',
    };
  }
};
