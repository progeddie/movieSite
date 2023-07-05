/**
 * 배열처리 최적화 샘플
 * -----------------------------------------------------
 * key => values(Array) 형태로 데이터를 만든다.
 */
export const optimizationSample = (): void => {
  // const obj = Objects.search()
  //     .abcdefObj()
  //     .filter((v) => v.fkStatementList.exactMatch(statement_list.pk))
  //     .all();
  // // key, value 형태로 담기
  // interface dataI {
  //     pk: string;
  //     defectCode: string;
  //     handlingCode: string;
  //     contractNumber: number;
  // }
  // const mapData = new Map<string, dataI>();
  // obj?.forEach((v) => {
  //     const pk: string = nullCheck(v.fkStatementList);
  //     const defectCode: string = nullCheck(v.defectCode);
  //     const handlingCode: string = nullCheck(v.handlingCode);
  //     const contractNumber: number = nullCheckNumber(v.contractNumber, 1);
  //     mapData.set(pk, { pk: pk, defectCode: defectCode, handlingCode: handlingCode, contractNumber: contractNumber });
  // });
  // if (mapData.has(statement_list.pk)) {
  //     const data = mapData.get(statement_list.pk) ?? ({} as dataI);
  //     console.log(data);
  //     console.log(data.pk);
  //     console.log(data.defectCode);
  //     console.log(data.handlingCode);
  //     console.log(data.contractNumber);
  // }
};

/**
 * api 최적화 샘플
 *
 * 배열형태의 UPDATE_DATA_ARR 데이터를 key => value 세트로 만들어 이중루프 없이 데이터 입력함
 */
export const updateStatementListYnOutSourcing = async (
  UPDATE_DATA_ARR: Array<string>
): Promise<void> => {
  // const mapData = new Map<string, DATA_TYPES>();
  // const pkArr: Array<string> = [];
  // UPDATE_DATA_ARR.forEach((arr, i) => {
  //     const value: DATA_TYPES = JSON.parse(arr);
  //     const pk = nullCheck(value.PK);
  //     mapData.set(pk, {
  //         PK: pk,
  //         YNOUTSOURCING: nullCheckBoolean(value.YNOUTSOURCING),
  //         CD_SITE: nullCheck(value.CD_SITE),
  //         CD_CTYP: nullCheck(value.CD_CTYP),
  //     });
  //     pkArr.push(pk);
  // });
  // Objects.search()
  //     .kkkObj()
  //     .filter((x) => x.pk.exactMatch(...pkArr))
  //     .all()
  //     .forEach((x) => {
  //         if (mapData.has(x.pk)) {
  //             // 내역서 외주시스템이관 여부 업데이트
  //             const value = mapData.get(x.pk) ?? ({} as DATA_TYPES);
  //             x.ynOutsourcing = nullCheckBoolean(value.YNOUTSOURCING);
  //             x.cdSite = nullCheck(value.CD_SITE);
  //             x.cdCtyp = nullCheck(value.CD_CTYP);
  //         }
  //     });
};

/**
 * 오브젝트 속성추출 샘플
 */
export const propertyExtractSample = async (): Promise<void> => {
  const pluck = <T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] => {
    console.log(o);
    const res = propertyNames.map((n) => o[n]);
    console.log(res);
    return res;
  };

  interface Car {
    manufacturer: string;
    model: string;
    year: number;
  }
  let taxi: Car = {
    manufacturer: "Toyota",
    model: "Camry",
    year: 2014,
  };

  // Manufacturer과 model은 둘 다 문자열 타입입니다,
  // 그래서 둘 다 타이핑된 문자열 배열로 끌어낼 수 있습니다.
  let makeAndModel: string[] = pluck(taxi, ["manufacturer", "model"]);

  // 만약 model과 year를 끌어내려고 하면,
  // 유니언 타입의 배열: (string | number)[] 을 얻게됩니다.
  let modelYear = pluck(taxi, ["model", "year"]);
};

