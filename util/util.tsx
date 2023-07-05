export const maxLen = (str: string, length: number): string => {
  const res = str.substring(0, length);
  return res;
};

export const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `https://image.tmdb.org/t/p/w500/${src}?w=${width}&q=${quality || 75}`;
};

const aXhrQueue: Array<any> = [];
export const callApi = async (
  _url: string,
  _param: Array<any>,
  _isReturnOriginal: boolean
) => {
  let urlData = _url + JSON.stringify(_param);
  if (aXhrQueue.indexOf(urlData) !== -1) {
    return console.error(`AJAX 중복 요청: ${_url}`);
  }
  aXhrQueue.push(urlData);

  return await fetch(_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: '3xCv29981_Tx091dUx98_84PTx905EB',
      // Session: document.getElementById('CI_SESSION').value,
    },
    body: JSON.stringify(_param),
  })
    .then((res) => {
      setTimeout(() => {
        aXhrQueue.splice(aXhrQueue.lastIndexOf(urlData), 1);
      }, 200);

      if (!res.ok) {
        //throw `Status Code : ${res.status} ( ${res.statusText} )`;
        return new Promise(() => {
          console.log(`Status Code : ${res.status} ( ${res.statusText} )`);
        });
      } else {
        return res.json();
      }
    })
    .then(
      (res) => {
        if (typeof res === "object" && typeof res.success !== "undefined") {
          // 세션끊겼을 때 로그인 페이지로
          // if (res.success === '6000' && res.message === 'Login Fail') {
          // 	this.setState({ isPageLoading: false });
          // 	return this.alert('로그아웃 되었습니다.<br>다시 로그인 해주세요.', () => {
          // 		location.href = `${this.HOTTMEMBER_HOST}/?refUrl=${location.href}`;
          // 	});
          // }

          //isReturnOriginal 면 success 검사 안 하고 원본response값 전달함
          if (!_isReturnOriginal) {
            if (res.success !== "0000") {
              alert("데이터를 가져오는 데 실패했습니다.");
              throw new Error(
                `서버의 SUCCESS 값이 0000이 아님. ${_url}\n${JSON.stringify(
                  res
                )}`
              );
            }
            //data가 0일경우도 있어서
            res =
              res.data === "" || res.data === null || res.data === undefined
                ? ""
                : res.data;
          }
        }
        return res;
      },
      () => {
        //연속으로 새로 고침했을 때 이전 호출을 reject 시키면서 계속 얼럿 노출됨 > 콘솔로 변경
        return new Promise(() => {
          console.log("서버와 접속이 원활하지 않습니다.");
        });
      }
    );
};

//url형식인지
export const isUrl = (val: string) => {
  if (typeof val !== "string") {
    return false;
  }
  if (val.indexOf("http") === -1) {
    val = `https://${val}`;
  }

  return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g.test(
    val
  );
};

//iPhone인지?
export const isIphone = () => {
  return (
    navigator.platform.indexOf("iPhone") != -1 ||
    navigator.platform.indexOf("iPod") != -1 ||
    navigator.platform.indexOf("iPad") != -1
  );
};

/**
 * undefined 처리 & 디폴트 값
 * @params content - 입력값
 * @params defaultStr - undefined 일때 디폴트값
 * @returns 입력값 | defaultStr
 */
export const nullCheck = (
  content: string | undefined,
  defaultStr: string
): string => {
  return typeof content !== "undefined" ? content : defaultStr;
};

// null | undefined 체크후 true 일시 defaultV 반환
export const nullCheckNumber = (
  content: number | undefined,
  defaultV: number
): number => {
  return typeof content !== "undefined" ? content : defaultV;
};

/**
 * 특정위치 배열교체
 * @params content - 기존배열
 * @returns Array
 */
export function replaceItemAtIndex(
  content: Array<any>,
  index: number,
  newItem: any
) {
  return [...content.slice(0, index), newItem, ...content.slice(index + 1)];
}

/**
 * 특정값 배열삭제
 * @params content - 기존배열
 * @returns Array
 */
export function removeFilter(content: Array<any>, num: number): Array<any> {
  return content.filter((v) => v !== num);
}

/**
 * 아이템추가 / 중복제거
 * @params content - 기존배열
 * @returns 중복제거된 Array
 */
export const addItem = (content: Array<any>, newItem: any): Array<any> => {
  const newArr = [...content, newItem];
  return newSet(newArr);
};

/**
 * 배열 중복제거
 * @params content - 중복배열
 * @returns 중복제거된 Array
 */
export const newSet = (content: Array<any>): Array<any> => {
  return Array.from(new Set(content));
};

/**
 * 현재 시간
 * @returns ex)2023-06-20 15:11:00
 */
export const getCurrentDate = (): string => {
  // 1. 현재 시간(Locale)
  const curr = new Date();

  // 2. UTC 시간 계산
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

  // 3. UTC to KST (UTC + 9시간)
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const d = new Date(utc + KR_TIME_DIFF);

  const currentDate =
    d.getFullYear() +
    "-" +
    (d.getMonth() + 1) +
    "-" +
    ("00" + d.getDate().toString()).slice(-2) +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes() +
    ":" +
    d.getSeconds();

  return currentDate;
};

/**
 * 이메일서 아이디 추출
 * @params email
 * @returns ex) dogchewming@naver.com -> dogchewming
 */
export const emailExtractId = (email: string): string => {
  const n = email.indexOf("@");
  const member_id = email.substring(0, n !== -1 ? n : email.length);
  return member_id;
};

/**
 * 이메일 * 처리
 * 이메일은 3글자 이하 / 이상으로 분기처리
 * @params email
 * @returns *처리된 이메일
 */
export const emailStarChanger = (email: string): string => {
  const firstStr: string = email.split("@")[0];
  const secondStr: string = email.split("@")[1];
  const originNameArr: Array<string> = firstStr.split("");

  if (firstStr.length > 3) {
    originNameArr.forEach((v, i, a) =>
      i === 0 ||
        i === originNameArr.length - 1 ||
        i === originNameArr.length - 2
        ? (a[i] = v)
        : (a[i] = "*")
    );
    const joinName: string = originNameArr.join().replace(/,/g, "");
    return `${joinName}@${secondStr}`;
  } else {
    return `*${originNameArr[1]}*@!${secondStr}`;
  }
};

/**
 * 이름 * 처리
 */
export const nameStarChanger = (strName: string): string => {
  const originNameArr: Array<string> = strName.split("");
  originNameArr.forEach((v, i, a) => (i === 0 ? (a[i] = v) : (a[i] = "*")));
  const joinName: string = originNameArr.join().replace(/,/g, "");
  return joinName;
};

export const jsonEscape = (str: string): string => {
  return str
    .replace(/\n/g, "\\\\n")
    .replace(/\r/g, "\\\\r")
    .replace(/\t/g, "\\\\t");
};
