export default function Clogger({ getState }) {
  return (next) => (action) => {
    console.log("======================"); //sy-log

    console.log(action.type + "执行了！"); //sy-log

    const prevState = getState();
    console.log("prev state", prevState); //sy-log

    const returnValue = next(action);

    const nextState = getState();
    console.log("next state", nextState); //sy-log
    console.log("======================"); //sy-log
    return returnValue;
  };
}
