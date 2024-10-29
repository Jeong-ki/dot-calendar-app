export const isEmptyObj = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

export const logError = (message: string, error: any) => {
  // 콘솔에 에러 메시지 출력
  console.error(message, error);

  // TODO: API 구현 필요
  // // 서버에 에러 정보를 전송하는 코드 예시 (비동기 요청)
  // fetch('/api/log-error', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     message,
  //     error: error instanceof Error ? error.message : error,
  //     timestamp: new Date().toISOString(),
  //   }),
  // }).catch(console.error); // 에러 전송 중 에러 발생 시 콘솔 출력
};
