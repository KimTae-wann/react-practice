export const fetchJsonWebToken = async (email, password) => {
  try {
    const tokenResponse = await fetch(
      // 'http://192.168.211.11:8081/api/authorization',
      'http://192.168.227.1:8080/api/authorization',
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
      error: '서비스가 잠시 중단되었습니다. 잠시 후 다시 시도해주세요.',
    };
  }
};

export const fetchMyInfo = async (token) => {
  try {
    const fetchResult = await fetch('http://192.168.227.1:8080/api/member/me', {
      method: 'get',
      headers: {
        Authorization: token,
      },
    });

    const loginResult = await fetchResult.json();
    return loginResult;
  } catch (e) {
    return {
      token: null,
      error: '서비스가 잠시 중단되었습니다. 잠시 후 다시 시도해주세요.',
    };
  }
};
