import React, { useState, useEffect, useReducer } from "react";

const ACTION_TYPES = {
  SET_TIMER: "SET_TIMER",
};

let date = new Date();
const initialState = {
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_TIMER: {
      return action.payload;
    }
    default:
      return state;
  }
};

function Clock() {
  const [time, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let { hours: h, minutes: m, seconds: s } = time;
    setInterval(() => {
      let dataInterval = new Date();
      let secondsInterval = dataInterval.getSeconds();
      s = secondsInterval + 1;
      m = dataInterval.getMinutes();
      h = dataInterval.getHours();
      dispatch({
        type: ACTION_TYPES.SET_TIMER,
        payload: {
          hours: h,
          minutes: m,
          seconds: s,
        },
      });
    }, 1000);
  }, []);
  const fixTimeStyle = () => {
    let { hours: hour, minutes: minute, seconds: second } = time;
    if (time.hours < 10) {
      hour = `0${time.hours}`;
    }
    if (time.minutes < 10) {
      minute = `0${time.minutes}`;
    }
    if (time.seconds < 10) {
      second = `0${time.seconds}`;
    }
    return `${hour} : ${minute} : ${second}`;
  };

  return (
    <div>
      <h1>Time is {fixTimeStyle()}</h1>
    </div>
  );
}

export default Clock;
