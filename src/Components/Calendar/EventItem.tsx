import React, { useState, useEffect, useRef } from "react";
import { UserEvent, deleteUserEvent, updateUserEvent } from "../../redux/user-events";
import { useDispatch } from "react-redux";

interface Props {
  event: UserEvent;
}

const EventItem: React.FC<Props> = ({ event }) => {
  const slicer = (str: string) => {
    return str.slice(11, str.length - 5)
  }
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(event.title);
  const myRef = useRef<HTMLInputElement>(null);

  const handleDelete = () => {
    dispatch(deleteUserEvent(event.id));
  };

  const handleTitle = () => {
    setEditable(true);
  };

  const handleBlur = () => {
    if (title !== event.title) {
      dispatch(updateUserEvent({
        ...event,
        title
      }))
    }
    setEditable(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (editable) {
      myRef.current?.focus();
    }
  }, [editable]);

  return (
    <div className="calendar-event">
      <div className="calendar-event-info">
        <div className="calendar-event-time">{slicer(event.dateStart)} - {slicer(event.dateEnd)}</div>
        <div className="calendar-event-title">
          {editable ? (
            <input
              type="text"
              ref={myRef}
              onChange={handleChange}
              value={title}
              onBlur={handleBlur}
            />
          ) : (
            <span onClick={handleTitle}>{event.title}</span>
          )}
        </div>
      </div>
      <button className="calendar-event-delete-button" onClick={handleDelete}>
        &times;
      </button>
    </div>
  );
};

export default EventItem;