export const groupSample = async (): Promise<void> => {
  // interface GROUP_DATA_TYPES {
  //     HANDLING_CODE: string;
  //     UNIT: string;
  //     HANDLE_METHOD: string;
  //     STANDARD: string;
  //     SUM: Double;
  // }
  // const defect2ContractObj = Objects.search()
  //     .aaaObj()
  //     .filter((v) => v.fkStatementList.exactMatch(statement_list.pk))
  //     .all()
  //     .sort((a, b) => {
  //         const num1 = nullCheckNumber(parseInt(nullCheck(a.handlingCode)), 0);
  //         const num2 = nullCheckNumber(parseInt(nullCheck(b.handlingCode)), 0);
  //         return num2 - num1;
  //     });
  // const mapData = new Map<string, GROUP_DATA_TYPES>();
  // let tempsum: Double = 0;
  // let tempHandlingCode: string = "";
  // let tempUnit: string = "";
  // let tempHandlingMethod: string = "";
  // let tempStandard: string = "";
  // const handlingCodeArr: Array<string> = [];
  // console.log(defect2ContractObj);
  // const lastnum = defect2ContractObj.length - 1;
  // // 핸들링코드가 달라지면 배열에 추가하는 로직임(마지막 데이터는 달라지지 않음으로 마지막 i 값이면 배열에 추가)
  // defect2ContractObj.forEach((v, i) => {
  //     const defectCode: string = nullCheck(v.defectCode);
  //     const handlingCode: string = nullCheck(v.handlingCode);
  //     const handlingMethod: string = nullCheck(v.handlingMethod);
  //     const standard: string = nullCheck(v.standard);
  //     const unit: string = nullCheck(v.unit);
  //     const qty: Double = nullCheckNumber(v.contractQty, 0);
  //     if (i === 0) {
  //         tempHandlingCode = handlingCode;
  //     }
  //     // 그룹화를 위해 이전값과 다르면 이전값 저장
  //     if (handlingCode !== tempHandlingCode) {
  //         mapData.set(tempHandlingCode, {
  //             HANDLING_CODE: tempHandlingCode,
  //             UNIT: tempUnit,
  //             HANDLE_METHOD: tempHandlingMethod,
  //             STANDARD: tempStandard,
  //             SUM: tempsum,
  //         });
  //         tempsum = 0;
  //     }
  //     if (lastnum === i) {
  //         if (handlingCode !== tempHandlingCode) {
  //             // 마지막이면서 기존핸들링코드와 다를경우 수량은 현재값 넣음
  //             console.log(handlingCode);
  //             mapData.set(handlingCode, {
  //                 HANDLING_CODE: handlingCode,
  //                 UNIT: unit,
  //                 HANDLE_METHOD: handlingMethod,
  //                 STANDARD: standard,
  //                 SUM: qty,
  //             });
  //             handlingCodeArr.push(handlingCode);
  //         } else {
  //             if (i === 0) {
  //                 // 첫번째가 마지막일경우를 대비해 현재값을 넣음
  //                 console.log(handlingCode);
  //                 mapData.set(handlingCode, {
  //                     HANDLING_CODE: handlingCode,
  //                     UNIT: unit,
  //                     HANDLE_METHOD: handlingMethod,
  //                     STANDARD: standard,
  //                     SUM: qty,
  //                 });
  //                 handlingCodeArr.push(handlingCode);
  //             } else {
  //                 // 마지막이면서 기존핸들링코드와 같을경우 수량은 기존수량에 현재수량을 더함
  //                 console.log(tempHandlingCode);
  //                 mapData.set(tempHandlingCode, {
  //                     HANDLING_CODE: tempHandlingCode,
  //                     UNIT: tempUnit,
  //                     HANDLE_METHOD: tempHandlingMethod,
  //                     STANDARD: tempStandard,
  //                     SUM: tempsum + qty,
  //                 });
  //                 handlingCodeArr.push(tempHandlingCode);
  //             }
  //         }
  //     }
  //     tempHandlingCode = handlingCode;
  //     tempUnit = unit;
  //     tempHandlingMethod = handlingMethod;
  //     tempStandard = standard;
  //     tempsum += qty;
  // });
  // handlingCodeArr.forEach((v) => {
  //     const data = mapData.get(v) ?? ({} as GROUP_DATA_TYPES);
  //     console.log(data);
  // });
};

/**
 * 깊은복사 / 비구조화(중첩객체) 할당
 */
export const unstructuredSample = (): string => {
  const me = {
    name: "kwon",
    region: "kangwon",
    age: 22,
    friend: [{ name: "won", region: "jeonju" }],
  };
  // 깊은복사
  const you = {
    ...me,
    name: "park",
    region: "seoul",
  };

  console.log(me);
  console.log(you);
  console.log("------------------------------------------");
  // 비구조화(중첩객체) 할당
  const {
    name: meName,
    region,
    friend: [{ name: meFriend }],
  } = me;
  const {
    name: youName,
    friend: [{ name: aFriend }],
  } = you;
  console.log(meName);
  console.log(youName);
  console.log(meFriend);
  console.log(aFriend);
  console.log(region);
  console.log("------------------------------------------");
  // 중첩활용
  const users = [me, you];
  users.map(({ name, region, friend }) => {
    console.log(name);
    console.log(region);
    console.log(friend);
  });
  return "1";
};
