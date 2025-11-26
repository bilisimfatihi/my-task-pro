import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { RingIcon, RingList } from "./Ring.styled";

export default function Ring({ deadline }) {
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    if (!deadline) {
      setIsUrgent(false);
      return;
    }
    
    const now = new Date();
    const deadlineDate = new Date(deadline);

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(today);
    endOfToday.setDate(today.getDate() + 1);

    const isToday =
      deadlineDate >= today &&
      deadlineDate < endOfToday &&
      deadlineDate.getDate() === today.getDate();

    setIsUrgent(isToday);
  }, [deadline]);

  return (
    isUrgent && (
      <RingList key={"bell"}>
        <RingIcon />
      </RingList>
    )
  );
}

Ring.propTypes = {
  deadline: PropTypes.string,
};
