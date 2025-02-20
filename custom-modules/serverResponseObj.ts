export type ServerResponseObj = {
  success: boolean;
  transferMessage: string;
  // Putting any for now since I am not sure what data will be sent yet
  transferData: any;
};

export function serverResponseObj(
  isSuccess: boolean,
  transferMessage: string,
  transferData: any
): ServerResponseObj {
  return {
    success: isSuccess,
    transferMessage: transferMessage,
    transferData: transferData,
  };
}
