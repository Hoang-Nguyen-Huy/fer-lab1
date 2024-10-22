import { useState } from "react";

export default function useModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [detail, setDetail] = useState(null);

  const showModal = (orchid) => {
    setDetail(orchid);
    setIsVisible(true);
  };
  const hideModal = () => setIsVisible(false);
  return { isVisible, detail, showModal, hideModal };
}
