import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import "./Writer.css";

const InitialTimerValue = 2;
const IgnoredCharacters = [8, 46, 32, 13];

const Writer: React.FC = () => {
  const [count, setCount] = useState(InitialTimerValue);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCount = Math.round((count - 0.05) * 100) / 100;

      if (newCount === 0) {
        setHasEnded(true);
      }

      if (hasStarted && !hasEnded) {
        setCount(newCount);
      }
    }, 50);
    return (): void => clearInterval(interval);
  }, [count, setCount, hasStarted, setHasStarted, hasEnded, setHasEnded]);

  const handleKeyUp = ({ keyCode }: React.KeyboardEvent): void => {
    if (!hasStarted) {
      setHasStarted(true);
    }

    if (IgnoredCharacters.indexOf(keyCode) !== -1) {
      return;
    }

    setCount(InitialTimerValue);
  };

  return (
    <div>
      {hasStarted && <p>Seconds left: {Number(count).toFixed(2)}</p>}
      {!hasStarted && <p>Begin writing something...</p>}
      {hasEnded && <h1>DIE!</h1>}
      {hasEnded && <p>Why not share your story on the social medias?</p>}
      <TextareaAutosize
        className="writer"
        autoFocus
        onKeyUp={handleKeyUp}
        defaultValue="Once upon a time..."
        disabled={hasEnded}
      />

      {hasEnded && (
        <p>
          <a href="#" onClick={() => window.location.reload()}>
            Write another one.
          </a>{" "}
          Go on, you know you want to.
        </p>
      )}
    </div>
  );
};

export default Writer;
