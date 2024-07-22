import { DialogType, useDialogStore } from "./useDialogStore";

/**
 * Dialog를 실제로 사용하기 위한 메서드
 * @returns alert, confirm, prompt와 dialog를 닫고 발생한 데이터를 resolve에 담아 반환하는 onInteractionEnd 함수
 */
export default function useDialog() {
  const {
    setTitle,
    setDescription,
    setRevealed,
    setType,
    responseHandler,
    setChildren,
    setResponseHandler,
  } = useDialogStore();

  const onInteractionEnd = (value: string | boolean) => {    
    setRevealed(false);
    responseHandler?.(value);
    setTitle("");
    setDescription("");
  };

  const setAttributes = (
    type: DialogType,
    title: string,
    description: string
  ) => {
    setRevealed(true);
    setTitle(title);
    setDescription(description);
    setType(type);
  };

  const confirm = (title: string, description = "") => {
    setAttributes("confirm", title, description);

    return new Promise<boolean>((res) => {
      setResponseHandler(res);
    });
  };

  const alert = (title: string, description = "") => {
    setAttributes("alert", title, description);

    return new Promise<boolean>((res) => {
      setResponseHandler(res);
    });
  };

  const prompt = (
    title: string,
    description = "",
    children: React.ReactNode
  ) => {
    setAttributes("prompt", title, description);
    setChildren(children);

    return new Promise<string>((res) => {
      setResponseHandler(res);
    });
  };

  return {
    confirm,
    alert,
    prompt,
    onInteractionEnd,
  };
}
